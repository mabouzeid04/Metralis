import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import type { Response } from "express";
export declare const upload: multer.Multer;
export declare const s3: S3Client;
export declare const saveDocumentToS3: (file: Express.Multer.File) => Promise<string>;
export declare const streamDocumentFromS3: (key: string, res: Response) => Promise<any>;
//# sourceMappingURL=storage.d.ts.map