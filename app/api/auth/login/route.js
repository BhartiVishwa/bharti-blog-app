
import { connectDB } from "../../../../lib/config/db.js";
import User from "@/lib/models/UserModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return NextResponse.json({
  token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
});
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
