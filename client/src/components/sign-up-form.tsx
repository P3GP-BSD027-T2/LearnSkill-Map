"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SignUpForm() {
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <>
      <form>
        <div className="flex flex-col gap-3">
          <Label>Full Name</Label>
          <Input className="bg-gray-100" placeholder="Enter your email"></Input>

          <Label>Email</Label>
          <Input className="bg-gray-100" placeholder="Enter your email"></Input>

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
          ></Input>
        </div>

        <Button className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 mt-4 w-full">
          Create account
        </Button>
      </form>
    </>
  );
}
