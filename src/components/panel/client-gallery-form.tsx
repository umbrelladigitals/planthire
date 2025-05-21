'use client';

import { GalleryUploadForm } from '@/components/panel/gallery-upload-form';
import { useRouter } from 'next/navigation';

export function ClientGalleryForm() {
  const router = useRouter();

  const handleImageAdded = () => {
    router.refresh();
  };

  return <GalleryUploadForm onImageAdded={handleImageAdded} />;
} 