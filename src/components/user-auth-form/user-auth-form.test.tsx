import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, afterEach } from "vitest";

import { UserAuthForm } from ".";
import { AppRouterContextProviderMock } from "test/__mocks__/app-router-context-provider-mocks";
import { QueryCache } from "@tanstack/react-query";

const queryCache = new QueryCache();

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
  useRouter() {
    return {
      push: () => vi.fn(),
      replace: () => vi.fn(),
      refresh: () => vi.fn(),
    };
  },
}));

describe("UserAuthForm", () => {
  afterEach(() => {
    queryCache.clear();
  });
  test("renders", async () => {
    const refresh = vi.fn();
    mockUsePathname.mockImplementation(() => "/login");

    render(
      <AppRouterContextProviderMock router={{ refresh }}>
        <UserAuthForm />
      </AppRouterContextProviderMock>,
    );

    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();

    const submitButton = screen.getByRole("button", {
      name: "Sign In with Email",
    });

    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Email must contain at least 3 character(s)"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Password must contain at least 3 character(s)"),
    ).toBeInTheDocument();

    // enter email
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "jon@dot.com" } });

    fireEvent.click(submitButton);
    // screen.debug();
    expect(
      await screen.findByText("Password must contain at least 3 character(s)"),
    ).toBeInTheDocument();

    // enter password
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123" } });

    // screen.debug();

    fireEvent.click(submitButton);
    await waitFor(() => expect(refresh).toHaveBeenCalled());
  });
});
