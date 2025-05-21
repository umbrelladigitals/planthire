import { db } from "../src/lib/db";
import { AuditLogAction } from "../src/lib/audit-types";
import type { AuditLog } from "@prisma/client";

async function seedAuditLogs() {
  console.log("🌱 Audit log verileri ekleniyor...");

  // Örnek aktivite kayıtları oluştur
  const sampleAuditLogs = [
    {
      action: AuditLogAction.PRODUCT_CREATED,
      details: {
        productId: "sample-product-1",
        productName: "Ekskavatör"
      }
    },
    {
      action: AuditLogAction.GALLERY_IMAGE_ADDED,
      details: {
        imageUrl: "/uploads/images/sample-image.jpg",
        imageTitle: "İş makinesi"
      }
    },
    {
      action: AuditLogAction.CONTACT_SUBMITTED,
      details: {
        submitterName: "Ahmet Yılmaz",
        submitterEmail: "ahmet@example.com"
      }
    },
    {
      action: AuditLogAction.SETTINGS_UPDATED,
      details: {
        category: "general",
        settingsChanged: ["siteName", "siteDescription"]
      }
    },
    {
      action: AuditLogAction.PRODUCT_UPDATED,
      details: {
        productId: "sample-product-2",
        productName: "Buldozer",
        fieldsUpdated: ["description", "imageUrl"]
      }
    }
  ];

  // Veritabanına kayıtları ekle
  const createdLogs: AuditLog[] = [];
  
  for (const log of sampleAuditLogs) {
    try {
      const result = await db.auditLog.create({
        data: {
          action: log.action,
          details: log.details,
          // Eskiden yeni sıraya doğru yaratılması için zaman farkı ekleyelim
          createdAt: new Date(Date.now() - createdLogs.length * 60000)
        }
      });
      createdLogs.push(result);
      console.log(`✅ Aktivite kaydı oluşturuldu: ${log.action}`);
    } catch (error) {
      console.error(`❌ Hata: ${log.action} oluşturulurken hata:`, error);
    }
  }

  console.log(`🎉 Toplam ${createdLogs.length} aktivite kaydı oluşturuldu.`);
}

// Ana fonksiyonu çalıştır
seedAuditLogs()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("❌ Seed işlemi başarısız:", error);
    process.exit(1);
  }); 