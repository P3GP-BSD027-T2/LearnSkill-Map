"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/server-action";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signInInput, setSigninInput] = useState({ email: "", password: "" });
  const router = useRouter();

  const signInSubmitHandler = async () => {
    try {
      setLoading(true);

      const res = await login(signInInput);

      if (res.success && res.isAdmin) {
        toast.success("Login success");
        router.replace("/admin");
      } else if (res.success) {
        toast.success("Login success");
        router.replace("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signInSubmitHandler();
      }}
    >
      <div className="flex flex-col gap-3">
        <Label>Email</Label>
        <Input
          className="bg-gray-100"
          placeholder="Enter your email"
          onChange={(e) => {
            setSigninInput({ ...signInInput, email: e.target.value });
          }}
          value={signInInput.email}
        />

        <Label>Password</Label>
        <div className="relative">
          <Input
            className="bg-gray-100 pr-10" // kasih padding kanan biar icon nggak nutupin teks
            placeholder="Minimum length is 8"
            onChange={(e) =>
              setSigninInput({
                ...signInInput,
                password: e.target.value,
              })
            }
            value={signInInput.password}
            type={hidePassword ? "password" : "text"}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <Button
        className="bg-blue-600 hover:bg-blue-700 mt-4 w-full transition-all duration-300 ease-in-out"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
