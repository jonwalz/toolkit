import "@testing-library/jest-dom/vitest";

import { server } from "./__mocks__/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
