"use client";
import React, { useEffect, useState } from "react";
import planData from "@/utils/planData";
import { useUser } from "@clerk/nextjs";

function Upgrade() {
  const { user } = useUser();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (planName, cost) => {
    if (!razorpayLoaded) {
      alert("Razorpay is loading, please wait a moment!");
      return;
    }

    if (cost === 0) {
      alert("Free plan selected, no payment required!");
      return;
    }

    const res = await fetch("/api/razorpay-order", {
      method: "POST",
      body: JSON.stringify({ amount: cost * 100 }), // convert to paise
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Mock Interview Subscription",
      description: `${planName} unlimited interviews`,
      order_id: order.id,
      handler: function (response) {
        console.log("Payment success:", response);
        alert("Payment Successful!");
        // TODO: Verify signature backend & update user subscription
      },
      prefill: {
        name: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-6 mt-18 rounded-3xl">
      <div className="max-w-6xl mx-auto text-center mb-12  ">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 ">
          Upgrade Your Plan
        </h2>
        <p className="mt-4 text-slate-500 text-lg">
          Unlock unlimited mock interviews with our subscription plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {planData.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-3xl shadow-lg border border-slate-200
              p-8 flex flex-col items-center text-center
              transition-all duration-300 ease-out
              hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
              hover:border-transparent hover:ring-2 hover:ring-blue-400/50
            `}
          >
            {plan.bestValue && (
              <div className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                BEST VALUE
              </div>
            )}

            <h3 className="text-2xl font-bold text-slate-800 mb-3">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-blue-600 mb-6">
              {plan.cost === 0 ? "Free" : `₹${plan.cost}`}
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

            <button
              onClick={() => handlePayment(plan.name, plan.cost)}
              className={`w-full text-center py-3 rounded-xl font-medium text-white ${
                plan.cost === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600"
              } transition-all duration-300 shadow-md hover:shadow-lg`}
              disabled={plan.cost === 0}
            >
              {plan.cost === 0 ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
