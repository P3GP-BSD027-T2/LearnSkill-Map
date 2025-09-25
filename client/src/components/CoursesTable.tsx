"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course, deleteCourse, updateCourse } from "@/server-action";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { rupiah } from "@/helpers/rupiahFormat";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

export default function AdminCoursesTable({ courses }: { courses: Course[] }) {
  const [courseList, setCourseList] = useState(courses);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      setCourseList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="shadow-md p-6 rounded-xl flex flex-col gap-6 w-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <p className="font-bold text-2xl text-blue-500"> Courses</p>
        <Link
          href={"/admin/admin-courses/add"}
          className="flex items-center gap-1 bg-[#28C9B8] text-white rounded-md py-2 px-4 hover:bg-[#20a99b] transition"
        >
          <Plus className="w-5 h-5" />
          Add
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-[#375EEB]/10">
            <TableHead className="text-[#232C3D] font-semibold">No</TableHead>
            <TableHead className="text-[#232C3D] font-semibold">Title</TableHead>
            <TableHead className="text-[#232C3D] font-semibold">Price</TableHead>
            <TableHead className="text-[#232C3D] font-semibold">Published</TableHead>
            <TableHead className="text-[#232C3D] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseList.map((val, idx) => (
            <TableRow key={val._id} className="hover:bg-gray-50">
              <TableCell>{idx + 1}.</TableCell>
              <TableCell className="font-medium">{val.title}</TableCell>
              <TableCell>
                {val.price === 0 ? (
                  <span className="text-[#28C9B8] font-semibold">Free</span>
                ) : (
                  <span className="text-[#375EEB] font-semibold">{rupiah(val.price)}</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    {/* <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        val.status === "published"
                          ? "bg-[#375EEB]/10 text-[#375EEB]"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {}
                    </span> */}
                  <Switch
                    checked={val.status === "published"}
                    onCheckedChange={async (checked: boolean) => {
                      const newStatus = checked ? "published" : "unpublished";
                      try {
                        await updateCourse({ ...val, status: newStatus }, val._id);
                        setCourseList((prev) =>
                          prev.map((c) =>
                            c._id === val._id ? { ...c, status: newStatus } : c
                          )
                        );
                      } catch (err) {
                        console.error(err);
                        alert("Failed to update status");
                      }
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  className="bg-white border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
                  onClick={() => handleDelete(val._id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <Button
                  className="bg-white border border-[#FFC857] text-[#FFC857] hover:bg-[#FFC857] hover:text-white transition"
                  onClick={() => {
                    router.replace(`/admin/admin-courses/update/${val.slug}`);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
