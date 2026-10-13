import { Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";
import ProjectDetail from "./ProjectDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}