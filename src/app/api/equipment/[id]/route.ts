import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { Decimal } from '@prisma/client/runtime/library'; // Import Decimal type
import { Prisma } from '@prisma/client'; // Prisma namespace'ini import et

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

// Type definition mirroring the select statement from Prisma
export interface PrismaEquipmentDetails {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  dailyRate: Decimal | null; // Use Decimal type as it comes from Prisma
  weeklyRate: Decimal | null;
  monthlyRate: Decimal | null;
  available: boolean;
  specifications: Prisma.JsonValue | null; // Use Prisma.JsonValue
}

// Type definition for the formatted response
export interface EquipmentDetails {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  dailyRate: string | null; // Send as string in API response
  weeklyRate: string | null;
  monthlyRate: string | null;
  available: boolean;
  specifications: Prisma.JsonValue | null; // Use Prisma.JsonValue
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Equipment ID is required' }, { status: 400 });
  }

  try {
    const equipment = await db.equipment.findUnique({
      where: { id },
      select: equipmentDetailsSelect,
    }) as PrismaEquipmentDetails | null; // Cast to Prisma type

    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }

    // Format Decimal rates as strings for the API response
    const formattedEquipment: EquipmentDetails = {
      id: equipment.id,
      name: equipment.name,
      imageUrl: equipment.imageUrl,
      description: equipment.description,
      dailyRate: equipment.dailyRate ? equipment.dailyRate.toString() : null,
      weeklyRate: equipment.weeklyRate ? equipment.weeklyRate.toString() : null,
      monthlyRate: equipment.monthlyRate ? equipment.monthlyRate.toString() : null,
      available: equipment.available,
      specifications: equipment.specifications || null,
    };

    return NextResponse.json(formattedEquipment);
  } catch (error: unknown) {
    console.error("Error fetching equipment details:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: 'An error occurred while loading equipment details: ' + errorMessage }, 
      { status: 500 }
    );
  }
} 