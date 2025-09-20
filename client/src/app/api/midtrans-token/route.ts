import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

console.log("MIDTRANS_SERVER_KEY:", serverKey);
console.log("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY:", clientKey);

if (!serverKey || !clientKey) {
  throw new Error("MIDTRANS_SERVER_KEY or NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not defined.");
}

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey,
  clientKey,
});

export async function POST(request: Request) {
  try {
    const { id, productName, price, quantity } = await request.json();

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
      item_details: [
        {
        
          name: productName,
          price,
          quantity,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans transaction error:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}
