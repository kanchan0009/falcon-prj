import { Check } from "lucide-react";

const plans = [
  {
    name: "CredoLite",
    price: "$374",
    desc: "Starter Plan",
    features: [
      "SDK (Android/iOS/Web)",
      "Dedicated cloud environment",
      "Credo360 monthly report",
      "Web dashboard / API",
      "Training & support",
    ],
  },
  {
    name: "CredoOne",
    price: "$624",
    desc: "Starter + Add-on",
    features: [
      "Device intelligence",
      "Fraud intelligence",
      "Apps intelligence",
      "Behavioural intelligence",
    ],
  },
  {
    name: "CredoScore",
    price: "Contact Sales",
    desc: "Advanced Add-on",
    features: [
      "Custom scorecard",
      "Performance calibration",
      "Production scoring API",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl text-amber-500  font-bold text-navy">PRICING</h2>
        <p className="mt-4 text-black max-w-2xl mx-auto">
          Explore our modular subscription plans designed to help your business
          take full advantage of behavioural analytics.
        </p>

        {/* TOGGLE */}
        <div className="mt-8 flex justify-center">
          <div className="bg-amber-500  rounded-full p-1 flex">
            <button className="bg-orange text-white px-6 py-2 rounded-full">
              Billed Monthly
            </button>
            <button className="px-6 py-2 text-navy">Billed Yearly</button>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 pb-20">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-8 text-center border"
          >
            <h3 className="text-2xl font-bold text-gray-700">{plan.name}</h3>
            <p className="text-sm text-gray-500">{plan.desc}</p>

            <div className="mt-6 text-4xl font-bold text-amber-700">
              {plan.price}
            </div>

            <button className="mt-6 w-full bg-amber-500 text-white py-3 rounded-lg">
              Contact
            </button>

            <ul className="mt-6 space-y-3 text-sm text-gray-900">
              {plan.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 justify-center"
                >
                  <Check size={16} className="text-orange" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-20 pb-20">
        <h3 className="text-2xl font-bold text-black mb-6">Compare plans</h3>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left">Features</th>
                <th>CredoLite</th>
                <th>CredoOne</th>
                <th>CredoScore</th>
              </tr>
            </thead>

            <tbody className="bg-blue-50 text-gray-900">
              {[
                "SDK",
                "Cloud Environment",
                "Monthly Report",
                "Dashboard/API",
                "Support",
                "Production API",
                "Device Intelligence",
                "Fraud Intelligence",
              ].map((feature, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-4 text-left">{feature}</td>
                  <td>
                    <Check className="mx-auto text-orange" />
                  </td>
                  <td>
                    <Check className="mx-auto text-orange" />
                  </td>
                  <td>
                    <Check className="mx-auto text-orange" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 pb-20">
        <div className="bg-amber-500 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="text-2xl font-bold">How can you trust us?</h4>
            <p className="text-white mt-2">
              Check this out and contact us if you still have questions.
            </p>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="bg-white text-gray-600 px-6 py-3 rounded-lg">
              Trust Centre
            </button>
            <button className="border border-white px-6 py-3 rounded-lg">
              Book a Meeting
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-white px-6 md:px-20 py-12">
        <div className="grid md:grid-cols-5 gap-6 text-sm">
          <div>
            <h5 className="font-bold mb-2">credolab</h5>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Risk</h5>
            <p>Risk Scores</p>
            <p>Insights</p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Fraud</h5>
            <p>Fraud Scores</p>
            <p>Insights</p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Marketing</h5>
            <p>Marketing Scores</p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Support</h5>
            <p>Contact</p>
            <p>Docs</p>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-400 text-xs">
          © All rights reserved.
        </div>
      </footer>
    </main>
  );
}
