"use client"
import {
  JSX,
  SVGProps,
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  authorField: z.string(),
  recipientField: z.string(),
  titleField: z.string(),
  messageField: z.string(),
  fileInput: z.string().optional()
});

export default function SenderForm() {

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorField: "",
      recipientField: "",
      titleField: "",
      messageField: "",
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="authorField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="titleField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the title of your message here..."
                  type=""
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="messageField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your message here..."
                  type=""
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="rounded-lg flex flex-col gap-1 p-6 items-center">
              <FileIcon className="w-12 h-12" />
              <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
              <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
            </div>
            <div className="space-y-2 text-sm">
              <Label htmlFor="file" className="text-sm font-medium">
                File
              </Label>
              <Input
                id="file"
                type="file"
                placeholder="File"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-500">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
