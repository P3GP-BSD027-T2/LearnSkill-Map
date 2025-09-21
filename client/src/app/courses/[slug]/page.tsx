"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  summary?: string;
  price?: number;
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
        setError("Gagal mengambil data course");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!course) return <p>Course tidak ditemukan</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{course.title}</h1>
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-60 object-cover rounded-lg mb-6 border"
        />
      )}
      {course.summary && <p className="text-gray-600 mb-4">{course.summary}</p>}

      <div className="space-y-2 text-sm text-gray-700">
        {course.price !== undefined && (
          <p>
            Price:{" "}
            {course.price === 0 ? (
              <span className="text-green-600 font-bold">FREE</span>
            ) : (
              <span className="text-red-500 font-semibold">
                {course.price.toLocaleString()} {course.currency || "IDR"}
              </span>
            )}
          </p>
        )}
        {course.duration && <p>Duration: {course.duration} min</p>}
        {course.level && <p>Level: {course.level}</p>}
        {course.relevance_score && <p>Relevance Score: {course.relevance_score}</p>}
      </div>
    </div>
  );
}
