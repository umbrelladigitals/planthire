import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsSettingsForm } from "@/components/panel/analytics-settings-form";
import { GeneralSettingsForm } from "@/components/panel/general-settings-form";
import { SocialMediaSettingsForm } from "@/components/panel/social-media-settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
        <p className="text-muted-foreground">
          Manage your website&apos;s basic settings, analytics, and social media links.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
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