import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/sections/gallery";
import { getGeneralSettings, getSetting, SETTINGS_KEYS } from "@/lib/settings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aberdeenshireplanthire.co.uk";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGeneralSettings();
  const siteName = settings?.siteName || "Aberdeenshire Plant Hire";
  const siteDescription = settings?.siteDescription || "Your trusted partner for high-quality plant and machinery hire in Aberdeenshire.";

  return {
    title: siteName,
    description: siteDescription,
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: "website",
      url: SITE_URL,
      title: siteName,
      description: siteDescription,
    },
  };
}

async function getLocalBusinessJsonLd() {
  const [siteName, siteDescription, phone, email, address] = await Promise.all([
    getSetting(SETTINGS_KEYS.SITE_NAME),
    getSetting(SETTINGS_KEYS.SITE_DESCRIPTION),
    getSetting(SETTINGS_KEYS.CONTACT_PHONE),
    getSetting(SETTINGS_KEYS.CONTACT_EMAIL),
    getSetting(SETTINGS_KEYS.CONTACT_ADDRESS),
  ]);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: siteName || "Aberdeenshire Plant Hire",
    description: siteDescription || "Plant and machinery hire in Aberdeenshire, Scotland.",
    url: SITE_URL,
    telephone: phone || undefined,
    email: email || undefined,
    address: address
      ? { "@type": "PostalAddress", streetAddress: address, addressRegion: "Aberdeenshire", addressCountry: "GB" }
      : { "@type": "PostalAddress", addressRegion: "Aberdeenshire", addressCountry: "GB" },
    areaServed: { "@type": "AdministrativeArea", name: "Aberdeenshire, Scotland" },
    priceRange: "££",
    image: `${SITE_URL}/images/og-default.jpg`,
    sameAs: [],
  };
}

export default async function Home() {
  const jsonLd = await getLocalBusinessJsonLd();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026'),
        }}
      />
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Services />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
