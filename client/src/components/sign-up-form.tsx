"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { register } from "@/server-action";
import { toast } from "sonner";

export default function SignUpForm() {
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registerInput, setRegisterInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerHandler = async () => {
    try {
      setLoading(true);
      await register(registerInput);

      toast.success("Account created successfully!");
      setRegisterInput({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
        registerHandler();
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <Label>Full Name</Label>
        <Input
          className="bg-gray-100"
          placeholder="Input your name"
          value={registerInput.fullName}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, fullName: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input
          className="bg-gray-100"
          placeholder="example@mail.com"
          value={registerInput.email}
          onChange={(e) =>
            setRegisterInput({ ...registerInput, email: e.target.value })
          }
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <Label>Password</Label>
        <div className="relative">
          <Input
            className="bg-gray-100 pr-10"
            placeholder="Minimum length is 8"
            type={hidePassword ? "password" : "text"}
            value={registerInput.password}
            onChange={(e) =>
              setRegisterInput({ ...registerInput, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setHidePassword(!hidePassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {hidePassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            className="bg-gray-100 pr-10"
            placeholder="Repeat your password"
            type={hideConfirmPassword ? "password" : "text"}
            value={registerInput.confirmPassword}
            onChange={(e) =>
              setRegisterInput({
                ...registerInput,
                confirmPassword: e.target.value,
              })
            }
          />
          <button
            type="button"
            onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {hideConfirmPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        className="bg-blue-600 hover:bg-blue-700 mt-4 w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
