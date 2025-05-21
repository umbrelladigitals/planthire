import Link from "next/link";
import { Separator } from "./ui/separator";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { getSocialMediaSettings, getGeneralSettings } from "@/lib/settings";

export async function Footer() {
  const socialSettings = await getSocialMediaSettings();
  const generalSettings = await getGeneralSettings();

  const siteName = generalSettings?.siteName || "Abeerbeednshire Plant Hire";

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-xl font-bold text-white mb-4">{siteName}</div>
            <p className="mb-4 max-w-md">
              Your trusted partner for high-quality plant and machinery hire in Abeerbeednshire and surrounding areas.
            </p>
            <div className="flex space-x-4">
              {socialSettings?.facebook && (
                <Link href={socialSettings.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
              {socialSettings?.twitter && (
                <Link href={socialSettings.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              )}
              {socialSettings?.instagram && (
                <Link href={socialSettings.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              {socialSettings?.linkedin && (
                <Link href={socialSettings.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="hover:text-white">Services</Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">Equipment</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Contact</h3>
            <address className="not-italic space-y-2">
              <p>High street new pitsligo</p>
              <p>Fraserburgh</p>
              <p>United Kingdom</p>
              <p className="pt-2">
                <a href="tel:+447312110885" className="hover:text-white">+44 7312 110885</a>
              </p>
              <p>
                <a href="mailto:Aberdeenshireplanthire@gmail.com" className="hover:text-white">
                  Aberdeenshireplanthire@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <Separator className="my-8 bg-zinc-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 