import { HttpResponse, http } from "msw";

export const handlers = [
  http.post("http://localhost:8080/auth/v1/token", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
  http.get("/login", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
