import request, { SuperTest, Test } from "supertest";
import { createApp } from "../../app";

const app = createApp();

export const createAgent = (): SuperTest<Test> => request(app);
