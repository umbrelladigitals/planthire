'use server';

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { requireAdmin } from '@/lib/auth-guard';

// promisify writeFile and mkdir to use with async/await
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Define allowed file types and extensions — both must match
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Ensure the upload directory exists
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'images');

async function ensureUploadDirExists() {
  try {
    await mkdirAsync(UPLOAD_DIR, { recursive: true });
  } catch (error: unknown) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== 'EEXIST') {
      console.error('Failed to create upload directory:', error);
      throw new Error('Could not create upload directory on the server.');
    }
  }
}

export async function uploadFileAction(formData: FormData): Promise<{ success: boolean; error?: string; filePath?: string; fileName?: string; publicUrl?: string }> {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await ensureUploadDirExists();

    const file = formData.get('file') as File | null;

    if (!file) {
      return { success: false, error: 'No file provided.' };
    }

    // Validate MIME type (client-provided, secondary check)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, GIF, WEBP are allowed.' };
    }

    // Validate file extension (prevents disguised uploads)
    const fileExtension = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return { success: false, error: 'Invalid file extension. Only .jpg, .jpeg, .png, .gif, .webp are allowed.' };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: `File is too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate magic bytes — first 4 bytes must match a known image format
    const magic = buffer.subarray(0, 4);
    const isJpeg = magic[0] === 0xff && magic[1] === 0xd8;
    const isPng = magic[0] === 0x89 && magic[1] === 0x50 && magic[2] === 0x4e && magic[3] === 0x47;
    const isGif = magic[0] === 0x47 && magic[1] === 0x49 && magic[2] === 0x46;
    const isWebp = buffer.subarray(0, 12).toString('ascii', 8, 12) === 'WEBP';
    if (!isJpeg && !isPng && !isGif && !isWebp) {
      return { success: false, error: 'File content does not match a supported image format.' };
    }

    // Generate a safe, collision-resistant filename using only the sanitized extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uniqueFilename = `upload-${uniqueSuffix}${fileExtension}`;

    const filePath = path.join(UPLOAD_DIR, uniqueFilename);
    await writeFileAsync(filePath, buffer);

    const publicUrl = `/uploads/images/${uniqueFilename}`;

    return {
      success: true,
      filePath,
      fileName: uniqueFilename,
      publicUrl,
    };

  } catch (e: unknown) {
    console.error('Upload Error:', e);
    if (e instanceof Error && e.message.includes('Could not create upload directory')) {
      return { success: false, error: e.message };
    }
    return { success: false, error: 'An error occurred during file upload.' };
  }
}