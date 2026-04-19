
import { Shovel, Truck, Factory, Cpu, Zap, Wrench } from "lucide-react";
import NextLink from "next/link";

const categories = [
  {
    title: "Excavators",
    description: "Mini, Micro and Large diggers for all types of earthmoving.",
    icon: Shovel,
    link: "/products?category=excavators"
  },
  {
    title: "Dumpers",
    description: "Tracked and wheeled dumpers for efficient material transport.",
    icon: Truck,
    link: "/products?category=dumpers"
  },
  {
    title: "Telehandlers",
    description: "Versatile material handling and lifting equipment.",
    icon: Factory,
    link: "/products?category=telehandlers"
  },
  {
    title: "Rollers",
    description: "Compaction equipment for groundwork and road construction.",
    icon: Cpu,
    link: "/products?category=rollers"
  },
  {
    title: "Power & Lighting",
    description: "Generators, lighting towers, and site power solutions.",
    icon: Zap,
    link: "/products?category=power"
  },
  {
    title: "Attachments",
    description: "Breakers, augers, and buckets for all machinery.",
    icon: Wrench,
    link: "/products?category=attachments"
  },
];

export function Categories() {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Our Fleet</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Equipment Categories
            </h2>
            <p className="text-lg text-slate-600">
              Browse our extensive range of high-quality plant machinery, ready for your next project. 
              We offer modern, reliable equipment tailored for any scale of operation.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <NextLink href="/products" className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
              View Entire Fleet
            </NextLink>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {categories.map((category, index) => (
            <NextLink href={category.link} key={index} className="group flex flex-col h-full bg-white transition-all duration-300">
              <div className="h-48 w-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 overflow-hidden relative">
                 {/* Heavy typography watermark background */}
                 <div className="absolute -right-4 -bottom-8 text-slate-100 font-black text-[120px] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    0{index + 1}
                 </div>
                 {/* Main Icon */}
                 <div className="relative z-10 w-20 h-20 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                    <category.icon className="h-8 w-8 text-primary" />
                 </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                  EXPLORE <span className="ml-2 transition-transform duration-300 group-hover:block group-hover:translate-x-2">→</span>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}