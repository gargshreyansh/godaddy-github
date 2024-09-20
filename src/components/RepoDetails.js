import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/RepoDetails.css";

const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRepoDetails() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/godaddy/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRepo(data);
      } catch (error) {
        console.error("Error fetching repo details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepoDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!repo) {
    return <p>Repository not found.</p>;
  }

  return (
    <div className="repo-details-container">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <h1 className="repo-details-title">{repo.name}</h1>
      </header>
      <div className="repo-details-info">
        <p>
          <strong>Description:</strong>{" "}
          {repo.description || "No description available"}
        </p>
        <p>
          <strong>Language(s):</strong> {repo.language || "Not specified"}
        </p>
        <p>
          <strong>Forks:</strong> {repo.forks_count}
        </p>
        <p>
          <strong>Open Issues:</strong> {repo.open_issues_count}
        </p>
        <p>
          <strong>Watchers:</strong> {repo.watchers_count}
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-details-link"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoDetails;
