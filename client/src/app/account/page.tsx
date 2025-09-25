import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import Logo from "@/assets/logo-1.png";
import { Sparkle } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-b from-[#eefeff] to-white px-4">
   
      <Image src={Logo} alt="image-logo" width={90} height={90} className="mb-3" />

      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full shadow-sm mb-6">
        <Sparkle className="w-4 h-4 text-yellow-600" />
        Welcome to Learn Map Skill
      </span>

      <Tabs defaultValue="signin" className="bg-white w-full max-w-md flex flex-col p-5 rounded-xl shadow-lg gap-5">
        <TabsList className="grid grid-cols-2 w-full rounded-xl overflow-hidden border border-gray-200">
          <TabsTrigger
            value="signin"
            className="rounded-none py-2 text-sm font-medium hover:bg-gray-50"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="rounded-none py-2 text-sm font-medium hover:bg-gray-50"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="w-full">
          <div className="flex flex-col w-full gap-4">
            <div className="text-center">
              <p className="font-semibold text-2xl text-blue-600">Welcome Back</p>
              <p className="text-gray-500 text-sm">Sign in to continue</p>
            </div>
            <SignInForm />
          </div>
        </TabsContent>

        <TabsContent value="signup" className="w-full">
          <div className="flex flex-col w-full gap-4">
            <div className="text-center">
              <p className="font-semibold text-2xl text-blue-600">Create Account </p>
            </div>
            <SignUpForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
