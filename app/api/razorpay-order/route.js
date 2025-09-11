import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    let amount = Number(data.amount); // Make sure it’s a number in paise

    if (!amount || isNaN(amount)) {
      return new Response(JSON.stringify({ error: "Amount is required" }), { status: 400 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount, // in paise
      currency: "INR",
      payment_capture: 1,
    });

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return new Response(JSON.stringify({ error: "Order creation failed" }), { status: 500 });
  }
}
