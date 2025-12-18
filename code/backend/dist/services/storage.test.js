"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const storage_1 = require("./storage");
const s3Send = storage_1.s3.send;
const createFile = (overrides) => ({
    fieldname: "file",
    originalname: "test.txt",
    encoding: "7bit",
    mimetype: "text/plain",
    size: overrides?.buffer?.length ?? 0,
    stream: null,
    destination: "",
    filename: "",
    path: "",
    buffer: Buffer.from("hello world"),
    ...overrides,
});
(0, vitest_1.beforeEach)(() => {
    s3Send.mockClear();
});
(0, vitest_1.describe)("saveDocumentToS3", () => {
    (0, vitest_1.it)("uploads with generated key containing original name", async () => {
        const key = await (0, storage_1.saveDocumentToS3)(createFile());
        (0, vitest_1.expect)(key).toMatch(/documents\/.+-test\.txt/);
        (0, vitest_1.expect)(s3Send).toHaveBeenCalled();
        (0, vitest_1.expect)(s3Send.mock.calls[0][0].params.Bucket).toBe(process.env.S3_BUCKET);
    });
});
(0, vitest_1.describe)("downloadDocumentBuffer", () => {
    (0, vitest_1.it)("returns buffer contents from s3", async () => {
        const buffer = await (0, storage_1.downloadDocumentBuffer)("path/to/file");
        (0, vitest_1.expect)(Buffer.isBuffer(buffer)).toBe(true);
        (0, vitest_1.expect)(s3Send).toHaveBeenCalledWith(vitest_1.expect.anything());
    });
});
(0, vitest_1.describe)("streamDocumentFromS3", () => {
    (0, vitest_1.it)("sends streamed content with headers", async () => {
        const headers = {};
        const sent = [];
        const res = {
            setHeader: (key, value) => {
                headers[key] = value;
            },
            send: (payload) => {
                sent.push(payload);
                return payload;
            },
        };
        await (0, storage_1.streamDocumentFromS3)("path/to/file", res);
        (0, vitest_1.expect)(headers["Content-Type"]).toBe("application/octet-stream");
        (0, vitest_1.expect)(Buffer.isBuffer(sent[0])).toBe(true);
    });
});
//# sourceMappingURL=storage.test.js.map