import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./components/RootLayout";
import HomeDashboard from "./pages/HomeDashboard";
import StudyDashboard from "./pages/StudyDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import InterviewDashboard from "./pages/InterviewDashboard";
import ProfileDashboard from "./pages/ProfileDashboard";
import Onboarding from "./pages/Onboarding";
import GamificationHub from "./pages/GamificationHub";
import AITools from "./pages/AITools";
import ShareableCards from "./pages/ShareableCards";
import MissionControl from "./pages/MissionControl";
import NeuralEditor from "./pages/NeuralEditor";
import ArtifactVault from "./pages/ArtifactVault";
import LandingPage from "./pages/LandingPage";

export const router = createBrowserRouter([
  // Landing page — root URL
  {
    path: "/",
    Component: LandingPage,
  },
  // Auth / onboarding — standalone
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  // Legacy /landing alias
  {
    path: "/landing",
    element: <Navigate to="/" replace />,
  },
  // Stitch dashboard pages — standalone
  {
    path: "/mission-control",
    Component: MissionControl,
  },
  {
    path: "/neural-editor",
    Component: NeuralEditor,
  },
  {
    path: "/artifact-vault",
    Component: ArtifactVault,
  },
  // Main app shell — all authenticated pages under /app
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { index: true, Component: HomeDashboard },
      { path: "study", Component: StudyDashboard },
      { path: "finance", Component: FinanceDashboard },
      { path: "interview", Component: InterviewDashboard },
      { path: "profile", Component: ProfileDashboard },
      { path: "rewards", Component: GamificationHub },
      { path: "tools", Component: AITools },
      { path: "share", Component: ShareableCards },
    ],
  },
]);

