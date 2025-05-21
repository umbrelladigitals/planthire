'use server';

import { db } from "@/lib/db";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { uploadFileAction } from './file-actions';
import { AuditLogAction } from "@/lib/audit-types"; 
import { createAuditLog } from "@/lib/audit"; 

// const prisma = new PrismaClient();

// Zod schema for gallery image validation
const GallerySchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters long.' }),
  description: z.string().optional(),
  imageUrl: z.string().min(1, { message: 'Image URL is required.' }),
});

export async function createGalleryImageAction(formData: FormData) {
  // If there's a file upload, handle it first
  let imageUrl = '';
  const file = formData.get('file') as File | null;
  
  if (file && file.size > 0) {
    // Create a new FormData object for the file upload
    const fileFormData = new FormData();
    fileFormData.append('file', file);
    
    // Upload the file
    const uploadResult = await uploadFileAction(fileFormData);
    if (!uploadResult.success) {
      return {
        error: uploadResult.error || 'Failed to upload image.',
      };
    }
    
    // Get the image URL from the upload result
    imageUrl = uploadResult.publicUrl || '';
  } else {
    // If no file was uploaded, check if an imageUrl was provided in the form
    imageUrl = formData.get('imageUrl') as string || '';
  }
  
  // If we still don't have an imageUrl, return an error
  if (!imageUrl) {
    return {
      error: 'No image was provided.',
    };
  }
  
  const rawFormData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || '',
    imageUrl,
  };
  
  const validationResult = GallerySchema.safeParse(rawFormData);
  
  if (!validationResult.success) {
    console.error("Validation Error:", validationResult.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please check the form fields.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }
  
  const { title, description } = validationResult.data;
  
  try {
    const newGalleryImage = await db.gallery.create({
      data: {
        title,
        description: description || null,
        imageUrl,
      },
    });
    
    // Galeri resmi eklendiğinde audit log oluştur
    await createAuditLog({
      action: AuditLogAction.GALLERY_IMAGE_ADDED,
      details: { 
        imageId: newGalleryImage.id, 
        imageUrl: newGalleryImage.imageUrl, 
        imageTitle: newGalleryImage.title 
      }
    });

    // Revalidate paths to reflect the new gallery image
    revalidatePath('/panel/gallery');
    revalidatePath('/'); // Revalidate home page if gallery is displayed there
    
    return {
      success: true,
      message: 'Gallery image added successfully!',
      image: newGalleryImage
    };
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return {
      error: 'Failed to add gallery image. Please try again.',
    };
  }
}

export async function getGalleryImagesAction() {
  try {
    const galleryImages = await db.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return {
      success: true,
      galleryImages,
    };
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return {
      error: 'Failed to fetch gallery images.',
      galleryImages: [],
    };
  }
}

export async function deleteGalleryImageAction(id: string) {
  try {
    const deletedImage = await db.gallery.delete({
      where: {
        id,
      },
    });
    
    // Galeri resmi silindiğinde audit log oluştur
    await createAuditLog({
      action: AuditLogAction.GALLERY_IMAGE_DELETED,
      details: { 
        imageId: deletedImage.id, 
        imageUrl: deletedImage.imageUrl, 
        imageTitle: deletedImage.title 
      }
    });
    
    // Revalidate paths to reflect the deleted gallery image
    revalidatePath('/panel/gallery');
    revalidatePath('/'); // Revalidate home page if gallery is displayed there
    
    return {
      success: true,
      message: 'Gallery image deleted successfully!',
    };
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return {
      error: 'Failed to delete gallery image. Please try again.',
    };
  }
} 