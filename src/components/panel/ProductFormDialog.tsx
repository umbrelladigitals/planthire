'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createEquipmentAction, updateEquipmentAction, getCategoriesAction } from '@/actions/product-actions';
import { FileUpload } from '@/components/ui/file-upload';
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { ReloadIcon, PlusCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface ProductToEdit {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  available: boolean;
  categoryId?: string | null;
}

interface ProductFormDialogProps {
  productToEdit?: ProductToEdit;
  onFormSubmit?: () => void;
}

const equipmentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  description: z.string().optional(),
  imageUrl: z.string().optional().or(z.literal('')),
  available: z.boolean(),
  categoryId: z.string().optional().or(z.literal('')),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

export function ProductFormDialog({ productToEdit, onFormSubmit }: ProductFormDialogProps) {
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    getCategoriesAction().then(res => {
      if (res.success && res.data) setCategories(res.data);
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const isEditMode = !!productToEdit;

  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && productToEdit) {
        form.reset({
          name: productToEdit.name,
          description: productToEdit.description || "",
          imageUrl: productToEdit.imageUrl || "",
          available: productToEdit.available,
          categoryId: productToEdit.categoryId || "",
        });
        setUploadedImageUrl(productToEdit.imageUrl || "");
      } else {
        form.reset({
          name: "",
          description: "",
          imageUrl: "",
          available: true,
          categoryId: "",
        });
        setUploadedImageUrl("");
      }
    } else {
      form.reset(isEditMode && productToEdit ? {
        name: productToEdit.name,
        description: productToEdit.description || "",
        imageUrl: productToEdit.imageUrl || "",
        available: productToEdit.available,
          categoryId: productToEdit.categoryId || "",
      } : {
        name: "",
        description: "",
        imageUrl: "",
        available: true,
          categoryId: "",
      });
      setUploadedImageUrl(isEditMode && productToEdit ? productToEdit.imageUrl || "" : "");
    }
  }, [isOpen, productToEdit, isEditMode, form]);

  const handleUploadSuccess = (fileUrl: string) => {
    setUploadedImageUrl(fileUrl);
    form.setValue("imageUrl", fileUrl);
  };

  const onSubmit = async (values: EquipmentFormData) => {
    setIsSaving(true);
    
    try {
      const finalValues = {
        ...values,
        name: values.name as string,
        imageUrl: uploadedImageUrl || values.imageUrl || null,
        available: values.available,
        categoryId: values.categoryId || null,
      };

      let result;
      if (isEditMode && productToEdit) {
        result = await updateEquipmentAction({
          id: productToEdit.id,
          ...finalValues,
        });
      } else {
        result = await createEquipmentAction(finalValues);
      }

      if (result.success && result.data) {
        toast.success(isEditMode ? "Product Updated" : "Product Added", {
          description: `${result.data.name} has been ${isEditMode ? 'updated' : 'added'} successfully.`,
        });
        if (!isEditMode) {
          form.reset({
            name: "",
            description: "",
            imageUrl: "",
            available: true,
          categoryId: "",
          });
          setUploadedImageUrl("");
        }
        setIsOpen(false);
        if (onFormSubmit) onFormSubmit();
      } else {
         toast.error("Error", {
          description: result.error || `An unexpected error occurred while ${isEditMode ? 'updating' : 'adding'} the product. Please try again.`,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error", {
        description: `An unexpected error occurred. Please try again.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => {
      setIsOpen(openState);
    }}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="sm" className="rounded-none border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-bold uppercase tracking-widest text-xs h-9 transition-colors focus-visible:ring-0">
            <Pencil1Icon className="h-4 w-4 mr-2" /> EDIT
          </Button>
        ) : (
          <Button className="rounded-none border-2 border-slate-900 bg-slate-900 hover:bg-white hover:text-slate-900 text-white font-black uppercase tracking-widest text-sm h-11 px-6 transition-colors flex gap-2 items-center focus-visible:ring-0">
            <PlusCircledIcon className="h-5 w-5" /> NEW MACHINE
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-0 py-0 rounded-none border-2 border-slate-900 bg-white">
        <DialogHeader className="p-6 border-b-2 border-slate-900 bg-slate-50">
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-slate-900">
            {isEditMode ? 'Edit Equipment' : 'New Equipment'}
          </DialogTitle>
          <DialogDescription className="text-slate-600 font-medium uppercase tracking-wider text-xs">
            {isEditMode ? 'Modify machine specifications.' : 'Register new machine to the fleet.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-0 py-0 flex flex-col">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <Label className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">Category</Label>
                <Controller
                  name="categoryId"
                  control={form.control}
                  render={({ field }) => (
                    <select 
                      {...field} 
                      className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 uppercase bg-white px-3 mb-6 block"
                    >
                      <option value="">Uncategorized</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">Machine Name</Label>
                <Input 
                  id="name" 
                  {...form.register("name")} 
                  required 
                  className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 uppercase"
                  placeholder="e.g. EXCAVATOR 1.5T"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">Machine Details</Label>
                <Textarea 
                  id="description" 
                  {...form.register("description")} 
                  placeholder="Enter specifications and operational details..." 
                  className="w-full min-h-[100px] rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 resize-none"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>
            
            {/* Availability */}
            <div className="flex items-center space-x-3 bg-slate-50 p-4 border border-slate-200">
              <Controller
                control={form.control}
                name="available"
                defaultValue={isEditMode ? productToEdit?.available : true}
                render={({ field }) => (
                  <Switch
                    id="available"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                    className="data-[state=checked]:bg-primary"
                  />
                )}
              />
              <Label htmlFor="available" className="font-extrabold text-sm uppercase tracking-widest text-slate-900">Available For Deploy</Label>
            </div>
            
            {/* Image Upload */}
            <div className="pt-6 border-t-2 border-slate-100">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4 block">Fleet Image</Label>
              <div className="border-2 border-slate-300 p-2 border-dashed bg-slate-50">
                <FileUpload 
                  onUploadSuccess={handleUploadSuccess} 
                  initialImageUrl={uploadedImageUrl}
                  label=""
                />
              </div>
              {form.formState.errors.imageUrl && (
                <p className="text-xs text-red-600 font-bold uppercase mt-2 tracking-wider">{form.formState.errors.imageUrl.message}</p>
              )}
            </div>

            {form.formState.errors.root && (
              <p className="text-xs font-bold uppercase tracking-wider text-white bg-red-600 p-3">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>
          
          <DialogFooter className="p-6 border-t-2 border-slate-900 bg-slate-50">
            <Button type="submit" disabled={isSaving} className="w-full h-14 rounded-none bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center">
              {isSaving && <ReloadIcon className="mr-3 h-5 w-5 animate-spin" />} 
              {isSaving 
                ? 'PROCESSING...' 
                : (isEditMode ? 'UPDATE MACHINE' : 'REGISTER MACHINE')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 