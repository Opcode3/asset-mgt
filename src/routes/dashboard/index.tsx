import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "../../components/pages/DashboardPage";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return <DashboardPage />;
}
