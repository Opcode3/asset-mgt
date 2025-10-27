import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <LoginForm />
    </div>
  );
}
