'use client';

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactFormAction } from "@/actions/contact-actions";

// Form schema with validation rules using zod
const productEnquiryFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  equipment: z.string(), // Equipment name will be pre-filled
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Type definition for form fields
type ProductEnquiryFormValues = z.infer<typeof productEnquiryFormSchema>;

interface ProductEnquiryFormProps {
  equipmentName: string;
  onFormSubmitSuccess?: () => void; // Optional callback for successful submission
}

export function ProductEnquiryForm({ equipmentName, onFormSubmitSuccess }: ProductEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  // Form state and submission function
  const form = useForm<ProductEnquiryFormValues>({
    resolver: zodResolver(productEnquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      equipment: equipmentName, // Pre-fill equipment name
      message: "",
    },
  });

  // Effect to update default equipment value if equipmentName prop changes
  useEffect(() => {
    form.reset({ 
        ...form.getValues(), // Keep other form values
        equipment: equipmentName 
    });
  }, [equipmentName, form]);

  // Form submission handler
  async function onSubmit(data: ProductEnquiryFormValues) {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: null });

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const result = await submitContactFormAction(formData);

      if (!result.success) {
        throw new Error(result.error || "An error occurred while submitting the form.");
      }

      setFormStatus({
        type: 'success',
        message: 'Your enquiry has been sent successfully. We will get back to you soon.'
      });
      form.reset();
      if (onFormSubmitSuccess) {
        onFormSubmitSuccess(); // Call the callback if provided
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : "An error occurred while submitting the form."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formStatus.type && (
          <div className={`mb-4 p-3 rounded-md text-sm ${formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {formStatus.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="bg-muted/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`Please provide any specific details or questions about the ${equipmentName}...`}
                  rows={4} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full mt-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </form>
    </Form>
  );
} 