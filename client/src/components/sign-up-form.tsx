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
      // optional: reset form
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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerHandler();
        }}
      >
        <div className="flex flex-col gap-3">
          <Label>Full Name</Label>
          <Input
            className="bg-gray-100"
            placeholder="Enter your email"
            onChange={(e) => {
              setRegisterInput({ ...registerInput, fullName: e.target.value });
            }}
            value={registerInput.fullName}
          ></Input>

          <Label>Email</Label>
          <Input
            className="bg-gray-100"
            placeholder="Enter your email"
            onChange={(e) => {
              setRegisterInput({ ...registerInput, email: e.target.value });
            }}
            value={registerInput.email}
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
            placeholder="Enter your password"
            type={hidePassword ? "password" : "text"}
            onChange={(e) => {
              setRegisterInput({ ...registerInput, password: e.target.value });
            }}
            value={registerInput.password}
          ></Input>

          <div className="flex justify-between">
            <Label>Confirm password</Label>
            <button
              className="text-blue-500 hover:cursor-pointer"
              type="button"
              onClick={() => {
                setHideConfirmPassword(!hideConfirmPassword);
              }}
            >
              {hideConfirmPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
          <Input
            className="bg-gray-100"
            placeholder="Enter your password"
            type={hideConfirmPassword ? "password" : "text"}
            onChange={(e) => {
              setRegisterInput({
                ...registerInput,
                confirmPassword: e.target.value,
              });
            }}
            value={registerInput.confirmPassword}
          ></Input>
        </div>

        <Button
          className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 mt-4 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </>
  );
}
