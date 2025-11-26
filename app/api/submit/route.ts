import { NextResponse } from "next/server";

import { getCustomerLeadCollection } from "@/lib/mongodb";

type Payload = {
  customerName?: string;
  phoneNumber?: string;
  product?: string;
};

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const customerName = payload.customerName?.trim();
  const phoneNumber = payload.phoneNumber?.trim();

  if (!customerName || !phoneNumber) {
    return NextResponse.json({ error: "Both customer name and phone number are required." }, { status: 400 });
  }

  try {
    const collection = await getCustomerLeadCollection();
    const document = {
      customerName,
      phoneNumber,
      product: payload.product?.trim() || null,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(document);

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Failed to save submission", error);
    return NextResponse.json({ error: "Unable to store submission right now." }, { status: 500 });
  }
}