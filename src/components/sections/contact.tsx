'use client';

import { useState } from "react";
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
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { submitContactFormAction } from "@/actions/contact-actions";

// Form schema with validation rules using zod
const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  equipment: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Type definition for form fields
type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  // Form state and submission function
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      equipment: "",
      message: "",
    },
  });

  // Form submission handler - updated to use server action
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: null });

    try {
      // Convert form data to FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Call server action
      const result = await submitContactFormAction(formData);

      if (!result.success) {
        throw new Error(result.error || "An error occurred while submitting the form.");
      }

      // Successful submission
      setFormStatus({
        type: 'success',
        message: 'Your message has been sent successfully. We will get back to you soon.'
      });
      
      // Reset the form
      form.reset();
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
    <section id="contact" className="py-20 md:py-32 bg-white border-t border-slate-200">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 sm:text-5xl mb-6">
            Contact <span className="text-primary">Us</span>
          </h2>
          <p className="text-lg font-medium text-slate-600">
            Get in touch with our team to discuss your equipment hire needs or request a quote.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 p-8 md:p-12">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h3 className="font-black uppercase tracking-widest text-xl text-slate-900 mb-2">Enquiry Form</h3>
                <p className="text-slate-500 font-medium text-sm">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              </div>
              
              {formStatus.type && (
                <div className={`mb-8 p-4 border ${formStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  <p className="font-bold text-sm tracking-wide">{formStatus.message}</p>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-slate-500">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              className="h-12 rounded-none border-slate-200 focus-visible:border-slate-900 focus-visible:ring-0 bg-slate-50 transition-colors" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-slate-500">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              className="h-12 rounded-none border-slate-200 focus-visible:border-slate-900 focus-visible:ring-0 bg-slate-50 transition-colors" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase font-bold" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-slate-500">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your phone number" 
                            className="h-12 rounded-none border-slate-200 focus-visible:border-slate-900 focus-visible:ring-0 bg-slate-50 transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] uppercase font-bold" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-slate-500">Required Equipment</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What equipment do you need?" 
                            className="h-12 rounded-none border-slate-200 focus-visible:border-slate-900 focus-visible:ring-0 bg-slate-50 transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] uppercase font-bold" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-slate-500">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your project" 
                            rows={6} 
                            className="rounded-none border-slate-200 focus-visible:border-slate-900 focus-visible:ring-0 bg-slate-50 transition-colors resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] uppercase font-bold" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-14 mt-6 rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest text-[11px] transition-colors" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Info Side */}
          <div className="lg:col-span-5 lg:pl-6 space-y-8">
            <div className="bg-slate-50 border border-slate-200 p-8">
              <h3 className="font-black uppercase tracking-widest text-lg text-slate-900 mb-8 border-b border-slate-200 pb-4">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-white border border-slate-200 text-slate-900 p-3 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Phone</p>
                    <p className="font-bold text-slate-900 text-sm tracking-wide">+44 7312 110885</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="bg-white border border-slate-200 text-slate-900 p-3 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Email</p>
                    <p className="font-bold text-slate-900 text-sm tracking-wide break-all">Aberdeenshireplanthire@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="bg-white border border-slate-200 text-slate-900 p-3 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Address</p>
                    <p className="font-bold text-slate-900 text-sm tracking-wide leading-relaxed">
                      High street new pitsligo<br />
                      Fraserburgh<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="bg-white border border-slate-200 text-slate-900 p-3 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Opening Hours</p>
                    <p className="font-bold text-slate-900 text-sm tracking-wide leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      <span className="text-slate-500">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 text-white p-8">
              <h3 className="font-black uppercase tracking-widest text-lg text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary block"></span>
                Service Area
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                We provide equipment hire services throughout Aberdeenshire and surrounding areas 
                including Aberdeen, Peterhead, Fraserburgh, Huntly, Inverurie, and other locations 
                within a 50-mile radius of our main depot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 