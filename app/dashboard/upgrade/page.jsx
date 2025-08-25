"use client"
import React from "react";
import planData from "@/utils/planData";

function Upgrade() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-center mb-5">Upgrade Your Plan</h2>
      <h2 className="text-center mb-8 text-gray-500">Upgrade to monthly plan to access unlimited mock interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {planData.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">
              {plan.cost === 0 ? "Free" : `$${plan.cost}/mo`}
            </p>

            <ul className="mb-6 space-y-2">
              {plan.offering.map((item, index) => (
                <li key={index} className="text-gray-700 text-sm">
                  {item.value}
                </li>
              ))}
            </ul>

            {plan.cost !== 0 ? (
              <a
                href={plan.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Subscribe
              </a>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
              >
                Current Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
