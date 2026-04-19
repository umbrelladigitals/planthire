import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center group">
          <BrandLogo variant="colored" className="h-14 w-auto transition-transform group-hover:scale-105" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 items-center">
          <Link href="#services" className="font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary transition-colors px-3 py-2">Services</Link>
          <Link href="#about" className="font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary transition-colors px-3 py-2">About</Link>
          <Link href="#products" className="font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary transition-colors px-3 py-2">Equipment</Link>
          <Link href="#contact" className="font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary transition-colors px-3 py-2">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 border-r border-slate-200 pr-6 mr-2">
             <Phone className="h-4 w-4 text-primary" />
             <span className="font-bold tracking-wider text-[11px]">+44 123 456 7890</span>
          </div>
          <Button asChild className="rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest text-[11px] h-12 px-6 transition-colors group">
            <Link href="#contact" className="flex items-center">
              Request Quote
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-none hover:bg-slate-100 text-slate-900 h-12 w-12 border border-slate-200">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm w-full max-w-[85vw] p-0 flex flex-col border-l border-slate-200 bg-white">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <Link href="/" className="flex items-center">
                <BrandLogo variant="colored" className="h-10 w-auto" />
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col py-4">
                <Link href="#services" className="flex items-center px-8 h-12 font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">SERVICES</Link>
                <Link href="#about" className="flex items-center px-8 h-12 font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">ABOUT</Link>
                <Link href="#products" className="flex items-center px-8 h-12 font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">EQUIPMENT</Link>
                <Link href="#contact" className="flex items-center px-8 h-12 font-extrabold uppercase tracking-widest text-[11px] text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">CONTACT</Link>
              </nav>

              <div className="p-8 border-t border-slate-100 mt-4 space-y-8 bg-slate-50/50 min-h-max">
                <div>
                  <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-5">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-700 font-bold text-xs tracking-wider">
                      <div className="bg-white p-2 border border-slate-200">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span>+44 123 456 7890</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 font-bold text-xs tracking-wider">
                      <div className="bg-white p-2 border border-slate-200">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[10px] break-all">Aberdeenshireplanthire@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 font-bold text-xs tracking-wider">
                      <div className="bg-white p-2 border border-slate-200">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span>Aberdeenshire, UK</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-5">Follow Us</h3>
                  <div className="flex gap-3">
                    <Link href="#" className="h-10 w-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-colors" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="h-10 w-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-colors" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="h-10 w-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-colors" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="h-10 w-10 flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-white mt-auto">
              <Button asChild className="w-full h-14 rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest text-[11px] transition-colors group">
                <Link href="#contact" className="flex items-center justify-center">
                  Get A Quote
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 