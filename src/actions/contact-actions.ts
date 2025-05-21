'use server';

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { sendEmail, createContactNotificationEmail } from "@/lib/email";
import { AuditLogAction } from "@/lib/audit-types";
import { createAuditLog } from "@/lib/audit";

/**
 * Saves data submitted from the contact form and sends an email notification
 */
export async function submitContactFormAction(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const equipment = formData.get('equipment') as string;
    const message = formData.get('message') as string;

    // Validate form data
    if (!fullName || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields."
      };
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