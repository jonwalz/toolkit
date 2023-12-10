import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";

import { UserAuthForm } from ".";
import { AppRouterContextProviderMock } from "test/__mocks__/app-router-context-provider-mocks";

describe("UserAuthForm", () => {
  test("renders", () => {
    const push = vi.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <UserAuthForm />
      </AppRouterContextProviderMock>,
    );
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
  });
});
