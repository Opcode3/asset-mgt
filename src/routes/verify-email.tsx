import { createFileRoute } from "@tanstack/react-router";
import VerifyTokenPage from "../components/pages/VerifyTokenPage";

export const Route = createFileRoute("/verify-email")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: search.token as string, // required string
    };
  },
});

function RouteComponent() {
  return <VerifyTokenPage />;
}
