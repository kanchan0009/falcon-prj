"use client";
import { useState } from "react";

export default function HiredPage() {
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!company.trim()) {
      setError("Company name is required.");
      return;
    }
    setError("");
    console.log("Company:", company);
    // TODO: advance to next step
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2056] to-[#1a3580] text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap");

        body {
          font-family: "DM Sans", sans-serif;
        }
        .font-syne {
          font-family: "Syne", sans-serif;
        }
      `}</style>

      <main>
        {/* Company Name Step */}
        <section className="min-h-screen flex items-center justify-center p-10 md:p-16">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-10">
            <label
              htmlFor="company"
              className="block text-base font-bold text-white mb-3"
            >
              What is your company name? <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (error) setError("");
              }}
              placeholder="eg. Falcon Tech"
              className={`w-full bg-white/20 border text-white text-sm rounded-md px-4 py-3
                placeholder-gray-300 outline-none transition-colors duration-200
                focus:bg-white/30 focus:border-amber-500 focus:ring-1 focus:ring-amber-400
                ${error ? "border-red-400" : "border-white/30"}`}
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
            )}
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-amber-500 text-navy font-bold text-sm py-3 rounded-lg hover:bg-amber-600 transition-all"
            >
              NEXT
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                200+
              </div>
              <div className="mt-2 font-semibold">Global Team Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                98%
              </div>
              <div className="mt-2 font-semibold">Retention Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                50+
              </div>
              <div className="mt-2 font-semibold">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                $150k+
              </div>
              <div className="mt-2 font-semibold">Avg Compensation</div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-24 px-8 md:px-16 lg:px-24 bg-white/5 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              "Review Offer Letter",
              "Complete Onboarding",
              "Orientation Week",
              "First 90 Days",
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 font-bold text-navy text-lg">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{step}</h3>
                  <p className="opacity-90 text-lg">
                    Lorem ipsum placeholder description for "{step}".
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}