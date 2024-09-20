import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RepoDetails from "../components/RepoDetails";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("RepoDetails Component", () => {
  const mockRepo = {
    name: "repo1",
    description: "Description 1",
    language: "JavaScript",
    forks_count: 10,
    open_issues_count: 5,
    watchers_count: 20,
    html_url: "https://github.com/godaddy/repo1",
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRepo),
      })
    );
  });

  test("renders without crashing", () => {
    render(
      <Router>
        <RepoDetails />
      </Router>
    );
  });

  test("displays loading message initially", () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({}),
              }),
            100
          )
        )
    );
    render(
      <Router>
        <RepoDetails />
      </Router>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays repo details after fetching", async () => {
    render(
      <Router>
        <RepoDetails />
      </Router>
    );
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockRepo.description}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockRepo.language}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockRepo.forks_count}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRepo.open_issues_count}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockRepo.watchers_count}`)).toBeInTheDocument();
    expect(screen.getByText("View on GitHub")).toHaveAttribute(
      "href",
      mockRepo.html_url
    );
  });

  test("includes back button and navigates correctly", async () => {
    const mockNavigate = jest.fn();

    const { useNavigate } = require("react-router-dom");
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <RepoDetails />
      </Router>
    );
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    const backButton = screen.getByRole("button", { name: /Back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
