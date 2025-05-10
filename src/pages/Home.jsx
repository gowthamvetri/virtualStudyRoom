import { useState } from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/"; // Redirect to dashboard/home
    } catch (err) {
      console.error("Login Error:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">🎓 Virtual Study Room</h1>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}
