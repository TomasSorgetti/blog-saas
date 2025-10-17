import { jest } from "@jest/globals";

beforeAll(() => {
  console.log("🧪 Running Jest setup...");
});

afterEach(() => {
  jest.clearAllMocks();
});
