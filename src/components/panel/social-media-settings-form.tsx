'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>
          Manage links to your social media profiles. These will be displayed in the site footer.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
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