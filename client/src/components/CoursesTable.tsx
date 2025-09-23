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
import { Course, deleteCourse } from "@/server-action";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { rupiah } from "@/helpers/rupiahFormat";
import { useRouter } from "next/navigation";

export default function AdminCoursesTable({ courses }: { courses: Course[] }) {
  const [courseList, setCourseList] = useState(courses);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      // update state agar list terbaru muncul
      setCourseList((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="shadow-md p-6 rounded-md flex flex-col gap-4 w-3xl">
      <div className="flex justify-between">
        <p className="font-semibold text-2xl">Courses</p>
        <Link
          href={"/admin/admin-courses/add"}
          className="flex items-center bg-emerald-500 text-white rounded-md py-1 px-2 hover:bg-emerald-600"
        >
          <Plus className="w-5 h-5" />
          Add
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseList.map((val, idx) => (
            <TableRow key={val._id}>
              <TableCell>{idx + 1}.</TableCell>
              <TableCell>{val.title}</TableCell>
              <TableCell>
                {val.price === 0 ? "Free" : rupiah(val.price)}
              </TableCell>
              <TableCell>{val.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  className="bg-white text-black hover:text-white hover:bg-red-500"
                  onClick={() => handleDelete(val._id)}
                >
                  <Trash />
                </Button>
                <Button
                  className="bg-white text-black hover:text-white hover:bg-yellow-300"
                  onClick={() => {
                    router.replace(`/admin/admin-courses/update/${val.slug}`);
                  }}
                >
                  <Pencil />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
