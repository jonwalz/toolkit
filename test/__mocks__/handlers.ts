import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/auth/v1/token", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
