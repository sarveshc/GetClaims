export const dynamic = "force-dynamic";

/**
 * /api/upload — S3 Pre-signed URL Generator
 *
 * Flow:
 *  1. Browser POSTs { filename, contentType, fileSize, docType }
 *  2. Server validates and returns { uploadUrl, fileUrl }
 *  3. Browser PUTs the file directly to S3 using uploadUrl
 *  4. Browser uses fileUrl in the /api/contact submission
 *
 * Required env vars:
 *   AWS_REGION           e.g. ap-south-1
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_S3_BUCKET        your bucket name
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function getS3Client() {
  const { S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env;
  if (!S3_REGION || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) return null;
  return new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId:     S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  });
}

export async function POST(request) {
  const s3 = getS3Client();
  if (!s3) {
    return NextResponse.json(
      { error: "S3 is not configured. Set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET." },
      { status: 503 }
    );
  }

  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    return NextResponse.json({ error: "S3_BUCKET is not set." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { filename, contentType, fileSize, docType } = body;

  if (!filename || !contentType || !docType) {
    return NextResponse.json({ error: "filename, contentType and docType are required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Only PDF, JPG and PNG files are allowed." }, { status: 400 });
  }
  if (fileSize && fileSize > MAX_SIZE) {
    return NextResponse.json({ error: "File exceeds the 10 MB limit." }, { status: 400 });
  }

  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `claims/${docType}/${Date.now()}-${sanitized}`;

  try {
    const command = new PutObjectCommand({
      Bucket:      bucket,
      Key:         key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min
    const fileUrl   = `https://${bucket}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (err) {
    console.error("S3 pre-sign error:", err);
    return NextResponse.json({ error: "Failed to generate upload URL." }, { status: 500 });
  }
}
