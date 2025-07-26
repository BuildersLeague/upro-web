"use client";

import { UserProfile } from "@/components/auth/UserProfile";

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <UserProfile />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Protected Content</h2>
            <p className="text-gray-600">
              This content is only visible to authenticated users.
            </p>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                ✅ This entire folder is protected! Any page you add here will
                automatically require authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
