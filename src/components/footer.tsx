import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { getSocialMediaSettings, getGeneralSettings } from "@/lib/settings";
import { BrandLogo } from "@/components/brand-logo";

export async function Footer() {
  const socialSettings = await getSocialMediaSettings();
  const generalSettings = await getGeneralSettings();

  const siteName = generalSettings?.siteName || "PlanHire";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand & About */}
          <div className="md:col-span-4 pr-0 md:pr-12">
            <Link href="/" className="inline-flex items-center mb-8 group">
              <BrandLogo className="h-12 w-auto text-white group-hover:text-primary transition-colors" />
            </Link>
            
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 max-w-sm">
              Your trusted partner for high-quality plant and machinery hire in Aberdeenshire and surrounding areas. Superior equipment for superior results.
            </p>
            
            <div className="flex gap-3">
              {(!socialSettings || socialSettings.facebook) && (
                <Link href={socialSettings?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              )}
              {(!socialSettings || socialSettings.twitter) && (
                <Link href={socialSettings?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              )}
              {(!socialSettings || socialSettings.instagram) && (
                <Link href={socialSettings?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              )}
              {(!socialSettings || socialSettings.linkedin) && (
                <Link href={socialSettings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-black uppercase tracking-widest text-[11px] text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-[2px] bg-primary block"></span>
              Navigation
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="#services" className="text-xs font-bold tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 bg-slate-800 group-hover:bg-primary transition-colors"></span>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-xs font-bold tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 bg-slate-800 group-hover:bg-primary transition-colors"></span>
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-xs font-bold tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 bg-slate-800 group-hover:bg-primary transition-colors"></span>
                  EQUIPMENT
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-xs font-bold tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 bg-slate-800 group-hover:bg-primary transition-colors"></span>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="md:col-span-5">
            <h3 className="font-black uppercase tracking-widest text-[11px] text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-[2px] bg-primary block"></span>
              Contact Info
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2 shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-1">Location</p>
                  <p className="font-medium text-slate-300 text-xs leading-relaxed">
                    High street new pitsligo<br />
                    Fraserburgh, United Kingdom
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2 shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-1">Phone</p>
                  <a href="tel:+447312110885" className="font-medium text-slate-300 text-xs hover:text-primary transition-colors">
                    +44 7312 110885
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 border border-slate-800 p-2 shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-1">Email</p>
                  <a href="mailto:Aberdeenshireplanthire@gmail.com" className="font-medium text-slate-300 text-[11px] break-all hover:text-primary transition-colors">
                    Aberdeenshireplanthire@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold text-[10px] uppercase tracking-widest text-slate-600">
            © {new Date().getFullYear()} {siteName}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-bold text-[10px] uppercase tracking-widest text-slate-600 hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="font-bold text-[10px] uppercase tracking-widest text-slate-600 hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 