import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="bg-white px-14 py-4">
        <img src="/logo.png" alt="logo" className="w-34" />
      </div>
      <LoginForm />
    </div>
  );
}
