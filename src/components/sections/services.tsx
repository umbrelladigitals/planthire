import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section id="services" className="py-16 md:py-24 bg-zinc-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            We provide a comprehensive range of equipment hire and related services to support your projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-primary/5 hover:border-primary/20 transition-colors">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 