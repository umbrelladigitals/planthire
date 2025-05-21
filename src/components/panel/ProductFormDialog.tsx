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
import { createEquipmentAction, updateEquipmentAction } from '@/actions/product-actions';
import { FileUpload } from '@/components/ui/file-upload';
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { ReloadIcon, PlusCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface ProductToEdit {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  dailyRate: string | null;
  weeklyRate: string | null;
  monthlyRate: string | null;
  available: boolean;
}

interface ProductFormDialogProps {
  productToEdit?: ProductToEdit;
  onFormSubmit?: () => void;
}

const equipmentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  description: z.string().optional(),
  imageUrl: z.string().optional().or(z.literal('')),
  dailyRate: z.string().optional(),
  weeklyRate: z.string().optional(),
  monthlyRate: z.string().optional(),
  available: z.boolean(),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

export function ProductFormDialog({ productToEdit, onFormSubmit }: ProductFormDialogProps) {
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
          dailyRate: productToEdit.dailyRate || "",
          weeklyRate: productToEdit.weeklyRate || "",
          monthlyRate: productToEdit.monthlyRate || "",
          available: productToEdit.available,
        });
        setUploadedImageUrl(productToEdit.imageUrl || "");
      } else {
        form.reset({
          name: "",
          description: "",
          imageUrl: "",
          dailyRate: "",
          weeklyRate: "",
          monthlyRate: "",
          available: true,
        });
        setUploadedImageUrl("");
      }
    } else {
      form.reset(isEditMode && productToEdit ? {
        name: productToEdit.name,
        description: productToEdit.description || "",
        imageUrl: productToEdit.imageUrl || "",
        dailyRate: productToEdit.dailyRate || "",
        weeklyRate: productToEdit.weeklyRate || "",
        monthlyRate: productToEdit.monthlyRate || "",
        available: productToEdit.available,
      } : {
        name: "",
        description: "",
        imageUrl: "",
        dailyRate: "",
        weeklyRate: "",
        monthlyRate: "",
        available: true,
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
        dailyRate: values.dailyRate || null,
        weeklyRate: values.weeklyRate || null,
        monthlyRate: values.monthlyRate || null,
        available: values.available,
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
            dailyRate: "",
            weeklyRate: "",
            monthlyRate: "",
            available: true,
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
          <Button variant="outline" size="sm">
            <Pencil1Icon className="h-4 w-4 mr-1" /> Edit
          </Button>
        ) : (
          <Button className="flex gap-2 items-center">
            <PlusCircledIcon className="h-4 w-4" /> Add New Product
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-y-auto max-h-[90vh] px-4 py-6 sm:px-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Edit the product/equipment details.' : 'Fill in the details of the new product.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Name</Label>
              <Input 
                id="name" 
                {...form.register("name")} 
                required 
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-1.5 block">Description</Label>
              <Textarea 
                id="description" 
                {...form.register("description")} 
                placeholder="Enter product description..." 
                className="w-full resize-none min-h-[80px]"
              />
              {form.formState.errors.description && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.description.message}</p>
              )}
            </div>
          </div>
          
          {/* Pricing Section */}
          <div className="pt-2 border-t space-y-4">
            <h3 className="text-sm font-semibold mb-3">Pricing</h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="dailyRate" className="text-sm font-medium mb-1.5 block">Daily Rate (£)</Label>
                <Input 
                  id="dailyRate" 
                  type="number" 
                  step="0.01" 
                  {...form.register("dailyRate")} 
                  className="w-full"
                />
                {form.formState.errors.dailyRate && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.dailyRate.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="weeklyRate" className="text-sm font-medium mb-1.5 block">Weekly Rate (£)</Label>
                <Input 
                  id="weeklyRate" 
                  type="number" 
                  step="0.01" 
                  {...form.register("weeklyRate")} 
                  className="w-full"
                />
                {form.formState.errors.weeklyRate && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.weeklyRate.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="monthlyRate" className="text-sm font-medium mb-1.5 block">Monthly Rate (£)</Label>
                <Input 
                  id="monthlyRate" 
                  type="number" 
                  step="0.01" 
                  {...form.register("monthlyRate")} 
                  className="w-full"
                />
                {form.formState.errors.monthlyRate && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.monthlyRate.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="flex items-center space-x-2 pt-2">
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
                />
              )}
            />
            <Label htmlFor="available" className="font-medium text-sm">Available for Hire</Label>
          </div>
          
          {/* Image Upload */}
          <div className="pt-2 border-t">
            <h3 className="text-sm font-semibold mb-3">Product Image</h3>
            <FileUpload 
              onUploadSuccess={handleUploadSuccess} 
              initialImageUrl={uploadedImageUrl}
              label=""
            />
            {form.formState.errors.imageUrl && (
              <p className="text-xs text-red-500 mt-1">{form.formState.errors.imageUrl.message}</p>
            )}
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
              {form.formState.errors.root.message}
            </p>
          )}
          
          <DialogFooter className="pt-4 mt-4 border-t">
            <Button type="submit" disabled={isSaving} className="w-full">
              {isSaving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} 
              {isSaving 
                ? (isEditMode ? 'Updating...' : 'Adding...') 
                : (isEditMode ? 'Update Product' : 'Add Product')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 