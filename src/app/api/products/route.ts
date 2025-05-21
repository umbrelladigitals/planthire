import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Select fields to retrieve for equipment details
const equipmentDetailsSelect = {
  id: true,
  name: true,
  imageUrl: true,
  description: true,
  dailyRate: true,
  weeklyRate: true,
  monthlyRate: true,
  available: true,
  specifications: true, // Assuming specifications are needed for details
};

// Interface for the data structure expected by the frontend
export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  dailyRate: string | null;
  weeklyRate: string | null;
  monthlyRate: string | null;
  available: boolean;
}

// EquipmentDetails tipini ilgili API rotasından import ediyoruz
import { PrismaEquipmentDetails } from '../equipment/[id]/route';

export async function GET() {
  try {
    // Fetch actual data from the Equipment model
    const equipments = await db.equipment.findMany({
      select: equipmentDetailsSelect,
      orderBy: {
        createdAt: 'desc', 
      },
    });

    // Format null values and Decimal rates as strings before sending to the frontend
    const formattedProducts: Product[] = equipments.map((equipment: PrismaEquipmentDetails) => ({
      id: equipment.id,
      name: equipment.name,
      imageUrl: equipment.imageUrl || null, // Explicitly handle null
      description: equipment.description || null, // Explicitly handle null
      // dailyRate, weeklyRate, monthlyRate Decimal tipinde gelebilir, string'e çeviriyoruz
      dailyRate: equipment.dailyRate !== null ? equipment.dailyRate.toString() : null, 
      weeklyRate: equipment.weeklyRate !== null ? equipment.weeklyRate.toString() : null, 
      monthlyRate: equipment.monthlyRate !== null ? equipment.monthlyRate.toString() : null, 
      available: equipment.available, // available boolean gelmeli
      // specifications alanı API yanıtına dahil edilmeli mi? Frontend ihtiyacına göre buraya ekleyebilirsiniz.
      // specifications: equipment.specifications || null,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: 'An error occurred while loading product data' }, 
      { status: 500 }
    );
  }
} 