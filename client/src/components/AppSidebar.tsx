import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpenText, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { logoutHandler } from "@/server-action";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64 shadow-lg">
      <SidebarContent className="bg-blend-darken bg-indigo-950">
        <div className="flex items-center justify-center py-6 ">
          <Image src={"/logo-1.png"} alt="image-logo" width={75} height={75} />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex items-center w-full rounded-lg px-4 py-2 text-left text-white hover:bg-white hover:text-indigo-950 hover:shadow-md transition"
                >
                  <Link href="/admin" className="flex items-center gap-2">
                    <Home /> Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex items-center w-full rounded-lg px-4 py-2 text-left text-white hover:bg-white hover:text-indigo-950 hover:shadow-md transition"
                >
                  <Link
                    href={"/admin/admin-courses"}
                    className="flex items-center gap-2"
                  >
                    <BookOpenText />
                    Courses
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mt-10">
                <SidebarMenuButton
                  asChild
                  className="flex justify-center text-indigo-950 w-full rounded-lg px-4 py-2 hover:bg-white hover:cursor-pointer transition"
                >
                  <Button
                    type="button"
                    className="rounded-md bg-white text-sm text-black hover:bg-blue-700 transition"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
