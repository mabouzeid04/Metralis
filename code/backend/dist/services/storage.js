"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamDocumentFromS3 = exports.saveDocumentToS3 = exports.s3 = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../config/env");
const crypto_1 = require("crypto");
const stream_1 = require("stream");
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 },
});
const s3Config = {
    region: env_1.env.s3.region,
    forcePathStyle: env_1.env.s3.forcePathStyle,
    credentials: {
        accessKeyId: env_1.env.s3.accessKey,
        secretAccessKey: env_1.env.s3.secretKey,
    },
};
if (env_1.env.s3.endpoint) {
    s3Config.endpoint = env_1.env.s3.endpoint;
}
exports.s3 = new client_s3_1.S3Client(s3Config);
const saveDocumentToS3 = async (file) => {
    const key = `documents/${(0, crypto_1.randomUUID)()}-${file.originalname}`;
    await exports.s3.send(new client_s3_1.PutObjectCommand({
        Bucket: env_1.env.s3.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    }));
    return key;
};
exports.saveDocumentToS3 = saveDocumentToS3;
const streamDocumentFromS3 = async (key, res) => {
    const object = await exports.s3.send(new client_s3_1.GetObjectCommand({
        Bucket: env_1.env.s3.bucket,
        Key: key,
    }));
    res.setHeader("Content-Type", object.ContentType ?? "application/octet-stream");
    const body = object.Body;
    if (!body) {
        throw new Error("Empty S3 object");
    }
    if (body instanceof stream_1.Readable) {
        return body.pipe(res);
    }
    if (typeof body.stream === "function") {
        return body.stream().pipe(res);
    }
    const buffer = await body.transformToByteArray();
    return res.send(Buffer.from(buffer));
};
exports.streamDocumentFromS3 = streamDocumentFromS3;
//# sourceMappingURL=storage.js.map