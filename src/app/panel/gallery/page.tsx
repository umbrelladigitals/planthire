import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
// import { PrismaClient } from '@prisma/client'; // Bu import artık kullanılmıyor, db importu yeterli
import { ClientGalleryForm } from "@/components/panel/client-gallery-form";
import { deleteGalleryImageAction } from "@/actions/gallery-actions";
import { db } from "@/lib/db";

// Panelde gösterilecek galeri resmi için tip tanımı
interface PanelGalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  createdAt: Date; // Prisma Date tipini kullanır
  updatedAt: Date; // Prisma Date tipini kullanır
}

export default async function GalleryPage() {
  // Fetch gallery images from the database using Prisma ORM
  const galleryImages: PanelGalleryImage[] = await db.gallery.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Format date helper function
  const formatDate = (date: Date) => { // Parametre tipi Date olarak güncellendi
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Galeri</h2>
          <p className="text-muted-foreground">
            Web sitenizin galeri resimlerini yönetin.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* Use our client wrapper component */}
          <ClientGalleryForm />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => ( // (image: any) tipi kaldırıldı, PanelGalleryImage kullanılacak
          <Card key={image.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover"
              />
              <form action={async () => { // action doğrudan server action'a çevrildi
                'use server';
                await deleteGalleryImageAction(image.id);
              }}>
                <Button 
                  type="submit"
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">{image.title}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(image.createdAt)}
                </span>
              </div>
              {image.description && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {image.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {galleryImages.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Henüz galeride resim yok. Başlamak için birkaç resim ekleyin.</p>
        </div>
      )}
    </div>
  );
} 