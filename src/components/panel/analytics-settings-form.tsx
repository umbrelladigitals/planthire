'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getGoogleAnalyticsSettingsAction, updateGoogleAnalyticsSettingsAction } from "@/actions/settings-actions";
import { ReloadIcon } from "@radix-ui/react-icons";

export function AnalyticsSettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  // Load current settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const result = await getGoogleAnalyticsSettingsAction();
        if (result.success && result.data) {
          setTrackingId(result.data.trackingId || "");
          setEnabled(result.data.enabled || false);
        }
      } catch (error) {
        console.error("Error loading Google Analytics settings", error);
        setStatus({
          type: 'error',
          message: 'Error loading settings.'
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Handle settings update
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: null, message: null });

    try {
      // Create form data
      const formData = new FormData();
      formData.append('trackingId', trackingId);
      formData.append('enabled', enabled.toString());

      // Call server action
      const result = await updateGoogleAnalyticsSettingsAction(formData);

      if (!result.success) {
        throw new Error(result.error || "Error saving settings.");
      }

      // Show success message
      setStatus({
        type: 'success',
        message: 'Google Analytics settings updated successfully.'
      });
    } catch (error) {
      console.error("Save error:", error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : "Error saving settings."
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Google Analytics Settings</CardTitle>
        <CardDescription>
          Track your website visitor statistics with Google Analytics.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="h-[150px] flex items-center justify-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading Settings...</span>
            </div>
          ) : (
            <>
              {status.type && (
                <div className={`mb-4 p-3 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {status.message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="trackingId">Google Analytics Measurement ID</Label>
                <Input
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the measurement ID from your Google Analytics account. 
                  Usually starts with &quot;G-&quot; or &quot;UA-&quot;.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
                <Label htmlFor="enabled">Enable Google Analytics</Label>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading || isSaving}>
            {isSaving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 