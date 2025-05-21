import { Prisma } from "@prisma/client";

export type EquipmentDetails = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  dailyRate: string | null;
  weeklyRate: string | null;
  monthlyRate: string | null;
  available: boolean;
  specifications: Prisma.JsonValue | null;
};

// getEquipmentDetails fonksiyonu artık kullanılmıyor
// export async function getEquipmentDetails(id: string): Promise<EquipmentDetails | null> {
//   try {
//     const equipment = await db.equipment.findUnique({
//       where: { id },
//       select: equipmentDetailsSelect,
//     });
//     return equipment;
//   } catch (error) {
//     console.error("Error fetching equipment details:", error);
//     return null;
//   }
// }

// Eğer başka fonksiyonlar varsa burada kalabilirler.
// Örneğin, ürün listesi için fetchProducts gibi fonksiyonlar.

// Şu an için dosya boş kalabilir veya sadece db importunu içerebilir. 