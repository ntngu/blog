import Header from "./Header";
import { BlogView } from "@/types/blogView";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const BlogView = ({ modal, title, content }: BlogView) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center">
        <h1 className="text-[#D3DAE0] text-3xl p-10 pb-6">
          {title}
        </h1>
        <button type="button" className="text-[#D3DAE0] text-xl underline pb-4" onClick={() => modal("")}>
          Exit
        </button>
      </div>
      <MarkdownPreview className="w-[58rem] p-10 mb-5" source={content} />
    </div>
  );
};

export default BlogView;
