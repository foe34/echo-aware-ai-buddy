
import AppNavbar from "@/components/AppNavbar";

export default function Subscription() {
  return (
    <div className="min-h-screen bg-[#151E35] flex flex-col">
      <AppNavbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-[#1A2440] rounded-lg shadow-lg max-w-md w-full p-6 flex flex-col items-center">
          <h2 className="text-white text-2xl font-bold text-center mb-2">Upgrade to Premium</h2>
          <p className="text-white/80 text-center mb-6">Unlock faster answers & memory features.</p>
          <span className="text-lg text-white font-semibold mb-2">₹149 / month</span>
          <button
            disabled
            className="mt-4 px-5 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 opacity-70 cursor-not-allowed"
          >
            Payments coming soon…
          </button>
          <p className="text-xs text-gray-400 mt-4 text-center">Payments via Razorpay/Stripe to be integrated soon.</p>
        </div>
      </main>
    </div>
  );
}
