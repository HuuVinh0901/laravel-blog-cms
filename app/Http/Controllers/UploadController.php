<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        Log::info('Full Request Data: ', $request->all());
        Log::info('All Files in Request: ', $request->allFiles());

        if (!$request->hasFile('image')) {
            Log::error('No file uploaded. Request files: ', $request->allFiles());
            return response()->json([
                'success' => false,
                'message' => 'No image file uploaded with key "image". Please check the key name.'
            ], 400);
        }

        $request->validate([
            'image' => 'required|image|max:2048', 
        ]);

        $file = $request->file('image');

        if (!$file->isValid()) {
            Log::error('File is not valid: ', ['file' => $file->getErrorMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'The uploaded file is not valid: ' . $file->getErrorMessage()
            ], 400);
        }

        $filePath = $file->getRealPath();
        Log::info('File Real Path: ', ['path' => $filePath]);

        $cloudinaryConfig = config('cloudinary.cloud_url');
        Log::info('Cloudinary Config: ', ['url' => $cloudinaryConfig]);

        try {
           
            $uploadedFileUrl = Cloudinary::upload($file->path(), [
                'folder' => 'Blog_Laravel/blog_image',
                'public_id' => 'post_' . time(),
            ])->getSecurePath();

            Log::info('Upload successful. URL: ' . $uploadedFileUrl);
            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'url' => $uploadedFileUrl,
                'folder' => 'Blog_Laravel/blog_image'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Upload error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Error uploading image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function testUpload(Request $request)
    {
        Log::info('Test Upload Request: ', $request->all());
        Log::info('Test Upload Files: ', $request->allFiles());
        if ($request->hasFile('image')) {
            Log::info('File detected: ', $request->allFiles());
            return response()->json(['message' => 'File OK']);
        }
        Log::error('No file detected in test upload. Request: ', $request->all());
        return response()->json(['message' => 'No file']);
    }
}