import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsSettingsForm } from "@/components/panel/analytics-settings-form";
import { GeneralSettingsForm } from "@/components/panel/general-settings-form";
import { SocialMediaSettingsForm } from "@/components/panel/social-media-settings-form";
import { AdminPageHeader } from "@/components/panel/admin-page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="SITE SETTINGS"
        description="Manage your website's basic settings, analytics, and social media links."
      />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-slate-100 border-2 border-slate-900 rounded-none p-1 flex gap-1 h-auto items-stretch justify-start w-full md:w-auto overflow-x-auto">
          <TabsTrigger value="general" className="rounded-none font-bold tracking-widest uppercase text-xs data-[state=active]:bg-slate-900 data-[state=active]:text-white h-10 px-6">General</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-none font-bold tracking-widest uppercase text-xs data-[state=active]:bg-slate-900 data-[state=active]:text-white h-10 px-6">Analytics</TabsTrigger>
          <TabsTrigger value="social" className="rounded-none font-bold tracking-widest uppercase text-xs data-[state=active]:bg-slate-900 data-[state=active]:text-white h-10 px-6">Social Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <GeneralSettingsForm />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsSettingsForm />
        </TabsContent>
                
        <TabsContent value="social" className="space-y-4">
          <SocialMediaSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
} 