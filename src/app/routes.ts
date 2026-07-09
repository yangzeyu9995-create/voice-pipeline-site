import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import ProjectDetail from "../pages/ProjectDetail";

// "/" on Vercel, "/voice-pipeline-site" on GitHub Pages — derived from Vite's base.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/project/:slug",
      Component: ProjectDetail,
    },
  ],
  { basename }
);
