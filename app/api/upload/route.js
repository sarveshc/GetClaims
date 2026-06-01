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
  // Guard: BLOB_READ_WRITE_TOKEN must be set (and not the placeholder value)
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || "";
  if (!blobToken || blobToken.includes("xxxxxxxx")) {
    console.error("BLOB_READ_WRITE_TOKEN is not set — file upload disabled");
    return NextResponse.json(
      { error: "File storage is not configured on this server. Please submit your case without documents, or contact support@getclaims.in directly." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB per file
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error.message || "File upload failed" },
      { status: 400 }
    );
  }
}
