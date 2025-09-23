import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "@/server-action";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { rupiah } from "@/helpers/rupiahFormat";

export default function AdminCoursesTable({ courses }: { courses: Course[] }) {
  // courses.forEach((val) => {
  //   console.log(val.title);
  // });
  return (
    <>
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
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((val, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}.</TableCell>
                <TableCell>{val.title}</TableCell>
                <TableCell>
                  {val.price === 0 ? "Free" : rupiah(val.price)}
                </TableCell>
                <TableCell>{val.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button className="bg-white text-black hover:text-white hover:bg-red-500">
                    <Trash />
                  </Button>
                  <Button className="bg-white text-black hover:text-white hover:bg-yellow-300">
                    <Pencil />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
