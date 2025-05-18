
import AppNavbar from "@/components/AppNavbar";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#151E35] flex flex-col">
      <AppNavbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-[#1A2440] rounded-xl shadow-lg max-w-xs w-full p-6">
          <h2 className="text-white text-xl font-bold mb-4">Sign Up</h2>
          <form className="flex flex-col gap-4">
            <input
              className="rounded-md px-3 py-2 bg-[#222d4e] text-white border border-[#23305a] outline-none"
              placeholder="Email"
              type="email"
              required
              disabled
            />
            <input
              className="rounded-md px-3 py-2 bg-[#222d4e] text-white border border-[#23305a] outline-none"
              placeholder="Password"
              type="password"
              required
              disabled
            />
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 font-semibold transition"
              type="submit"
              disabled
            >
              Coming soon...
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Already have an account? <Link to="/login" className="underline">Log in</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
