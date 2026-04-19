'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getGeneralSettingsAction, updateGeneralSettingsAction } from "@/actions/settings-actions";
import { ReloadIcon } from "@radix-ui/react-icons";

export function GeneralSettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const result = await getGeneralSettingsAction();
        if (result.success && result.data) {
          setSiteName(result.data.siteName || "");
          setSiteDescription(result.data.siteDescription || "");
        }
      } catch (error) {
        console.error("Error loading general settings", error);
        setStatus({
          type: 'error',
          message: 'Error loading general settings.'
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: null, message: null });

    try {
      const formData = new FormData();
      formData.append('siteName', siteName);
      formData.append('siteDescription', siteDescription);

      const result = await updateGeneralSettingsAction(formData);

      if (!result.success) {
        throw new Error(result.error || "Error saving general settings.");
      }
      setStatus({
        type: 'success',
        message: 'General settings updated successfully.'
      });
    } catch (error) {
      console.error("Save error:", error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : "Error saving general settings."
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="bg-white border-2 border-slate-900 w-full">
      <div className="p-6 border-b-2 border-slate-900 bg-slate-50">
        <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900">General Site Settings</h3>
        <p className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
          Manage the basic information for your website, such as site title and description.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="h-[200px] flex items-center justify-center font-bold uppercase tracking-widest text-slate-500 text-xs">
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
                <Label htmlFor="siteName" className="text-xs font-black uppercase tracking-widest text-slate-900 block">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="E.G. PLANTHIRE"
                  className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900 uppercase"
                />
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2">
                  This name will appear in browser tabs and search engine results.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-slate-100">
                <Label htmlFor="siteDescription" className="text-xs font-black uppercase tracking-widest text-slate-900 block">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  placeholder="Enter a brief summary..."
                  className="w-full min-h-[100px] rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900 resize-none"
                  rows={3}
                />
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2">
                  A short description for search engines and social media previews.
                </p>
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