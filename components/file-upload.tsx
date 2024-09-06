"use client";
import React from "react";
import "@uploadthing/react/styles.css";

import Image from "next/image";
import { FileIcon, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

type FileUploadProps = {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
};

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  console.log(value);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />

        <button
          className="bg-rose-500 text-white rounded-full p-1 absolute top-0 right-0 shadow-sm opacity-50 hover:opacity-100 transition"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rouned-md bg-background/10">
        <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="nooperner norefferer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hvoer:inderline"
        >
          {value}
        </a>

        <button
          className="bg-rose-500 text-white rounded-full p-1 absolute -top-2 -right-2 shadow-sm opacity-50 hover:opacity-100 transition"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="w-full">
      <UploadDropzone
        className="cursor-pointer "
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.[0].url)}
        onUploadError={(error: Error) => console.log(error)}
      />
    </div>
  );
};

export default FileUpload;
