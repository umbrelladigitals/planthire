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
        if ('fieldErrors' in result && result.fieldErrors) {
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
        <Button onClick={() => setIsOpen(true)} className="rounded-none border-2 border-slate-900 bg-slate-900 hover:bg-white hover:text-slate-900 text-white font-black uppercase tracking-widest text-sm h-11 px-6 transition-colors flex gap-2 items-center focus-visible:ring-0">
          <PlusIcon className="h-5 w-5" />
          NEW IMAGE
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-0 py-0 rounded-none border-2 border-slate-900 bg-white">
        <DialogHeader className="p-6 border-b-2 border-slate-900 bg-slate-50">
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-slate-900">Add Gallery Image</DialogTitle>
          <DialogDescription className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
            Upload a new image to the gallery. 
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="gap-0 py-0 flex flex-col">
          <div className="p-6 space-y-6">
            <div>
              <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">
                Title *
              </Label>
              <Input 
                id="title" 
                name="title" 
                required 
                placeholder="E.G. EXCAVATOR ON SITE"
                className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 uppercase"
              />
              {fieldErrors?.title && <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{fieldErrors.title.join(', ')}</p>}
            </div>
            
            <div>
              <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">
                Description
              </Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Enter image description..."
                className="w-full min-h-[100px] rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 resize-none"
              />
              {fieldErrors?.description && <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{fieldErrors.description.join(', ')}</p>}
            </div>
            
            <div className="pt-4 border-t-2 border-slate-100">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4 block">Image *</Label>
              <div className="border-2 border-slate-300 p-2 border-dashed bg-slate-50">
                <FileUpload 
                  onUploadSuccess={(url) => setUploadedImageUrl(url)} 
                  initialImageUrl={uploadedImageUrl}
                  label=""
                />
              </div>
              {!uploadedImageUrl && <p className="text-xs text-amber-600 font-bold uppercase mt-2 tracking-wider">Please upload an image.</p>}
              {fieldErrors?.imageUrl && <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{fieldErrors.imageUrl.join(', ')}</p>}
            </div>

            {generalError && <p className="text-xs font-bold uppercase tracking-wider text-white bg-red-600 p-3">{generalError}</p>}
          </div>
          
          <DialogFooter className="p-6 border-t-2 border-slate-900 bg-slate-50 flex sm:justify-between gap-4 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleDialogClose} className="h-14 rounded-none border-2 border-slate-900 bg-white hover:bg-slate-200 text-slate-900 font-black uppercase tracking-widest text-sm sm:w-1/3">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isPending || !uploadedImageUrl}
              className="h-14 rounded-none bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-sm sm:w-2/3"
            >
              {isPending ? "PROCESSING..." : "SAVE IMAGE"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 