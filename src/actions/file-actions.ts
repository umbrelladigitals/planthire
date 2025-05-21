'use server';

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

// promisify writeFile and mkdir to use with async/await
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Define allowed file types and max size (e.g., 5MB)
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Ensure the upload directory exists
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'images');

async function ensureUploadDirExists() {
  try {
    await mkdirAsync(UPLOAD_DIR, { recursive: true });
  } catch (error: unknown) {
    // Assert the error type to access specific properties
    const nodeError = error as NodeJS.ErrnoException;

    // Ignore EEXIST error (directory already exists)
    if (nodeError.code !== 'EEXIST') {
      console.error('Failed to create upload directory:', error);
      throw new Error('Could not create upload directory on the server.');
    }
  }
}

export async function uploadFileAction(formData: FormData): Promise<{ success: boolean; error?: string; filePath?: string; fileName?: string; publicUrl?: string }> {
  try {
    await ensureUploadDirExists();

    const file = formData.get('file') as File | null;

    if (!file) {
      return { success: false, error: 'No file provided.' };
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, GIF, WEBP are allowed.' };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: `File is too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename (e.g., timestamp + original name)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.name);
    const uniqueFilename = file.name.replace(fileExtension, '').replace(/[^a-zA-Z0-9]/g, '-') + '-' + uniqueSuffix + fileExtension;
    
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    await writeFileAsync(filePath, buffer);

    const publicUrl = `/uploads/images/${uniqueFilename}`;

    console.log(`File uploaded successfully to: ${filePath}`);
    console.log(`Public URL: ${publicUrl}`);

    return {
      success: true,
      filePath: filePath, // Server-side path
      fileName: uniqueFilename,
      publicUrl: publicUrl,  // URL to access the file from the client
    };

  } catch (e: unknown) {
    console.error('Upload Error:', e);
    // Check for specific errors or provide a generic message
    if (e instanceof Error) {
        if (e.message.includes('Could not create upload directory')) {
            return { success: false, error: e.message };
        }
        // Return generic error message if it's a standard Error but not a specific case
        return { success: false, error: 'An error occurred during file upload: ' + e.message };
    } else {
        // Handle cases where the caught value is not an Error instance
        return { success: false, error: 'An unknown error occurred during file upload.' };
    }
  }
} 