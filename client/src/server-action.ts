"use server";

import z from "zod";
import { RegisterSchema } from "./app/account/validation/register-validation";
import axios, { AxiosError } from "axios";
import { LoginSchema } from "./app/account/validation/login-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Data } from "./app/user/page";
import { verifyToken } from "./helpers/jwt";
import { UserBasic, UserWithRole } from "./middleware";
import { CourseInput } from "./components/AddCourseForm";

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

export type SkillBySlugRoadmap = {
  _id: string;
  skill_id: string;
  title: string;
  created_at: string;
};

export type SkillBySlugCourse = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  duration: number;
  relevance_score: number;
};

export type SkillBySlugNode = {
  _id: string;
  roadmap_id: string;
  title: string;
  description: string;
  order: number;
  estimated_hours: number;
  prerequisites: string[];
  courses: SkillBySlugCourse[];
};

export type SkillBySlug = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  created_at: string;
  is_ai_generated: boolean;
  roadmap: SkillBySlugRoadmap;
  nodes: SkillBySlugNode[];
};

export type Statistic = {
  period: string;
  sales: number;
  revenue: number;
  paid: number;
};
export type Course = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: number;
  level: string;
  tags: string[];
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const getUserRoadmaps = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return [];

  const userData = verifyToken(token) as { _id: string; role?: string };
  const userId = userData._id;

  try {
    const { data } = await axios.get(
      "https://n8n.self-host.my.id/webhook/lsm/skills/generated",
      {
        headers: {
          "x-user-id": userId,
        },
      }
    );
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching user roadmaps:", err);
    return [];
  }
};

export type CheckTokenOutput = {
  hasToken: boolean;
  userId?: string;
};

export type PayNowOutput = {
  success: boolean;
  message: string;
  redirect_url: string;
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
    type UserBasic = { _id: string };
    type UserWithRole = { _id: string; role: string };

    const userData = verifyToken(data?.access_token) as
      | UserBasic
      | UserWithRole;
    // console.log(typeof userData);

    if ("role" in userData) {
      if (userData.role === "admin") {
        return { success: true, isAdmin: true };
      }
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

export const getSkillBySlug = async (slug: string): Promise<SkillBySlug> => {
  const { data } = await axios.get(
    `https://n8n.self-host.my.id/webhook/4c167dde-64b5-44b8-86b9-73c5b92f88fc/lsm/skills/${slug}`
  );

  return data;
};

export const getStatistic = async (): Promise<Statistic[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`
  );
  return data;
};

export const getCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/courses`
  );
  return data;
};

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  const { data } = await axios.get(
    `https://n8n.self-host.my.id/webhook/07dab5d5-4d0a-4b6b-bad4-e631582bc31a/lsm/courses/${slug}`
  );

  return data;
};

export const payNow = async (
  id: string | null,
  course_id: string
): Promise<PayNowOutput> => {
  // await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/course-purchase`, {}{
  //   headers: {"x-user-id": id}
  // });
  const { data }: { data: PayNowOutput } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/course-purchase`,
    { course_id },
    { headers: { "x-user-id": id } }
  );
  // console.log(data);
  redirect(`${data.redirect_url}`);
  return data;
};

export const addCourse = async (input: CourseInput) => {
  try {
    // console.log(input);
    const { data } = await axios.post(
      "https://n8n.self-host.my.id/webhook/lsm/admin/courses",
      input
    );
    // redirect("/admin/admin-courses");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateCourse = async (input: CourseInput, courseId: string) => {
  try {
    const { data } = await axios.put(
      `https://n8n.self-host.my.id/webhook/3dc5beea-65c0-4f39-84e4-e01a38d6d6b9/lsm/admin/courses/${courseId}`,
      input
    );
    // console.log(input);
    // redirect("/admin/admin-courses");
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const { data } = await axios.delete(
      `https://n8n.self-host.my.id/webhook/3dc5beea-65c0-4f39-84e4-e01a38d6d6b9/lsm/admin/courses/delete/${courseId}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const checkToken = async (): Promise<CheckTokenOutput> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return { hasToken: false };

  try {
    const userData = verifyToken(token) as UserBasic | UserWithRole;
    return { hasToken: true, userId: userData._id };
  } catch (err) {
    console.error(err);
    return { hasToken: false };
  }
};
