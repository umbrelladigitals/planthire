'use client'; // Sayfayı client bileşenine dönüştürdük

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Building, 
  Calendar, 
  ClipboardList, 
  Coins, 
  FileText, 
  ArrowLeft, 
  Clock, 
  Check, 
  X, 
  Tag, 
  PhoneCall,
  Info
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function EquipmentDetailsPage({ params }: EquipmentDetailsPageProps) {
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
    return <div className="container px-4 py-8 text-center text-muted-foreground">Loading equipment details...</div>;
  }

  // Eğer veri çekildi ama equipment null ise 404 sayfasına yönlendir
  if (!equipment && !error) {
     return notFound();
  }

  // Eğer hata varsa hata mesajını göster
  if (error) {
    return (
      <div className="container px-4 py-8 text-center text-red-600">
        <p>Error loading equipment details:</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // equipment artık null değil, detayları render edebiliriz.
  const { name, description, imageUrl, dailyRate, weeklyRate, monthlyRate, available, specifications } = equipment!;

  return (
    <div className="container px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="flex items-center text-muted-foreground mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          All Equipment
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">{name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="relative w-full h-64 md:h-auto aspect-video md:aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={name ?? "Equipment Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <Building className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center">
                {available ? (
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 flex items-center">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Available for Hire
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700 flex items-center">
                    <X className="h-3.5 w-3.5 mr-1" />
                    Currently Not Available
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground">{description || 'No description available.'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-2">
                  <Coins className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <h2 className="text-xl font-semibold mb-3">Pricing</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3 bg-muted/10 flex flex-col items-center text-center">
                        <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Daily</span>
                        <span className="font-semibold text-lg">{dailyRate ? `£${dailyRate}` : '-'}</span>
                      </div>
                      <div className="border rounded-lg p-3 bg-muted/10 flex flex-col items-center text-center">
                        <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Weekly</span>
                        <span className="font-semibold text-lg">{weeklyRate ? `£${weeklyRate}` : '-'}</span>
                      </div>
                      <div className="border rounded-lg p-3 bg-muted/10 flex flex-col items-center text-center">
                        <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Monthly</span>
                        <span className="font-semibold text-lg">{monthlyRate ? `£${monthlyRate}` : '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-2">
                    <ClipboardList className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {Object.entries(specifications).map(([key, value]) => (
                          <div key={key} className="flex items-start gap-2 p-2 border rounded bg-muted/10">
                            <Tag className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold block">{key}</span>
                              <span className="text-sm text-muted-foreground">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Rental Information</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Delivery: Within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Usage training included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>24/7 technical support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full mt-4 flex items-center gap-2">
                  <PhoneCall className="h-5 w-5" />
                  Contact Us About This Equipment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Enquire About: {equipment?.name ?? 'Selected Equipment'}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to ask a question or request a quote for the {equipment?.name ?? 'selected equipment'}.
                  </DialogDescription>
                </DialogHeader>
                <ProductEnquiryForm 
                  equipmentName={equipment?.name ?? 'Selected Equipment'} 
                  onFormSubmitSuccess={() => {
                    setIsModalOpen(false); 
                  }}
                />
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </div>
    </div>
  );
} 