import react from "react";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Blog } from "../types/blog";
import BlogService from "@/services/blogs";
import Header from "@/pages/components/Header";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const Home = () => {
  const [blogs, setBlogs] = react.useState<Blog[]>([]);
  const [message, setMessage] = react.useState<string>("");
  const [content, setContent] = react.useState<string | undefined>("");
  const [loading, setLoading] = react.useState<boolean>(true);

  const getBlogs = async () => {
    const response = await BlogService.getAll()
    setBlogs(response);
    setContent(response[response.length - 1].content);
  };

  react.useEffect(() => {
    getBlogs();
    setLoading(false);
  }, []);

  return (
    <div className=" bg-[#0F151E] w-screen h-screen">
      <Header />
      <div className="flex justify-center items-center">
        <MarkdownPreview className="w-[58rem] p-10 mt-20 mb-5" source={content} />
      </div>
    </div>
  );
};

export default Home;
