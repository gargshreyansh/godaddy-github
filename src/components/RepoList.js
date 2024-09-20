import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RepoItem from "./RepoItem";
import "../styles/RepoList.css";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/orgs/godaddy/repos"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="repo-list-container">
      <header className="repo-list-header">
        <h1>GoDaddy Repositories</h1>
      </header>
      {repos.map((repo, index) => (
        <Link to={`/repos/${repo.name}`} key={repo.id} className="repo-link">
          <RepoItem repo={repo} index={index} />
        </Link>
      ))}
      <footer className="repo-list-footer">
        <p>© 2024 GoDaddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RepoList;
