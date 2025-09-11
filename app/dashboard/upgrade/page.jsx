"use client";
import React from "react";
import planData from "@/utils/planData";

function Upgrade() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-6 mt-16 rounded-3xl">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Upgrade Your Plan
        </h2>
        <p className="mt-4 text-slate-500 text-lg">
          Unlock unlimited mock interviews with our monthly subscription.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {planData.map((plan) => (
          <div
            key={plan.id}
            className="
              bg-white rounded-2xl shadow-md border border-slate-200
              p-8 flex flex-col items-center text-center
              transition-all duration-300 ease-out
              hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
              hover:border-transparent hover:ring-2 hover:ring-blue-400/50
            "
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {plan.name}
            </h3>

            <p className="text-3xl font-extrabold text-blue-600 mb-6">
              {plan.cost === 0 ? "Free" : `$${plan.cost}/mo`}
            </p>

            <ul className="mb-8 space-y-3 w-full">
              {plan.offering.map((item, index) => (
                <li
                  key={index}
                  className="text-slate-600 text-sm flex items-center justify-center"
                >
                  • {item.value}
                </li>
              ))}
            </ul>

            {plan.cost !== 0 ? (
              <a
                href={plan.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full text-center py-3 rounded-xl font-medium text-white
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-indigo-600 hover:to-blue-600
                  transition-all duration-300 shadow-md hover:shadow-lg
                "
              >
                Subscribe
              </a>
            ) : (
              <button
                disabled
                className="
                  w-full text-center py-3 rounded-xl font-medium text-white
                  bg-gray-300 cursor-not-allowed
                "
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
