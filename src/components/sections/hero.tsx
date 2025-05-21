import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Truck, Clock, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      {/* CSS defined backgrounds and overlays */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="hero-grid"></div>
      <div className="accent-bar"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Content - Left side */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 mb-2">
              <span className="text-sm font-medium">Professional Equipment Hire</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="text-accent">Quality Equipment</span> Solutions for Every Project
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-200 max-w-2xl">
              Reliable machinery hire solutions for construction, landscaping and industrial projects across Abeerbeednshire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 group">
                <Link href="#products">
                  View Equipment
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact">
                  Get a Quote
                </Link>
              </Button>
            </div>
            
            {/* Key points - features with three icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Modern Equipment Fleet</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Flexible Hire Periods</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Safety Certified Machinery</span>
              </div>
            </div>
          </div>
          
          {/* Hero Feature Image - Right side */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
              <div className="aspect-[4/3] rounded-md bg-zinc-800 overflow-hidden relative">
                <Image 
                  src="/images/excavator.jpg" 
                  alt="Excavator" 
                  layout="fill" 
                  objectFit="cover"
                  className="rounded-md" 
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-lg">Excavator 1.5T</h3>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Popular</span>
                </div>
                <Button asChild variant="secondary" className="w-full mt-2">
                  <Link href="#contact">Request This Machine</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 