import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/skills`);
    // console.log(res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
};
