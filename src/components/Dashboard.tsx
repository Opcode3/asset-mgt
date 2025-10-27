import React from "react";
import { useAuthStore } from "../store/authStore";

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  console.log(
    "Dashboard render, user:",
    user,
    "isAuthenticated:",
    isAuthenticated
  );
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                // disabled={logoutMutation.isPending}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {"Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
