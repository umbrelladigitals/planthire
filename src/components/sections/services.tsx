
import { Shovel, Truck, Building, Wrench, Clock, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Construction Equipment",
    description: "High-quality excavators, bulldozers, and loaders for construction projects of all sizes.",
    icon: Building,
  },
  {
    title: "Landscaping Tools",
    description: "Professional-grade machinery for landscaping projects, including mini diggers and rollers.",
    icon: Shovel,
  },
  {
    title: "Transportation Vehicles",
    description: "Reliable dumpers, forklifts, and transport vehicles for efficient material handling.",
    icon: Truck,
  },
  {
    title: "Maintenance & Repair",
    description: "Expert maintenance and repair services to keep your hired equipment running smoothly.",
    icon: Wrench,
  },
  {
    title: "Flexible Hire Terms",
    description: "Short and long-term hire options available to match your project timeline and budget.",
    icon: Clock,
  },
  {
    title: "Safety Certified",
    description: "All equipment is safety-checked and certified to ensure reliable and safe operation.",
    icon: ShieldCheck,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-1 lg:sticky lg:top-32 self-start">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              We provide a comprehensive range of equipment hire and related services to support your projects effectively and safely.
            </p>
            <div className="w-16 h-1 bg-primary"></div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {services.map((service, index) => (
              <div key={index} className="group flex items-start gap-6 bg-white p-8 border border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-none flex items-center justify-center transform group-hover:bg-primary group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
} 