"use client"; // Shadcn Dialog kullanımı için eklendi

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Kapatma butonu için
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Kapatma butonu için
import { X } from "lucide-react"; // Kapatma ikonu için

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null;
}

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/gallery"); // API endpoint'imiz
        if (!response.ok) {
          throw new Error(`Failed to fetch gallery items: ${response.statusText}`);
        }
        const data = await response.json();
        setGalleryItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error("Error fetching gallery items:", err);
        setGalleryItems([]); // Hata durumunda galeriyi boşalt
      }
      setIsLoading(false);
    };

    fetchGalleryItems();
  }, []);

  // Imagelerin yüklü olup olmadığını kontrol eden state
  // ... existing code ...
  //   }));
  // };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Check out some of our equipment in action. High-quality machinery
            ready for your projects.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-muted-foreground">Loading gallery...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Error loading gallery: {error}
          </p>
        )}
        {!isLoading && !error && galleryItems.length === 0 && (
          <p className="text-center text-muted-foreground">
            No gallery items to display at the moment.
          </p>
        )}
        {!isLoading && !error && galleryItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <Dialog key={item.id} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
                <DialogTrigger asChild onClick={() => setSelectedImage(item)}>
                  <div 
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100 relative"
                    style={{ 
                      display: 'block',
                      position: 'relative',
                      width: '100%',
                      height: '0',
                      paddingBottom: '100%' // 1:1 aspect ratio
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title || 'Gallery image'}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                      }}
                      priority={index < 4}
                      onError={() => {
                        console.error(`Failed to load image: ${item.imageUrl}`);
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-black transition-opacity duration-300 z-10"
                      style={{ 
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.2';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.opacity = '0';
                      }}
                    />
                  </div>
                </DialogTrigger>
                {selectedImage && selectedImage.id === item.id && (
                  <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] p-0">
                    <DialogHeader className="p-6 pb-0">
                      <DialogTitle className="text-2xl">{selectedImage.title}</DialogTitle>
                      {selectedImage.description && (
                        <DialogDescription className="pt-1">
                          {selectedImage.description}
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    <div className="p-6 pt-2">
                      <div 
                        className="relative overflow-hidden rounded-md bg-gray-100" 
                        style={{
                          width: '100%',
                          height: '0',
                          paddingBottom: '56.25%', // 16:9 aspect ratio
                          position: 'relative'
                        }}
                      >
                        <Image
                          src={selectedImage.imageUrl}
                          alt={selectedImage.title || 'Gallery image'}
                          fill
                          style={{
                            objectFit: 'contain',
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%'
                          }}
                          priority={true}
                        />
                      </div>
                    </div>
                     <DialogClose asChild className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                  </DialogContent>
                )}
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 