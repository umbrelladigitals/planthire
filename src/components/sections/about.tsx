import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-zinc-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              About Abeerbeednshire Plant Hire
            </h2>
            <p className="text-muted-foreground mb-6">
              Abeerbeednshire Plant Hire is your trusted partner for high-quality plant and machinery hire. 
              Based in Abeerbeednshire, we provide a wide range of reliable equipment to support construction, 
              landscaping, agricultural, and industrial projects of all sizes.
            </p>
            <p className="text-muted-foreground mb-6">
              With a strong focus on excellent service, competitive rates, and well-maintained machinery, 
              we&apos;re committed to helping you get the job done efficiently and safely. Whether you need 
              short-term hire or long-term solutions, Abeerbeednshire Plant Hire is ready to deliver 
              the equipment and support you need to keep your projects moving.
            </p>
            
            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>20+ years of industry experience</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>Comprehensive equipment range</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>Regularly serviced machinery</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>Expert advice and support</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>Flexible hire periods</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>Competitive pricing</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image 
              src="/images/company-image.jpg" 
              alt="Abeerbeednshire Plant Hire" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 