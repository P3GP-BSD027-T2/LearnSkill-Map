"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SignInForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const [signInInput, setSigninInput] = useState({ email: "", password: "" });

  const signInSubmitHandler = async () => {
    console.log(signInInput.email, signInInput.password);
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
            placeholder="Enter your password"
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
        >
          Sign In
        </Button>
      </form>
    </>
  );
}
