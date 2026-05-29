export const dynamic = "force-dynamic";

/**
 * /api/upload — Vercel Blob Client Upload Handler
 *
 * How it works:
 *  1. Browser calls @vercel/blob's `upload()` which first hits this route
 *     to get a signed upload token.
 *  2. Browser uploads the file DIRECTLY to Vercel Blob CDN using that token.
 *     The file never passes through this server, so no size limits apply.
 *  3. Vercel Blob returns a permanent public URL to the browser.
 *  4. Browser includes that URL in the final /api/contact POST.
 *
 * Allowed: PDF, JPG, JPEG, PNG — max 10 MB per file
 */

import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Validate file type and size before generating an upload token
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB per file
          // Optionally add token payload (e.g. user session) for onUploadCompleted
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: log or save metadata when each upload completes
        console.log("Blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
