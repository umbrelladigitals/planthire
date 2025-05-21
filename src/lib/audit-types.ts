// src/lib/audit-types.ts

// Enum veya const object olarak eylem tiplerini tanımlamak iyi bir pratiktir.
export const AuditLogAction = {
  PRODUCT_CREATED: 'PRODUCT_CREATED',
  PRODUCT_UPDATED: 'PRODUCT_UPDATED',
  PRODUCT_DELETED: 'PRODUCT_DELETED',
  GALLERY_IMAGE_ADDED: 'GALLERY_IMAGE_ADDED',
  GALLERY_IMAGE_DELETED: 'GALLERY_IMAGE_DELETED',
  CONTACT_SUBMITTED: 'CONTACT_SUBMITTED',
  CONTACT_MARKED_AS_READ: 'CONTACT_MARKED_AS_READ',
  SETTINGS_UPDATED: 'SETTINGS_UPDATED', 
} as const; 

export type AuditLogActionType = typeof AuditLogAction[keyof typeof AuditLogAction];

// AuditLog detayları için bir tip (TypeScript'te daha güvenli erişim için)
// Bu tipi page.tsx dosyasında da kullanacağımız için buraya taşıyabiliriz.
export interface AuditLogDetails {
  category?: string;
  productName?: string;
  productId?: string;
  submitterName?: string;
  submissionId?: string;
  imageUrl?: string;
  imageId?: string;
  [key: string]: unknown; // Diğer olası alanlar için
} 