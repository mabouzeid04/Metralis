import { beforeEach, describe, expect, it } from "vitest";
import type { Mock } from "vitest";
import { downloadDocumentBuffer, saveDocumentToS3, streamDocumentFromS3, s3 } from "./storage";

const s3Send = s3.send as unknown as Mock;

const createFile = (overrides?: Partial<Express.Multer.File>): Express.Multer.File => ({
  fieldname: "file",
  originalname: "test.txt",
  encoding: "7bit",
  mimetype: "text/plain",
  size: overrides?.buffer?.length ?? 0,
  stream: null as any,
  destination: "",
  filename: "",
  path: "",
  buffer: Buffer.from("hello world"),
  ...overrides,
});

beforeEach(() => {
  s3Send.mockClear();
});

describe("saveDocumentToS3", () => {
  it("uploads with generated key containing original name", async () => {
    const key = await saveDocumentToS3(createFile());

    expect(key).toMatch(/documents\/.+-test\.txt/);
    expect(s3Send).toHaveBeenCalled();
    expect(s3Send.mock.calls[0][0].params.Bucket).toBe(process.env.S3_BUCKET);
  });
});

describe("downloadDocumentBuffer", () => {
  it("returns buffer contents from s3", async () => {
    const buffer = await downloadDocumentBuffer("path/to/file");

    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(s3Send).toHaveBeenCalledWith(expect.anything());
  });
});

describe("streamDocumentFromS3", () => {
  it("sends streamed content with headers", async () => {
    const headers: Record<string, string> = {};
    const sent: any[] = [];
    const res = {
      setHeader: (key: string, value: string) => {
        headers[key] = value;
      },
      send: (payload: any) => {
        sent.push(payload);
        return payload;
      },
    } as any;

    await streamDocumentFromS3("path/to/file", res);

    expect(headers["Content-Type"]).toBe("application/octet-stream");
    expect(Buffer.isBuffer(sent[0])).toBe(true);
  });
});
