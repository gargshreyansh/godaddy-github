import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { act } from "react";

describe("App Component", () => {
  test("renders GoDaddy Repositories heading", async () => {
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      );
    });
  });
});
