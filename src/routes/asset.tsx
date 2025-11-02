import { createFileRoute } from "@tanstack/react-router";
import ViewAssetPage from "../components/pages/ViewAssetPage";

export const Route = createFileRoute("/asset")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string, // required string
    };
  },
});

function RouteComponent() {
  return <ViewAssetPage />;
}
