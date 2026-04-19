import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getGeneralSettings } from "@/lib/settings";
import EquipmentDetailClient from "./EquipmentDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aberdeenshireplanthire.co.uk";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const settings = await getGeneralSettings();
  const siteName = settings?.siteName || "Aberdeenshire Plant Hire";

  const equipment = await db.equipment.findUnique({
    where: { id },
    select: { name: true, description: true, imageUrl: true },
  });

  if (!equipment) return { title: "Equipment Not Found" };

  const title = `${equipment.name} – Hire in Aberdeenshire`;
  const description =
    equipment.description ||
    `Hire the ${equipment.name} from ${siteName}. Available for delivery across Aberdeenshire and North East Scotland.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${id}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/products/${id}`,
      title,
      description,
      images: equipment.imageUrl
        ? [{ url: equipment.imageUrl, alt: equipment.name }]
        : [{ url: `${SITE_URL}/images/og-default.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: equipment.imageUrl ? [equipment.imageUrl] : [`${SITE_URL}/images/og-default.jpg`],
    },
  };
}

export default async function EquipmentDetailsPage({ params }: Props) {
  const { id } = await params;
  const equipment = await db.equipment.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!equipment) return notFound();
  return <EquipmentDetailClient params={params} />;
}
