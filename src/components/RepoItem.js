import React from "react";
import "../styles/RepoItem.css";

const RepoItem = ({ repo, index }) => {
  const itemClass = index % 2 === 0 ? "repo-item even" : "repo-item odd";

  return (
    <div className={itemClass}>
      <h2 className="repo-name">{repo.name}</h2>
      <p className="repo-description">{repo.description}</p>
    </div>
  );
};

export default RepoItem;
