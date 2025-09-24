"use client";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-richtexteditor/styles/material.css";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  RichTextEditorComponent,
  HtmlEditor,
  Toolbar,
  Inject,
  Link,
  Image,
  QuickToolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { addCourse } from "@/server-action";
import { useRouter } from "next/navigation";

export type CourseInput = {
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
};

export default function AddCourseForm() {
  const router = useRouter();
  const rteRef = useRef<RichTextEditorComponent>(null);
  const [input, setInput] = useState<CourseInput>({
    title: "",
    slug: "",
    summary: "",
    thumbnail: "",
    price: 0,
    currency: "IDR",
    duration: 0,
    level: "",
    tags: [],
    content: "",
    status: "published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(input);
    await addCourse(input);
    router.replace("/admin/admin-courses");
    // Di sini bisa panggil API untuk submit course
    // console.log(data);
  };

  return (
    <form
      className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Title:</Label>
          <Input
            placeholder="Ex: Frontend Introduction"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Slug:</Label>
          <Input
            placeholder="Ex: frontend-introduction"
            value={input.slug}
            onChange={(e) => setInput({ ...input, slug: e.target.value })}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Price:</Label>
          <Input
            type="number"
            placeholder="Ex: 100000"
            value={input.price}
            onChange={(e) =>
              setInput({ ...input, price: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Currency:</Label>
          <Input
            placeholder="Ex: IDR"
            value={input.currency}
            onChange={(e) => setInput({ ...input, currency: e.target.value })}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Duration:</Label>
          <Input
            type="number"
            placeholder="in minutes"
            value={input.duration}
            onChange={(e) =>
              setInput({ ...input, duration: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tags:</Label>
          <Input
            placeholder="Ex: nodejs,javascript,backend"
            value={input.tags.join(",")}
            onChange={(e) =>
              setInput({ ...input, tags: e.target.value.split(",") })
            }
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Thumbnail:</Label>
          <Input
            placeholder="Ex: https://www.google.com"
            value={input.thumbnail}
            onChange={(e) => setInput({ ...input, thumbnail: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Level:</Label>
          <Select
            value={input.level}
            onValueChange={(val) => setInput({ ...input, level: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-2">
        <Label>Summary:</Label>
        <Input
          placeholder="Ex: Understand basic layouting"
          value={input.summary}
          onChange={(e) => setInput({ ...input, summary: e.target.value })}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <Label>Content:</Label>
        <RichTextEditorComponent
          ref={rteRef}
          height={500}
          width="100%"
          placeholder="Tulis konten course di sini..."
          value={input.content}
          change={(args) => setInput({ ...input, content: args.value })}
          toolbarSettings={{
            items: [
              "Bold",
              "Italic",
              "Underline",
              "StrikeThrough",
              "|",
              "Formats",
              "Alignments",
              "OrderedList",
              "UnorderedList",
              "|",
              "CreateLink",
              "Image",
              "|",
              "Undo",
              "Redo",
            ],
          }}
        >
          <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
        </RichTextEditorComponent>
      </div>

      <Button
        type="submit"
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        Add Course
      </Button>
    </form>
  );
}
