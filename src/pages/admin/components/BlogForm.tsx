import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { BlogForm } from "@/pages/admin/types/BlogForm";
import rehypeSanitize from "rehype-sanitize";
import { useRouter } from "next/router";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const BlogForm = (props: BlogForm) => {
  const {
    title,
    content,
    handleCreate,
    handleTitleChange,
    handleContentChange,
  } = props;
  const router = useRouter();

  return (
    <div className="w-4/5">
      <form
        onSubmit={handleCreate}
        className="flex flex-col bg-white shadow-md px-8 pt-6 justify-items-center"
      >
        <div className="">
          <button
            type="button"
            className=" justify-self-end w-40 rounded border bg-blue-400 hover:bg-blue-500 text-white"
            onClick={() => router.push("/admin")}
          >
            Go back
          </button>
        </div>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={title}
          onChange={handleTitleChange}
          className="shadow border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-4"
        ></input>
        <MDEditor
          value={content}
          onChange={handleContentChange}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          className="mb-4"
        />
        <button
          className="mb-4 bg-blue-400 hover:bg-blue-500 rounded text-white"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
