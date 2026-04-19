import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Select fields to retrieve for equipment details
const equipmentDetailsSelect = {
  id: true,
  name: true,
  imageUrl: true,
  description: true,
  available: true,
  specifications: true, // Assuming specifications are needed for details
  EquipmentCategory: {
    select: {
      Category: {
        select: {
          id: true,
          name: true,
          slug: true,
        }
      }
    }
  }
};

// Interface for the data structure expected by the frontend
export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  available: boolean;
  categories?: { id: string; name: string; slug: string }[];
}

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
    const formattedProducts: Product[] = equipments.map((equipment) => ({
      id: equipment.id,
      name: equipment.name,
      imageUrl: equipment.imageUrl || null, // Explicitly handle null
      description: equipment.description || null, // Explicitly handle null
      available: equipment.available, // available boolean gelmeli
      categories: equipment.EquipmentCategory 
        ? equipment.EquipmentCategory.map((ec) => ec.Category)
        : [],
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