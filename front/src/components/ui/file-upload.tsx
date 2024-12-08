"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto border rounded-md shadow-md">
      <div>
        <Label htmlFor="file-upload">Załącz pliki</Label>
        <Input
          id="file-upload"
          name="file-upload"
          type="file"
          onChange={handleFileChange}
          multiple
        />
        {files.length > 0 && (
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-500">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit">Wyślij</Button>
    </form>
  );
}
