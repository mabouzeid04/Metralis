import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env";
import { randomUUID } from "crypto";
import type { Response } from "express";
import type { S3ClientConfig } from "@aws-sdk/client-s3";
import { Readable } from "stream";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

const s3Config: S3ClientConfig = {
  region: env.s3.region,
  forcePathStyle: env.s3.forcePathStyle,
  credentials: {
    accessKeyId: env.s3.accessKey,
    secretAccessKey: env.s3.secretKey,
  },
};

if (env.s3.endpoint) {
  s3Config.endpoint = env.s3.endpoint;
}

export const s3 = new S3Client(s3Config);

export const saveDocumentToS3 = async (file: Express.Multer.File) => {
  const key = `documents/${randomUUID()}-${file.originalname}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: env.s3.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );
  return key;
};

export const streamDocumentFromS3 = async (key: string, res: Response) => {
  const object = await s3.send(
    new GetObjectCommand({
      Bucket: env.s3.bucket,
      Key: key,
    }),
  );

  res.setHeader("Content-Type", object.ContentType ?? "application/octet-stream");

  const body = object.Body;
  if (!body) {
    throw new Error("Empty S3 object");
  }

  if (body instanceof Readable) {
    return body.pipe(res);
  }

  if (typeof (body as any).stream === "function") {
    return (body as any).stream().pipe(res);
  }

  const buffer = await body.transformToByteArray();
  return res.send(Buffer.from(buffer));
};


