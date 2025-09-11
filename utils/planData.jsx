const planData = [
  {
    id: 1,
    name: "Monthly Plan",
    cost: 1999, // ₹1999
    bestValue: true,
    offering: [
      { value: "Unlimited mock interviews" },
      { value: "Priority support" },
    ],
  },
  {
    id: 2,
    name: "Yearly Plan",
    cost: 999, // ₹999
    offering: [
      { value: "Unlimited mock interviews" },
      { value: "Priority support" },
      { value: "Access to exclusive content" },
    ],
  },
  {
    id: 3,
    name: "Free Plan",
    cost: 0,
    offering: [
      { value: "7 Free Mock Interviews" },
    ],
  },
];

export default planData;
