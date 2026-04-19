'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="bg-white border-2 border-slate-900 w-full">
      <div className="p-6 border-b-2 border-slate-900 bg-slate-50">
        <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900">Google Analytics Settings</h3>
        <p className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
          Track your website visitor statistics with Google Analytics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="h-[150px] flex items-center justify-center font-bold uppercase tracking-widest text-slate-500 text-xs">
              <ReloadIcon className="mr-3 h-5 w-5 animate-spin text-slate-900" />
              <span>LOADING SETTINGS...</span>
            </div>
          ) : (
            <>
              {status.type && (
                <div className={`p-4 font-bold uppercase tracking-wider text-xs border-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {status.message}
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="trackingId" className="text-xs font-black uppercase tracking-widest text-slate-900 block">Google Analytics Measurement ID</Label>
                <Input
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="G-XXXXXXXXXX OR UA-XXXXXXXXX-X"
                  className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900 uppercase"
                />
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2">
                  Enter the measurement ID from your Google Analytics account. Usually starts with &quot;G-&quot; or &quot;UA-&quot;.
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t-2 border-slate-100 bg-slate-50 p-4 border w-full md:w-max">
                <Switch
                  id="enabled"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="enabled" className="text-xs font-black uppercase tracking-widest text-slate-900">Enable Google Analytics</Label>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t-2 border-slate-900 bg-slate-50 flex justify-end">
          <Button type="submit" disabled={isLoading || isSaving} className="h-12 px-8 rounded-none bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs transition-colors">
            {isSaving && <ReloadIcon className="mr-3 h-4 w-4 animate-spin" />}
            {isSaving ? "SAVING..." : "SAVE CHANGES"}
          </Button>
        </div>
      </form>
    </div>
  );
} 