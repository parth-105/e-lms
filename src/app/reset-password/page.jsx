"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!password || !confirmPassword) {
            toast({ title: "Error", description: "All fields are required." });
            return;
        }
        if (password !== confirmPassword) {
            toast({ title: "Mismatch", description: "Passwords do not match." });
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/reset-password", { token, password });

            toast({
                title: "Success",
                description: "Password updated. You can now log in.",
            });
            router.push("/login");
        } catch (err) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Reset failed.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md space-y-4 p-6 bg-gray-900 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <Input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="w-full" onClick={onSubmit}>
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Reset Password"}
                </Button>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
        </Suspense>
    );
}
