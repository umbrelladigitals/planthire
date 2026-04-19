import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Truck, Clock, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white border-b border-slate-200"
    >
      {/* Brutalist Watermark */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[15vw] font-black text-slate-50 select-none pointer-events-none tracking-tighter leading-none z-0 whitespace-nowrap">
        PLANTHIRE
      </div>
      
      <div className="container relative z-10 w-full pt-20 pb-20 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content - Left side */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block bg-slate-900 tracking-widest text-white uppercase px-4 py-1.5 text-xs font-extrabold mb-6">
                Professional Equipment Hire
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1] uppercase">
                <span className="text-primary block mb-2">Build It</span> With The Best Equipment.
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-medium border-l-4 border-primary pl-6">
              Reliable machinery hire solutions for construction, landscaping, and industrial projects across Aberdeenshire. Heavy-duty tools for heavy-duty results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-16 rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest px-8 group">
                <Link href="#products" className="flex items-center">
                  View Our Fleet
                  <ChevronRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 rounded-none border-2 border-slate-300 bg-transparent text-slate-900 font-bold uppercase tracking-widest px-8 hover:bg-slate-100">
                <Link href="#contact">
                  Get a Quote
                </Link>
              </Button>
            </div>
            
            {/* Key points - Brutalist style slots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-4 border-t border-slate-200">
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 border border-slate-200">
                  <Truck className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 tracking-wide uppercase text-sm mb-1">Modern Fleet</h4>
                  <p className="text-xs text-slate-500 font-medium">Latest Machinery</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 border border-slate-200">
                  <Clock className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 tracking-wide uppercase text-sm mb-1">Flexible Hire</h4>
                  <p className="text-xs text-slate-500 font-medium">Short & Long Term</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3 border border-slate-200">
                  <ShieldCheck className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 tracking-wide uppercase text-sm mb-1">Certified</h4>
                  <p className="text-xs text-slate-500 font-medium">100% Safe & Tested</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Feature Image - Right side */}
          <div className="lg:col-span-5 relative hidden lg:block pl-8">
            {/* Background Offset Box */}
            <div className="absolute -inset-4 bg-slate-50 border border-slate-200 z-0 translate-x-10 translate-y-6"></div>
            
            {/* Main Image Frame */}
            <div className="relative aspect-[3/4] w-full bg-slate-200 border-8 border-white shadow-2xl overflow-visible z-10 group">
              <Image 
                src="/images/excavator.jpg" 
                alt="Heavy Equipment" 
                fill 
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              
              {/* Floating feature card */}
              <div className="absolute bottom-8 -left-12 bg-white border border-slate-200 p-6 shadow-xl w-72 z-20 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Featured Machine</span>
                     <h3 className="font-extrabold text-slate-900 text-xl tracking-tight uppercase">Excavator 1.5T</h3>
                  </div>
                  <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                    POPULAR
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6 bg-slate-50 border border-slate-100 p-2">
                   <div className="h-2 w-2 bg-green-500 rounded-none animate-pulse"></div>
                   <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">Ready for Deploy</span>
                </div>
                
                <Button asChild className="w-full rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest h-12">
                  <Link href="#contact">Request Equipment</Link>
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
} 