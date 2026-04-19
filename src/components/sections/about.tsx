import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="relative h-[500px] lg:h-[650px] w-full border-8 border-white shadow-2xl overflow-hidden bg-slate-200 z-10">
              <Image 
                src="/images/company-image.jpg" 
                alt="Aberdeenshire Plant Hire" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Architectural accent block */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary z-0 hidden md:block"></div>
            <div className="absolute -top-8 -right-8 w-full h-full border-2 border-slate-200 z-0"></div>

            {/* Solid Stats block */}
            <div className="absolute -right-4 md:-right-12 bottom-12 bg-slate-900 text-white p-8 z-20 shadow-xl max-w-xs">
              <div className="text-5xl font-black text-primary mb-2">20+</div>
              <div>
                <p className="text-lg font-bold tracking-wider uppercase mb-1">Years Field</p>
                <p className="text-sm text-slate-400">Experience in reliable plant machinery hire across the UK.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 lg:pl-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Company Profile</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Aberdeenshire Plant Hire
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 mb-10 leading-relaxed">
              <p>
                Aberdeenshire Plant Hire is your trusted partner for high-quality plant and machinery hire. 
                Based in Aberdeenshire, we provide a wide range of reliable equipment to support construction, 
                landscaping, agricultural, and industrial projects of all sizes.
              </p>
              <p>
                With a strong focus on excellent service, competitive rates, and well-maintained machinery, 
                we&apos;re committed to helping you get the job done efficiently and safely. Whether you need 
                short-term hire or long-term solutions, Aberdeenshire Plant Hire is ready to deliver 
                the equipment and support you need to keep your projects moving.
              </p>
            </div>
            
            <Separator className="my-10 bg-slate-200" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">20+ years of experience</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">Comprehensive range</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">Regularly serviced</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">Expert advice</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">Flexible hire periods</p>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="font-bold text-slate-900">Competitive pricing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 