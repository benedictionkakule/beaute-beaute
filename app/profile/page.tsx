"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-[#5A3D46]">
          My Profile
        </h1>

        <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
          <div className="space-y-6">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h2 className="text-xl font-semibold">
                {user?.name}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h2 className="text-xl font-semibold">
                {user?.email}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <h2 className="text-xl font-semibold capitalize">
                User
              </h2>
            </div>

          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}