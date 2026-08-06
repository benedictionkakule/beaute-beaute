"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useAuth();
  const searchParams = useSearchParams();

const redirect =
  searchParams.get("redirect") || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    setMessage("Login successful!");

await fetchUser();

router.replace(redirect);
router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">

      <h1 className="text-center text-4xl font-bold">
        Welcome Back
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-pink-500 py-4 text-white hover:bg-pink-600"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

      {message && (
        <p className="mt-5 text-center">
          {message}
        </p>
      )}
      <div className="mt-8 text-center">
  <p className="text-sm text-gray-600">
    Don't have an account?
  </p>

  <Link
    href="/register"
    className="mt-2 inline-block font-medium text-pink-500 hover:text-pink-600"
  >
    ✨ Create one here
  </Link>
</div>

    </main>
  );
}