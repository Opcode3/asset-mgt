import { createFileRoute } from "@tanstack/react-router";
import AssetAgreementPage from "../components/pages/AssetAgreementPage";

export const Route = createFileRoute("/asset-agreement")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: search.id as string, // required string
    };
  },
});

function RouteComponent() {
  return <AssetAgreementPage />;
}
