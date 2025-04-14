import { connect } from "@/lib/mongo";
import User from '@/model/user-model';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Missing token or password." },
                { status: 400 }
            );
        }

        console.log("Token is ======", token);

        await connect();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded =====", decoded);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password updated successfully." }, { status: 200 });

    } catch (err) {
        console.error("Reset token error:", err);
        return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
    }
}
