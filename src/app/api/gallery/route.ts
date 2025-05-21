import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Prisma client'ı import ediyoruz

// Frontend'in beklediği veri yapısı için interface
interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null; // Açıklama null olabilir
}

export async function GET() {
  try {
    const galleryImages = await db.gallery.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        description: true,
      },
      orderBy: {
        createdAt: 'desc', // En son eklenenler başta gelsin
      },
    });

    // Veritabanından gelen description null ise boş string'e çevirebiliriz veya null bırakabiliriz.
    // Frontend tarafı zaten null description'ı handle ediyor.
    const formattedGalleryImages: GalleryItem[] = galleryImages.map(image => ({
      ...image,
      description: image.description ?? '', // Eğer null ise boş string yapalım, ya da frontend'e null gönderelim.
                                              // Frontenddeki DialogDescription zaten null/undefined kontrolü yapıyor.
    }));

    return NextResponse.json(formattedGalleryImages);

  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return NextResponse.json({ error: 'Failed to load gallery data from API' }, { status: 500 });
  }
} 