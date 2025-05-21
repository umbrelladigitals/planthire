'use server';

// import { PrismaClient } from '@prisma/client'; // Bu satır kaldırılacak
import { revalidatePath } from 'next/cache';
import { db } from "@/lib/db"; // Merkezi db instance'ını kullanıyoruz
import { AuditLogAction } from "@/lib/audit-types";
import { createAuditLog } from "@/lib/audit";
import { Prisma } from '@prisma/client'; // Sadece Prisma namespace'ini import et
import { Decimal } from '@prisma/client/runtime/library'; // Decimal tipi için ayrı import

// const prisma = new PrismaClient(); // Bu satır da kaldırılacak

// Zod schema for product input validation
// createProductAction fonksiyonu kaldırıldığı için bu şema da gereksiz kalabilir,
// ancak gelecekteki form işlemleri için bırakılabilir veya createEquipmentAction içine taşınabilir.
// const ProductSchema = z.object({
//   name: z.string().min(3, { message: 'Product name must be at least 3 characters long.' }),
//   description: z.string().optional(),
//   imageUrl: z.string().optional().or(z.literal('')),
//   // Add other fields as necessary, e.g., specifications, etc.
// });

// Bu fonksiyon bir önceki adımda kaldırılmıştı, tekrar eklenmiş gibi görünüyor.
// Eğer ClientProductForm bu fonksiyonu kullanmıyorsa (ki createEquipmentAction'ı kullanıyor olmalı)
// bu fonksiyonun tamamı silinebilir.
// Şimdilik yorum satırı yapıyorum, teyit sonrası silebiliriz.
/*
export async function createProductAction(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
  };

  const validationResult = ProductSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Validation Error:", validationResult.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please check the form fields.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, description, imageUrl } = validationResult.data;

  try {
    const newProduct = await db.equipment.create({ // prisma.equipment yerine db.equipment kullanıldı
      data: {
        name,
        description: description || null, 
        imageUrl: imageUrl || null,      
      },
    });
    
    revalidatePath('/panel');
    revalidatePath('/');

    return { 
      success: true,
      message: 'Product created successfully!',
      product: newProduct 
    };

  } catch (error) {
    console.error("Error creating product:", error);
    return {
      error: 'Failed to create product. Please try again.',
    };
  }
}
*/

// Create action now accepts simpler types and handles conversion to Prisma types
export async function createEquipmentAction(data: {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  dailyRate?: string | null; // Accept string from form
  weeklyRate?: string | null;
  monthlyRate?: string | null;
  available?: boolean; // Accept boolean from form
}) {
  try {
    // Convert string rates to Decimal if they exist
    const dailyRateDecimal = data.dailyRate ? new Decimal(data.dailyRate) : null;
    const weeklyRateDecimal = data.weeklyRate ? new Decimal(data.weeklyRate) : null;
    const monthlyRateDecimal = data.monthlyRate ? new Decimal(data.monthlyRate) : null;

    const newEquipment = await db.equipment.create({
      data: { // Construct data object based on provided fields
        name: data.name,
        ...(data.description !== undefined && { description: data.description }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(dailyRateDecimal !== undefined && { dailyRate: dailyRateDecimal }),
        ...(weeklyRateDecimal !== undefined && { weeklyRate: weeklyRateDecimal }),
        ...(monthlyRateDecimal !== undefined && { monthlyRate: monthlyRateDecimal }),
        ...(data.available !== undefined && { available: data.available }),
        // specifications alanı eklenmeli mi? create işleminde gerekliyse ekleyin.
      },
    });

    // Format Decimal rates as strings before returning
    const formattedEquipment = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(newEquipment as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dailyRate: (newEquipment as any).dailyRate ? ((newEquipment as any).dailyRate as Decimal).toString() : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      weeklyRate: (newEquipment as any).weeklyRate ? ((newEquipment as any).weeklyRate as Decimal).toString() : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      monthlyRate: (newEquipment as any).monthlyRate ? ((newEquipment as any).monthlyRate as Decimal).toString() : null,
    };

    await createAuditLog({
      action: AuditLogAction.PRODUCT_CREATED,
      details: { 
        productId: newEquipment.id,
        productName: newEquipment.name 
      }
      // userId: ... 
    });

    revalidatePath("/panel/products");
    revalidatePath("/panel"); 

    return { success: true, data: formattedEquipment };
  } catch (error: unknown) { // unknown kullanıp kontrol edelim
    console.error("Error creating equipment:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta?.target as string[])?.includes('name')) {
        return { success: false, error: `An equipment with the name "${data.name}" already exists.` };
      }
    }
    // Genel hata mesajı
    return { success: false, error: error instanceof Error ? error.message : "Failed to create equipment." };
  }
}

