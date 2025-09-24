"use client";

import { rupiah } from "@/helpers/rupiahFormat";
import { Button } from "./ui/button";
import { Clock, Tag } from "lucide-react";
import { Course, payNow } from "@/server-action";
import Image from "next/image";

export default function PaymentCard({
  userId,
  course,
}: {
  userId: string | null;
  course: Course;
}) {
  const buyNowHandler = async () => {
    const data = await payNow(userId, course._id);
    // console.log(userId, course._id);
    console.log(data);
  };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border">
      {/* Thumbnail */}
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-contain p-6"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.summary}</p>

        {/* Level & Duration */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-700">
          <span className="px-3 py-1 rounded bg-indigo-50 text-indigo-600 capitalize">
            {course.level}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#28C9B8]" /> {course.duration} min
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
            >
              <Tag className="w-3 h-3 text-gray-500" /> {tag}
            </span>
          ))}
        </div>

        {/* Harga */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">
            {course.price === 0 ? "Free" : rupiah(course.price)}
          </p>
          <Button
            className="bg-[#375EEB] hover:bg-blue-800 text-white"
            onClick={() => {
              buyNowHandler();
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
