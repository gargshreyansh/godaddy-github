import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RepoList from "../components/RepoList";

describe("RepoList Component", () => {
  const mockRepos = [
    {
      id: 1,
      name: "repo1",
      description: "Description 1",
      language: "JavaScript",
      forks: 10,
      open_issues: 5,
      watchers: 20,
    },
    {
      id: 2,
      name: "repo2",
      description: "Description 2",
      language: "Python",
      forks: 15,
      open_issues: 2,
      watchers: 30,
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      })
    );
  });

  test("renders without crashing", () => {
    render(
      <Router>
        <RepoList />
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
                json: () => Promise.resolve([]),
              }),
            100
          )
        )
    );
    render(
      <Router>
        <RepoList />
      </Router>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays repos after fetching", async () => {
    render(
      <Router>
        <RepoList />
      </Router>
    );
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("GoDaddy Repositories")).toBeInTheDocument();
  });

  test("includes header and footer", async () => {
    render(
      <Router>
        <RepoList />
      </Router>
    );
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
