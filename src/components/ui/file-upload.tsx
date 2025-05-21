'use client';

import { useState, useRef, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { uploadFileAction } from '@/actions/file-actions'; // Server action
import { AlertCircle, CheckCircle2, UploadCloud, XIcon } from 'lucide-react'; // Icons

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string) => void;
  initialImageUrl?: string | null; // Mevcut bir resim URL'si varsa göstermek için
  label?: string;
}

export function FileUpload({ 
  onUploadSuccess,
  initialImageUrl,
  label = "Product Image"
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isUploading, startUploading] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadError(null);
      setUploadSuccess(false);
    } else {
        setSelectedFile(null);
        setPreviewUrl(initialImageUrl || null);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    startUploading(async () => {
      setUploadError(null);
      setUploadSuccess(false);
      try {
        const result = await uploadFileAction(formData);
        if (result.success && result.publicUrl) {
          setUploadSuccess(true);
          onUploadSuccess(result.publicUrl);
        } else {
          setUploadError(result.error || 'Upload failed. Please try again.');
        }
      } catch (error) {
        console.error("Upload client error:", error);
        setUploadError('An unexpected error occurred during upload.');
      }
    });
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
    // If there was an initial image, we might want to inform the parent to clear it
    // For now, just clearing locally. If onUploadSuccess was used to set a DB value,
    // a separate mechanism would be needed to clear it or upload a new one.
    onUploadSuccess(""); // Call with empty string to indicate removal/clearing
  };

  return (
    <div className="w-full">
      {label && <Label className="block mb-2">{label}</Label>}
      
      {/* Önizleme Alanı */}
      <div className="w-full flex flex-col items-center mb-3">
        <div className="w-28 h-28 border border-dashed rounded-md flex items-center justify-center bg-muted overflow-hidden">
          {previewUrl ? (
            <Image 
              src={previewUrl} 
              alt="Preview" 
              width={112} 
              height={112} 
              className="object-cover"
            />
          ) : (
            <UploadCloud className="w-10 h-10 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {/* Dosya Seçme ve Yükleme Alanı */}
      <div className="space-y-2 w-full">
          <Input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif,image/webp"
          className="sr-only"
        />
        
        {/* Dosya Adı Gösterimi */}
        {(selectedFile || previewUrl) && (
          <div className="text-xs text-center text-muted-foreground mb-2 w-full overflow-hidden text-ellipsis px-2">
            {selectedFile ? selectedFile.name : 'Current image selected'}
          </div>
        )}
        
        {/* Butonlar (Her Zaman Dikey) */}
        <div className="flex flex-col gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            Select File
          </Button>
          
          {/* Yükle ve Kaldır Butonları (Eğer Varsa) */}
          {(selectedFile || previewUrl) && (
            <div className="flex flex-col gap-2 w-full">
          {selectedFile && !uploadSuccess && (
                <Button 
                  onClick={handleUpload} 
                  disabled={isUploading} 
                  size="sm"
                  className="w-full"
                >
                  {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
              
              {(selectedFile || previewUrl) && !isUploading && (
                <Button 
                  onClick={handleRemoveImage} 
                  variant="outline" 
                  size="sm"
                  className="w-full text-destructive hover:text-destructive"
                >
                <XIcon className="w-4 h-4 mr-1"/> Remove
            </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Hata ve Başarı Mesajları */}
      {uploadError && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded-md overflow-hidden break-words">
          <AlertCircle className="w-4 h-4 mr-1 inline-block flex-shrink-0"/> 
            {uploadError}
        </div>
      )}
      
      {uploadSuccess && selectedFile && (
        <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded-md overflow-hidden break-words">
          <CheckCircle2 className="w-4 h-4 mr-1 inline-block flex-shrink-0"/>
          Image uploaded successfully!
        </div>
      )}
    </div>
  );
} 