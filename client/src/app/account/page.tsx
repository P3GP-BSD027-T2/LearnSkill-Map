import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-b from-[#eefeff] to-white gap-4">
        <Image src={"/logo-1.png"} alt="image-logo" width={100} height={100} />

        <p className="bg-amber-300 rounded-md px-2 py-1 text-sm font-semibold">
          Welcome to your journey
        </p>

        <Tabs
          defaultValue="signin"
          className="bg-white w-md flex flex-col justify-center items-center p-6 rounded-lg gap-4 h-"
        >
          <TabsList className="w-full rounded-2xl">
            <TabsTrigger
              value="signin"
              className="rounded-2xl hover:cursor-pointer"
            >
              Sign In
            </TabsTrigger>

            <TabsTrigger
              value="signup"
              className="rounded-2xl hover:cursor-pointer"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="text-center flex flex-col">
                <p className="font-semibold text-2xl">Welcome Back</p>
                <p className="text-gray-500">
                  Sign in to your account to continue
                </p>
              </div>

              <SignInForm />
            </div>
          </TabsContent>

          <TabsContent value="signup" className="w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="text-center flex flex-col">
                <p className="font-semibold text-2xl">Create account</p>
                <p className="text-gray-500">
                  Join us and start your journey today
                </p>
              </div>

              <SignUpForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
