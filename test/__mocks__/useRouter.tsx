import { vi } from "vitest";

export const useRouter = () => ({
  pathname: "/mock-path",
  query: { mock: "query" },
  push: vi.fn(),
  // Add other methods and properties you need to mock
});
