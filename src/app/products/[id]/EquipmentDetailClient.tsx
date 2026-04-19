'use client';

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Building, 
   
   
  ArrowLeft, 
  Clock, 
  Check, 
  X, 
  Tag, 
  PhoneCall,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductEnquiryForm } from "@/components/forms/ProductEnquiryForm";

// EquipmentDetails tipini API rotasından import ediyoruz
import { EquipmentDetails } from '@/app/api/equipment/[id]/route';

interface EquipmentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function EquipmentDetailClient({ params }: EquipmentDetailsPageProps) {
  // params artık bir Promise, React'ın use hook'u ile çözüyoruz.
  const resolvedParams = use(params);
  const equipmentId = resolvedParams.id; // resolvedParams artık { id: string } objesi olacak

  const [equipment, setEquipment] = useState<EquipmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        // Veriyi yeni API rotasından çekiyoruz
        const response = await fetch(`/api/equipment/${equipmentId}`);
        
        if (!response.ok) {
          // API 404 döndürürse notFound() çağır
          if (response.status === 404) {
            notFound();
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch equipment details: ${response.statusText}`);
        }

        const data: EquipmentDetails = await response.json();
        setEquipment(data);

      } catch (err) {
        console.error("Error fetching equipment details:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        // Hata durumunda da notFound() çağrılabilir veya boş state bırakılabilir.
        // Şu an için hata mesajı gösterelim.
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [equipmentId]); // params.id değiştiğinde tekrar çek

  if (isLoading) {
    return <div className="container py-8 text-center text-muted-foreground">Loading equipment details...</div>;
  }

  // Eğer veri çekildi ama equipment null ise 404 sayfasına yönlendir
  if (!equipment && !error) {
     return notFound();
  }

  // Eğer hata varsa hata mesajını göster
  if (error) {
    return (
      <div className="container py-8 text-center text-red-600">
        <p>Error loading equipment details:</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // equipment artık null değil, detayları render edebiliriz.
  const { name, description, imageUrl, available, specifications } = equipment!;

  return (
    <div className="bg-white min-h-screen py-16 border-t border-slate-200">
      <div className="container">
        {/* Top Back Link */}
        <Link href="/products" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Complete Inventory
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Image Column */}
          <div className="lg:w-1/2">
              <div className="relative w-full aspect-square border-8 border-white shadow-xl overflow-hidden bg-slate-100 z-10 group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={name ?? "Equipment Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <Building className="w-24 h-24 text-slate-300" />
                  </div>
                )}
                
                {/* Floating Status Label */}
                <div className="absolute bottom-6 left-6 z-20">
                  {available ? (
                    <div className="bg-white border-l-4 border-green-500 text-slate-900 px-4 py-2 font-bold uppercase text-xs tracking-wider flex items-center shadow-lg">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Available
                    </div>
                  ) : (
                    <div className="bg-white border-l-4 border-red-500 text-slate-900 px-4 py-2 font-bold uppercase text-xs tracking-wider flex items-center shadow-lg">
                      <X className="h-4 w-4 mr-2 text-red-500" />
                      In Use
                    </div>
                  )}
                </div>
              </div>
              
              {/* Background accent */}
              <div className="hidden lg:block w-48 h-48 bg-slate-100 absolute -bottom-12 -left-12 -z-10"></div>
            </div>

            <div className="lg:w-1/2 flex flex-col">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-4">
                  <Tag className="h-4 w-4" /> Equipment Details
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
                  {name}
                </h1>
                
                <div className="text-lg text-slate-600 leading-relaxed">
                  <p>{description || 'No detailed description provided for this equipment.'}</p>
                </div>
              </div>

              {/* Specs Grid blocks */}
              {specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0 && (
                <div className="mb-10 border-t border-slate-200 pt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 p-4">
                        <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1 font-bold">{key}</span>
                        <span className="text-slate-900 font-semibold">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rental Protocol block */}
              <div className="mb-10 border-t border-slate-200 pt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">Service Protocol</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-slate-700">
                    <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center mr-4">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Same-Day or Next-Day Delivery Available</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center mr-4">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">On-Site Operator Familiarisation & Safety Training</span>
                  </li>
                  <li className="flex items-center text-slate-700">
                    <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center mr-4">
                      <PhoneCall className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">24/7 Breakdown & Mobile Fitter Support</span>
                  </li>
                </ul>
              </div>

              {/* Action Area */}
              <div className="mt-auto border-t border-slate-200 pt-8">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full h-16 rounded-none bg-slate-900 hover:bg-primary text-white text-sm font-bold tracking-widest uppercase transition-all border-none">
                      Enquire About This Machine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[480px] rounded-none border-t-4 border-t-primary">
                    <DialogHeader className="mb-6">
                      <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Quote Request</div>
                      <DialogTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">Enquire: {equipment?.name}</DialogTitle>
                    </DialogHeader>
                    <ProductEnquiryForm 
                      equipmentName={equipment?.name ?? 'Selected Equipment'} 
                      onFormSubmitSuccess={() => setIsModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

            </div>
          </div>
      </div>
    </div>
  );
} 