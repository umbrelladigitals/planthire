'use server';

import { db } from './db';
import { Prisma } from '@prisma/client';
import { AuditLogAction, type AuditLogActionType } from './audit-types'; // Yeni dosyadan import et

// Enum veya const object olarak eylem tiplerini tanımlamak iyi bir pratiktir.

interface LogOptions {
  action: AuditLogActionType;
  details?: Prisma.InputJsonValue; // Prisma.JsonValue yerine Prisma.InputJsonValue daha doğru
  userId?: string; // Opsiyonel, eğer kullanıcı bazlı loglama yapılıyorsa
}

/**
 * Creates an audit log entry.
 * @param options - Options for the audit log.
 * @param options.action - The type of action performed.
 * @param options.details - Optional JSON details about the action.
 * @param options.userId - Optional ID of the user who performed the action.
 */
export async function createAuditLog(options: LogOptions): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        action: options.action,
        details: options.details, // details null veya undefined olabilir, Prisma bunu handle eder
        userId: options.userId, // userId null veya undefined olabilir
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Burada bir hata oluşursa uygulamanın geri kalanının etkilenmemesi için hata yutulabilir
    // veya daha gelişmiş bir hata loglama mekanizmasına gönderilebilir.
  }
}

// Örnek kullanım için yardımcı fonksiyonlar (isteğe bağlı ama kullanışlı olabilir)

export async function logProductAction(actionType: Extract<AuditLogActionType, 'PRODUCT_CREATED' | 'PRODUCT_UPDATED' | 'PRODUCT_DELETED'>, productId: string, productName: string, userId?: string) {
  await createAuditLog({
    action: actionType,
    details: { productId, productName },
    userId,
  });
}

export async function logContactSubmission(submissionId: string, submitterName: string) {
  await createAuditLog({
    action: AuditLogAction.CONTACT_SUBMITTED,
    details: { submissionId, submitterName },
  });
}

export async function logGalleryImageAdded(imageId: string, imageUrl: string, userId?: string) {
  await createAuditLog({
    action: AuditLogAction.GALLERY_IMAGE_ADDED,
    details: { imageId, imageUrl },
    userId,
  });
}

// Daha fazla yardımcı fonksiyon eklenebilir... 