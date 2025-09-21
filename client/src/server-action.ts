"use server";

import z from "zod";
import { RegisterSchema } from "./app/account/validation/register-validation";
import axios, { AxiosError } from "axios";
import { LoginSchema } from "./app/account/validation/login-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Data } from "./app/user/[userId]/page";

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export const register = async (input: RegisterInput) => {
  // console.log(fullName, email, password, confirmPassword);

  try {
    const parsedData = await RegisterSchema.safeParseAsync(input);
    if (!parsedData.success) {
      const firstError =
        parsedData.error.issues[0]?.message || "Validation failed";
      throw new Error(firstError);
    }

    if (input.password !== input.confirmPassword)
      throw new Error("Passwords do not match.");

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/register-user`, {
      name: input.fullName,
      email: input.email,
      password: input.password,
    });
  } catch (err) {
    // console.error(err);
    if (axios.isAxiosError(err)) {
      // AxiosError
      const axiosError = err as AxiosError<{ message?: string }>;
      throw new Error(axiosError.response?.data?.message || "Request failed.");
    } else if (err instanceof z.ZodError) {
      // ZodError
      throw new Error(err.issues[0]?.message || "Validation failed");
    } else if (err instanceof Error) {
      // Error biasa
      throw err;
    } else {
      // Fallback (jarang kejadian)
      throw new Error("Unexpected error occurred.");
    }
  }
};

export const login = async (input: LoginInput) => {
  try {
    const parsedData = await LoginSchema.safeParseAsync(input);
    if (!parsedData.success) {
      const firstError =
        parsedData.error.issues[0]?.message || "Validation failed";
      throw new Error(firstError);
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      { email: input.email, password: input.password }
    );

    if (data?.access_token) {
      const cookieStorage = await cookies();
      cookieStorage.set("token", data.access_token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
        sameSite: "strict",
      });
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      // AxiosError
      const axiosError = err as AxiosError<{ message?: string }>;
      throw new Error(axiosError.response?.data?.message || "Request failed.");
    } else if (err instanceof z.ZodError) {
      // ZodError
      throw new Error(err.issues[0]?.message || "Validation failed");
    } else if (err instanceof Error) {
      // Error biasa
      throw err;
    } else {
      // Fallback (jarang kejadian)
      throw new Error("Unexpected error occurred.");
    }
  }
};

export const logoutHandler = async () => {
  const cookieStorage = await cookies();

  if (cookieStorage.get("token")) {
    cookieStorage.delete("token");
  }

  redirect("/account");
};

export const getUserById = async (id: string | null = null): Promise<Data> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    headers: { "x-user-id": id },
  });
  return data[0];
};
