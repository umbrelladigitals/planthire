'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSocialMediaSettingsAction, updateSocialMediaSettingsAction } from "@/actions/settings-actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface SocialLinkInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

function SocialLinkInput({ id, label, value, onChange, placeholder, icon }: SocialLinkInputProps) {
  return (
    <div className="space-y-3 pt-4 border-t-2 border-slate-100 first:border-0 first:pt-0">
      <Label htmlFor={id} className="flex items-center text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
        {icon}
        <span className="ml-2">{label}</span>
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900"
      />
    </div>
  );
}

export function SocialMediaSettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const result = await getSocialMediaSettingsAction();
        if (result.success && result.data) {
          setFacebook(result.data.facebook || "");
          setInstagram(result.data.instagram || "");
          setTwitter(result.data.twitter || "");
          setLinkedin(result.data.linkedin || "");
        }
      } catch (error) {
        console.error("Error loading social media settings", error);
        setStatus({
          type: 'error',
          message: 'Error loading social media settings.'
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
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('twitter', twitter);
      formData.append('linkedin', linkedin);

      const result = await updateSocialMediaSettingsAction(formData);

      if (!result.success) {
        throw new Error(result.error || "Error saving social media settings.");
      }
      setStatus({
        type: 'success',
        message: 'Social media settings updated successfully.'
      });
    } catch (error) {
      console.error("Save error:", error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : "Error saving social media settings."
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="bg-white border-2 border-slate-900 w-full">
      <div className="p-6 border-b-2 border-slate-900 bg-slate-50">
        <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900">Social Media Links</h3>
        <p className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
          Manage links to your social media profiles. These will be displayed in the site footer.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center font-bold uppercase tracking-widest text-slate-500 text-xs">
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
              <SocialLinkInput
                id="facebook"
                label="Facebook URL"
                value={facebook}
                onChange={setFacebook}
                placeholder="https://facebook.com/yourpage"
                icon={<Facebook className="h-5 w-5" />}
              />
              <SocialLinkInput
                id="instagram"
                label="Instagram URL"
                value={instagram}
                onChange={setInstagram}
                placeholder="https://instagram.com/yourprofile"
                icon={<Instagram className="h-5 w-5" />}
              />
              <SocialLinkInput
                id="twitter"
                label="Twitter (X) URL"
                value={twitter}
                onChange={setTwitter}
                placeholder="https://twitter.com/yourhandle"
                icon={<Twitter className="h-5 w-5" />}
              />
              <SocialLinkInput
                id="linkedin"
                label="LinkedIn URL"
                value={linkedin}
                onChange={setLinkedin}
                placeholder="https://linkedin.com/in/yourprofile"
                icon={<Linkedin className="h-5 w-5" />}
              />
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