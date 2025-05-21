'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createGalleryImageAction } from '@/actions/gallery-actions';
import { FileUpload } from '@/components/ui/file-upload';
import { PlusIcon } from 'lucide-react';

interface GalleryUploadFormProps {
  onImageAdded?: () => void;
}

interface FieldErrors {
  title?: string[];
  description?: string[];
  imageUrl?: string[];
}

export function GalleryUploadForm({ onImageAdded }: GalleryUploadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Add uploaded image URL to formData if available
    if (uploadedImageUrl) {
      formData.set('imageUrl', uploadedImageUrl);
    }

    setGeneralError(null);
    setFieldErrors(null);

    startTransition(async () => {
      const result = await createGalleryImageAction(formData);
      if (result?.error) {
        setGeneralError(result.error);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors as FieldErrors);
        }
      } else if (result?.success) {
        setIsOpen(false);
        resetForm();
        if (onImageAdded) onImageAdded();
        // You can show a success toast/notification here
      } else {
        setGeneralError("An unexpected error occurred.");
      }
    });
  };

  const resetForm = () => {
    setUploadedImageUrl(null);
    setGeneralError(null);
    setFieldErrors(null);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleDialogClose();
      } else {
        setIsOpen(true);
      }
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Gallery Image</DialogTitle>
          <DialogDescription>
            Upload a new image to the gallery. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-start gap-x-4 gap-y-2">
            <Label htmlFor="title" className="text-right pt-2 col-span-1">
              Title *
            </Label>
            <div className="col-span-3">
              <Input 
                id="title" 
                name="title" 
                required 
                placeholder="Enter image title"
              />
              {fieldErrors?.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title.join(', ')}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-x-4 gap-y-2">
            <Label htmlFor="description" className="text-right pt-2 col-span-1">
              Description
            </Label>
            <div className="col-span-3">
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Enter image description (optional)"
              />
              {fieldErrors?.description && <p className="text-xs text-red-500 mt-1">{fieldErrors.description.join(', ')}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-x-4 gap-y-2">
            <Label className="text-right pt-2 col-span-1">Image *</Label>
            <div className="col-span-3">
              <FileUpload 
                onUploadSuccess={(url) => setUploadedImageUrl(url)} 
                initialImageUrl={uploadedImageUrl}
                label="Gallery Image"
              />
              {!uploadedImageUrl && <p className="text-xs text-amber-500 mt-1">Please upload an image.</p>}
              {fieldErrors?.imageUrl && <p className="text-xs text-red-500 mt-1">{fieldErrors.imageUrl.join(', ')}</p>}
            </div>
          </div>

          {generalError && <p className="text-sm text-red-600 col-span-4 text-center bg-red-100 p-2 rounded-md">{generalError}</p>}
          
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isPending || !uploadedImageUrl}
            >
              {isPending ? "Saving..." : "Save Image"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 