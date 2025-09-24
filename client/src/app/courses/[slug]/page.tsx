"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Layers, Star } from "lucide-react";
import Loading from "@/components/ui/loading";

interface Course {
  _id: string;
  title: string;
  summary?: string;
  currency?: string;
  thumbnail?: string;
  duration?: number;
  level?: string;
  relevance_score?: number;
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<Course>(
          `https://n8n.self-host.my.id/webhook/07dab5d5-4d0a-4b6b-bad4-e631582bc31a/lsm/courses/${slug}`
        );
        setCourse(res.data);
      } catch (err) {
        if (err) {
          setError("Gagal mengambil data course");
        }
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!course)
    return <p className="text-center text-gray-500">Course tidak ditemukan</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">
        {course.thumbnail && (
          <div className="w-cover h-72 relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#375EEB] text-center mb-6">
            {course.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-sm mb-6">
            {course.duration && (
              <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-gray-50 border">
                <Clock className="w-4 h-4 text-[#28C9B8]" />
                <span>{course.duration} min</span>
              </div>
            )}

            {course.level && (
              <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-gray-50 border">
                <Layers className="w-4 h-4 text-[#28C9B8]" />
                <span>{course.level}</span>
              </div>
            )}

            {course.relevance_score && (
              <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-gray-50 border">
                <Star className="w-4 h-4 text-[#28C9B8]" />
                <span>{course.relevance_score}/100</span>
              </div>
            )}
          </div>

          {course.summary && (
            <p className="text-gray-600 leading-relaxed text-justify">
              {course.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
