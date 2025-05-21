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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductFormDialog } from "@/components/panel/ProductFormDialog";
import { getGeneralSettings, getSetting, SETTINGS_KEYS } from "@/lib/settings"; // Genel ayarları almak için
import { getGoogleAnalyticsData } from "@/lib/ga-data"; // Yeni import
import { AuditLogAction, type AuditLogActionType, type AuditLogDetails } from "@/lib/audit-types"; 
import { formatDistanceToNow } from 'date-fns';
import type { AuditLog as AuditLogPrismaType } from '@prisma/client'; // Prisma'dan AuditLog tipini import et
import { revalidatePath } from "next/cache"; // For revalidating path

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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{siteName} Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <ProductFormDialog onFormSubmit={handleFormSubmit} /> 
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <Link href={stat.href} className="block h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            {recentActivities.length === 0 && (
                <CardDescription>No recent activity to display.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="text-sm">
            {recentActivities.length > 0 ? (
                <ul className="space-y-4">
                {recentActivities.map((activity: AuditLogPrismaType) => {
                  const details = activity.details as AuditLogDetails | null;
                  const IconComponent = getActivityIcon(activity.action as AuditLogActionType);
                  const title = getActivityTitle(activity.action as AuditLogActionType, details);
                  const description = getActivityDescription(activity.action as AuditLogActionType, details);
                  
                  return (
                    <li key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        {IconComponent}
                      </span>
                      <div>
                        <p className="font-medium">{title}</p>
                        {description && <p className="text-xs text-muted-foreground">{description}</p>}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </CardContent>
        </Card>

        {/* Site Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Site Overview (Last 7 Days)</CardTitle>
            {!gaEnabled && (
                <CardDescription className="text-orange-600 dark:text-orange-400 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" /> Google Analytics is disabled in settings.
                </CardDescription>
            )}
            {gaEnabled && analyticsData && 'error' in analyticsData && (
                <CardDescription className="text-red-600 dark:text-red-400">
                    <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" /> Error: {analyticsData.error}
                    </div>
                    {analyticsData.message && <p className="text-xs mt-1">{analyticsData.message}</p>}
                </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {gaEnabled && analyticsData && !('error' in analyticsData) ? (
              <>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Unique Visitors</p>
                    <p className="text-lg font-bold">{analyticsData.activeUsers}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Page Views</p>
                    <p className="text-lg font-bold">{analyticsData.screenPageViews}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Data from Google Analytics. Last updated: {analyticsData.lastUpdated}.
                </p>
              </>
            ) : gaEnabled && !analyticsData ? (
                // Veri yüklenirken veya ilk yüklemede gösterilecek yer tutucu
                <div className="text-sm text-muted-foreground">
                    <p>Loading Analytics data...</p>
                    <p className="text-xs mt-1">If this persists, ensure your GA4 Property ID is correct and the service account has permissions.</p>
                </div>
            ) : null}
            {!gaEnabled && (
                 <div className="text-sm text-muted-foreground">
                    <p>Enable Google Analytics in settings to view site overview.</p>
                </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/panel/settings#analytics">
                View Analytics Settings
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 