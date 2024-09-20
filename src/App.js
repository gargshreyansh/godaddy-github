import React from "react";
import { Routes, Route } from "react-router-dom";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repos/:id" element={<RepoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
