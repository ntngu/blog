import { useRouter } from "next/router";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Blog } from "@/types/blog";
import { DateTime } from "luxon";
import blogService from "@/services/blogs";

const BlogItem = ({ title, content, date, id, handleDelete }: Blog) => {
  const router = useRouter();

  return (
    <div className="flex flex-row p-2 w-96">
      <div>
        {title} <br />
        {DateTime.fromISO(date!).toLocaleString(
          DateTime.DATETIME_SHORT_WITH_SECONDS
        )}
      </div>
      <button
        className="p-2 ml-auto self-end shadow rounded bg-slate-200 hover:bg-slate-300"
        type="button"
        onClick={() => router.push(`/admin/edit/${id}`)}
      >
        Edit
      </button>
      <button 
        onClick={() => handleDelete(id!)}
        className="p-2 ml-auto shadow rounded bg-slate-200 hover:bg-slate-300"
        type="button"
      >
        Delete
      </button>
    </div>
  );
};

export default BlogItem;
