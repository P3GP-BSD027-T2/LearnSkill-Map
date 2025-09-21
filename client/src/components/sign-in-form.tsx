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

      if (res.success) {
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
    <>
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
          ></Input>

          <div className="flex justify-between">
            <Label>Password</Label>
            <button
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
              type="button"
            >
              {hidePassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
          <Input
            className="bg-gray-100"
            placeholder="Minimum length is 8"
            onChange={(e) => {
              setSigninInput({
                ...signInInput,
                password: e.target.value,
              });
            }}
            value={signInInput.password}
            type={hidePassword ? "password" : "text"}
          ></Input>
        </div>
        <Button
          className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 mt-4 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </>
  );
}
