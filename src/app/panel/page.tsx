import { db } from "@/lib/db"; // db instance'ını lib klasöründen alalım
import Link from "next/link";
import { 
  Package, 
  Image as ImageIcon,
  Mail,
  Boxes,
  LineChart, // Yeni ikon
  Users, // Yeni ikon
  AlertTriangle, // Hata gösterimi için ikon
  Settings, 
  FilePlus, 
  MessageSquarePlus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFormDialog } from "@/components/panel/ProductFormDialog";
import { getGeneralSettings, getSetting, SETTINGS_KEYS } from "@/lib/settings"; // Genel ayarları almak için
import { getGoogleAnalyticsData } from "@/lib/ga-data"; // Yeni import
import { AuditLogAction, type AuditLogActionType, type AuditLogDetails } from "@/lib/audit-types"; 
import { formatDistanceToNow } from 'date-fns';
import type { AuditLog as AuditLogPrismaType } from '@prisma/client'; // Prisma'dan AuditLog tipini import et
import { revalidatePath } from "next/cache"; // For revalidating path

import { AdminPageHeader } from "@/components/panel/admin-page-header";

function getActivityIcon(action: AuditLogActionType) {
  switch (action) {
    case AuditLogAction.PRODUCT_CREATED:
    case AuditLogAction.PRODUCT_UPDATED:
    case AuditLogAction.PRODUCT_DELETED:
      return <FilePlus className="h-4 w-4" />;
    case AuditLogAction.GALLERY_IMAGE_ADDED:
    case AuditLogAction.GALLERY_IMAGE_DELETED:
      return <ImageIcon className="h-4 w-4" />;
    case AuditLogAction.CONTACT_SUBMITTED:
    case AuditLogAction.CONTACT_MARKED_AS_READ:
      return <MessageSquarePlus className="h-4 w-4" />;
    case AuditLogAction.SETTINGS_UPDATED:
      return <Settings className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

function getActivityDescription(action: AuditLogActionType, details: AuditLogDetails | null): string {
  if (!details) return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

  switch (action) {
    case AuditLogAction.PRODUCT_CREATED:
      return `${details.productName || 'New product'} was added to inventory.`;
    case AuditLogAction.SETTINGS_UPDATED:
      return `${details.category || 'Site'} settings were updated.`;
    case AuditLogAction.CONTACT_SUBMITTED:
      return `New contact request from ${details.submitterName || 'a user'}.`;
    case AuditLogAction.GALLERY_IMAGE_ADDED:
      return `New image added to gallery${details.imageUrl ? ` (${details.imageUrl.substring(0,30)}...)`: ''}.`;
    default:
      return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) + (details.productName ? ` (${details.productName})` : '');
  }
}

function getActivityTitle(action: AuditLogActionType, details: AuditLogDetails | null): string {
    switch (action) {
        case AuditLogAction.PRODUCT_CREATED:
          return "New Product Added";
        case AuditLogAction.SETTINGS_UPDATED:
          return `${details?.category || 'Site'} Settings Updated`;
        case AuditLogAction.CONTACT_SUBMITTED:
          return "New Contact Request";
        case AuditLogAction.GALLERY_IMAGE_ADDED:
          return "Gallery Image Added";
        default:
          return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
      }
}

export default async function PanelPage() {
  const equipmentCount = await db.equipment.count();
  const galleryCount = await db.gallery.count(); 
  const contactRequests = await db.contactSubmission.findMany({
    where: { isRead: false }, // Sadece okunmamışları sayalım
    orderBy: { createdAt: 'desc' },
  });
  const unreadContactRequestsCount = contactRequests.length;

  // Genel site ayarlarını çekelim
  const generalSettings = await getGeneralSettings();
  const siteName = generalSettings?.siteName || "PlantHire Site";

  const gaEnabled = await getSetting(SETTINGS_KEYS.GOOGLE_ANALYTICS_ENABLED) === 'true';
  let analyticsData: Awaited<ReturnType<typeof getGoogleAnalyticsData>> | null = null;

  if (gaEnabled) {
    analyticsData = await getGoogleAnalyticsData();
  }

  // Fetch recent activities for the dashboard
  const recentActivities = await db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const stats = [
    {
      title: "Total Products",
      value: equipmentCount.toString(),
      description: `${equipmentCount} items in inventory`,
      icon: <Boxes className="h-4 w-4 text-muted-foreground" />,
      href: "/panel/products"
    },
    {
      title: "Gallery Images",
      value: galleryCount.toString(),
      description: `${galleryCount} images in gallery`,
      icon: <ImageIcon className="h-4 w-4 text-muted-foreground" />,
      href: "/panel/gallery"
    },
    {
      title: "Unread Contacts",
      value: unreadContactRequestsCount.toString(),
      description: `${unreadContactRequestsCount > 0 ? unreadContactRequestsCount + ' new messages' : 'No new messages'}`,
      icon: <Mail className="h-4 w-4 text-muted-foreground" />,
      href: "/panel/contacts"
    }
  ];

  // Server action for revalidation
  async function handleFormSubmit() {
    'use server';
    revalidatePath("/panel/products");
    revalidatePath("/panel");
  }

  return (
    <div className="space-y-12">
      <AdminPageHeader 
        title={`${siteName} DASHBOARD`}
        description="System overview and recent administration activity."
        action={<ProductFormDialog onFormSubmit={handleFormSubmit} />}
      />
      
      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href} className="group block h-full flex flex-col bg-white border border-slate-200 hover:border-slate-900 transition-colors">
            <div className="p-6 flex flex-row items-center justify-between border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">
                {stat.title}
              </h3>
              <div className="text-slate-400 group-hover:text-primary transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                {stat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-widest">Recent Activity</h3>
            {recentActivities.length === 0 && (
                <p className="text-slate-500 text-sm mt-2 font-medium">No recent activity to display.</p>
            )}
          </div>
          <div className="p-6 text-sm flex-grow">
            {recentActivities.length > 0 ? (
                <ul className="space-y-4">
                {recentActivities.map((activity: AuditLogPrismaType) => {
                  const details = activity.details as AuditLogDetails | null;
                  const IconComponent = getActivityIcon(activity.action as AuditLogActionType);
                  const title = getActivityTitle(activity.action as AuditLogActionType, details);
                  const description = getActivityDescription(activity.action as AuditLogActionType, details);
                  
                  return (
                    <li key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0 group">
                      <span className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors">
                        {IconComponent}
                      </span>
                      <div>
                        <p className="font-extrabold text-slate-900 uppercase tracking-wide text-sm">{title}</p>
                        {description && <p className="text-xs text-slate-600 font-medium mt-1">{description}</p>}
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Site Overview Card */}
        <div className="bg-white border border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-widest">Site Metrics</h3>
            {!gaEnabled && (
                <p className="text-orange-600 flex items-center text-xs font-bold uppercase tracking-wider mt-3">
                    <AlertTriangle className="h-4 w-4 mr-2" /> Google Analytics Disabled
                </p>
            )}
            {gaEnabled && analyticsData && 'error' in analyticsData && (
                <div className="text-red-600 mt-3 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Error: {analyticsData.error}
                    </div>
                    {analyticsData.message && <p className="mt-1">{analyticsData.message}</p>}
                </div>
            )}
          </div>
          <div className="p-6 space-y-6 flex-grow">
            {gaEnabled && analyticsData && !('error' in analyticsData) ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-slate-400 mr-3" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unique Visitors</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{analyticsData.activeUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LineChart className="h-5 w-5 text-slate-400 mr-3" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Page Views</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{analyticsData.screenPageViews}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    Data from Google Analytics.<br/>Last updated: <span className="text-slate-900">{analyticsData.lastUpdated}</span>
                  </p>
                </div>
              </>
            ) : gaEnabled && !analyticsData ? (
                <div className="text-sm text-slate-500 font-medium">
                    <p>Loading Analytics data...</p>
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest text-slate-400">If this persists, check GA4 configurations.</p>
                </div>
            ) : null}
            {!gaEnabled && (
                 <div className="text-sm text-slate-500 font-medium h-full flex items-center">
                    <p>Enable Google Analytics in settings to view live metrics.</p>
                </div>
            )}
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-200 mt-auto">
            <Button className="w-full h-12 rounded-none bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-primary transition-colors" asChild>
              <Link href="/panel/settings#analytics">
                Analytics Configuration
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 