// Update action now accepts simpler types and handles conversion to Prisma types
export async function updateEquipmentAction(data: {
  id: string;
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
  dailyRate?: string | null;
  weeklyRate?: string | null;
  monthlyRate?: string | null;
  available?: boolean;
}) {
  try {
    // Convert string rates to Decimal if they exist and are provided
    const updateData: {
        name?: string;
        description?: string | null;
        imageUrl?: string | null;
        dailyRate?: Decimal | null;
        weeklyRate?: Decimal | null;
        monthlyRate?: Decimal | null;
        available?: boolean;
        // specifications alanı eklenmeli mi? update işleminde gerekliyse ekleyin.
    } = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.available !== undefined) updateData.available = data.available;

    // Handle Decimal conversion for rates only if they are provided
    if (data.dailyRate !== undefined) {
        updateData.dailyRate = data.dailyRate !== null ? new Decimal(data.dailyRate) : null; // Ensure null is handled
    }
    if (data.weeklyRate !== undefined) {
        updateData.weeklyRate = data.weeklyRate !== null ? new Decimal(data.weeklyRate) : null; // Ensure null is handled
    }
    if (data.monthlyRate !== undefined) {
        updateData.monthlyRate = data.monthlyRate !== null ? new Decimal(data.monthlyRate) : null; // Ensure null is handled
    }

    // İlk olarak ürünün mevcut olduğunu kontrol edelim
    const existingEquipment = await db.equipment.findUnique({
      where: { id: data.id }
    });

    if (!existingEquipment) {
      return { success: false, error: "Equipment not found." };
    }

    // Güncelleme işlemi
    const updatedEquipment = await db.equipment.update({
      where: { id: data.id },
      data: updateData,
    });

    // Format Decimal rates as strings before returning
    const formattedUpdatedEquipment = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(updatedEquipment as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dailyRate: (updatedEquipment as any).dailyRate ? ((updatedEquipment as any).dailyRate as Decimal).toString() : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      weeklyRate: (updatedEquipment as any).weeklyRate ? ((updatedEquipment as any).weeklyRate as Decimal).toString() : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      monthlyRate: (updatedEquipment as any).monthlyRate ? ((updatedEquipment as any).monthlyRate as Decimal).toString() : null,
    };

    // Audit log oluştur
    await createAuditLog({
      action: AuditLogAction.PRODUCT_UPDATED,
      details: { 
        productId: updatedEquipment.id,
        productName: updatedEquipment.name,
        fieldsUpdated: Object.keys(data).filter(key => key !== 'id')
      }
    });

    revalidatePath("/panel/products");
    revalidatePath("/panel");

    return { success: true, data: formattedUpdatedEquipment };
  } catch (error: unknown) { // unknown kullanıp kontrol edelim
    console.error("Error updating equipment:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta?.target as string[])?.includes('name')) {
        return { success: false, error: `An equipment with the name "${data.name}" already exists.` };
      }
    }
    // Genel hata mesajı
    return { success: false, error: error instanceof Error ? error.message : "Failed to update equipment." };
  }
}

export async function deleteEquipmentAction(id: string) {
  try {
    // İlk olarak ürünün mevcut olduğunu kontrol edelim
    const existingEquipment = await db.equipment.findUnique({
      where: { id }
    });

    if (!existingEquipment) {
      return { success: false, error: "Equipment not found." };
    }

    // Silme işlemi
    await db.equipment.delete({
      where: { id }
    });

    // Audit log oluştur
    await createAuditLog({
      action: AuditLogAction.PRODUCT_DELETED,
      details: { 
        productId: existingEquipment.id,
        productName: existingEquipment.name
      }
      // userId: ... 
    });

    revalidatePath("/panel/products");
  //  revalidatePath("/panel"); // Panel sayfası ürün listesini doğrudan göstermiyorsa gerek yok

    return { success: true };
  } catch (error: unknown) { // unknown kullanıp kontrol edelim
    console.error("Error deleting equipment:", error);
    // Özel hata kodları burada ele alınabilir (örn: ilgili başka kayıtlar varsa)
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete equipment." };
  }
}

// TODO: Update ve Delete işlemleri için de benzer loglama ve action'lar eklenebilir.
// export async function updateEquipmentAction(...) { ... }
// export async function deleteEquipmentAction(...) { ... } 
// export async function deleteEquipmentAction(...) { ... } 
