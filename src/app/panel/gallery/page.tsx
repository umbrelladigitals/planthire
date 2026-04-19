import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ClientGalleryForm } from "@/components/panel/client-gallery-form";
import { deleteGalleryImageAction } from "@/actions/gallery-actions";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/panel/admin-page-header";

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
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="SITE GALLERY"
        description="Manage the images displayed in your website gallery."
        action={<ClientGalleryForm />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => ( 
          <div key={image.id} className="bg-white border-2 border-slate-900 overflow-hidden flex flex-col group relative">
            <div className="relative h-56 w-full bg-slate-100 border-b-2 border-slate-900 group-hover:opacity-90 transition-opacity">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover"
              />
              <form action={async () => {
                'use server';
                await deleteGalleryImageAction(image.id);
              }} className="absolute top-2 right-2 z-10">
                <Button 
                  type="submit"
                  title="Delete Image"
                  variant="destructive" 
                  size="sm" 
                  className="rounded-none border-2 border-slate-900 bg-white hover:bg-red-500 text-red-500 hover:text-white transition-colors h-9 w-9 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className="font-black uppercase tracking-widest text-slate-900 truncate pr-2">{image.title}</span>
                <span className="text-xs font-bold text-slate-500 tracking-wider whitespace-nowrap">
                  {formatDate(image.createdAt)}
                </span>
              </div>
              {image.description && (
                <p className="text-xs font-medium text-slate-600 line-clamp-2 mt-2">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {galleryImages.length === 0 && (
        <div className="text-center py-16 bg-white border-2 border-slate-900">
          <p className="text-slate-500 font-bold uppercase tracking-widest">No gallery images found. Add some images to get started.</p>
        </div>
      )}
    </div>
  );
} 