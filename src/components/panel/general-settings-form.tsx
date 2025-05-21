'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Site Settings</CardTitle>
        <CardDescription>
          Manage the basic information for your website, such as site title and description.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="h-[200px] flex items-center justify-center">
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
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g., My Awesome Website"
                />
                <p className="text-xs text-muted-foreground">
                  This name will appear in browser tabs and search engine results.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  placeholder="e.g., A brief summary of what your website is about."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  A short description for search engines and social media previews.
                </p>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading || isSaving}>
            {isSaving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 