import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="hidden lg:block">
      <Outlet />
    </div>
    <div className="flex items-center justify-center px-5 text-center text-lg h-screen lg:hidden">
      Please use a device with a larger screen to access this application.
    </div>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
