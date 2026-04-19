'use server';

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { sendEmail, createContactNotificationEmail } from "@/lib/email";
import { AuditLogAction } from "@/lib/audit-types";
import { createAuditLog } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth-guard";

/**
 * Saves data submitted from the contact form and sends an email notification
 */
const MAX_LENGTHS = {
  fullName: 100,
  email: 255,
  phone: 30,
  equipment: 200,
  message: 2000,
};

export async function submitContactFormAction(formData: FormData) {
  try {
    const fullName = (formData.get('fullName') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const equipment = (formData.get('equipment') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    // Validate required fields
    if (!fullName || !email || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    // Validate max lengths to prevent spam / DB abuse
    if (fullName.length > MAX_LENGTHS.fullName)
      return { success: false, error: `Name must be ${MAX_LENGTHS.fullName} characters or fewer.` };
    if (email.length > MAX_LENGTHS.email)
      return { success: false, error: "Invalid email address." };
    if (phone && phone.length > MAX_LENGTHS.phone)
      return { success: false, error: `Phone must be ${MAX_LENGTHS.phone} characters or fewer.` };
    if (equipment && equipment.length > MAX_LENGTHS.equipment)
      return { success: false, error: `Equipment field is too long.` };
    if (message.length > MAX_LENGTHS.message)
      return { success: false, error: `Message must be ${MAX_LENGTHS.message} characters or fewer.` };

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Save to database
    const submission = await db.contactSubmission.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        equipment: equipment || null,
        message,
        isRead: false,
      },
    });

    // İletişim formu gönderildiğinde audit log oluştur
    await createAuditLog({
      action: AuditLogAction.CONTACT_SUBMITTED,
      details: { 
        submissionId: submission.id, 
        submitterName: fullName,
        submitterEmail: email,
        equipment: equipment || null
      }
    });

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const { text, html } = createContactNotificationEmail({
        fullName,
        email,
        phone,
        equipment,
        message,
      });

      await sendEmail({
        to: adminEmail,
        subject: "New Contact Form Submission",
        text,
        html,
      });
    }

    revalidatePath('/contact'); // This path might no longer exist, consider removing or updating
    revalidatePath('/panel/contacts');

    return {
      success: true,
      data: submission,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "An error occurred while submitting your form. Please try again later."
    };
  }
}

/**
 * Marks a contact request as read
 */
export async function markContactAsReadAction(id: string) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const contact = await db.contactSubmission.update({
      where: { id },
      data: { isRead: true }
    });

    // İletişim formu okundu olarak işaretlendiğinde audit log oluştur
    await createAuditLog({
      action: AuditLogAction.CONTACT_MARKED_AS_READ,
      details: { 
        submissionId: id,
        submitterName: contact.fullName
      }
    });

    revalidatePath('/panel/contacts');
    return { success: true };
  } catch (error) {
    console.error("Error marking contact as read:", error);
    return { 
      success: false, 
      error: "An error occurred while marking the contact as read."
    };
  }
}

/**
 * Deletes a contact request
 */
export async function deleteContactAction(id: string) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await db.contactSubmission.delete({
      where: { id }
    });

    revalidatePath('/panel/contacts');
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { 
      success: false, 
      error: "An error occurred while deleting the contact."
    };
  }
}

/**
 * Gets contact request details
 */
export async function getContactDetailsAction(id: string) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const contact = await db.contactSubmission.findUnique({
      where: { id }
    });

    if (!contact) {
      return {
        success: false,
        error: "Contact record not found."
      };
    }

    // If viewed for the first time, mark as read
    if (!contact.isRead) {
      await db.contactSubmission.update({
        where: { id },
        data: { isRead: true }
      });
      revalidatePath('/panel/contacts');
    }

    return {
      success: true,
      data: contact
    };
  } catch (error) {
    console.error("Error getting contact details:", error);
    return { 
      success: false, 
      error: "An error occurred while fetching contact details."
    };
  }
} 