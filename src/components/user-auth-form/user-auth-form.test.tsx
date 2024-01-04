import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, describe, vi, afterEach } from "vitest";

import { UserAuthForm } from ".";
import { AppRouterContextProviderMock } from "test/__mocks__/app-router-context-provider-mocks";
import { QueryCache } from "@tanstack/react-query";

const queryCache = new QueryCache();

describe("UserAuthForm", () => {
  afterEach(() => {
    queryCache.clear();
  });
  test("renders", async () => {
    const push = vi.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <UserAuthForm />
      </AppRouterContextProviderMock>,
    );

    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();

    const submitButton = screen.getByRole("button", {
      name: "Sign Up with Email",
    });

    expect(submitButton).toBeTruthy();

    fireEvent.click(submitButton);

    expect(await screen.findByText("String must contain at least 3 character(s)")).toBeInTheDocument();
    
    // enter email
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "jon@dot.com" }});
    
    fireEvent.click(submitButton);
    screen.debug();
    expect(await screen.findByText("String must contain at least 3 character(s)")).toBeInTheDocument();

    // enter password
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123" }});

    screen.debug();

    fireEvent.click(submitButton);
    expect(push).toHaveBeenCalled();
  });
});
