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
  const [title, setTitle] = react.useState<string | undefined>("");
  const [loading, setLoading] = react.useState<boolean>(true);
  const [activeTab, setActiveTab] = react.useState<string>("Home");

  const getBlogs = async () => {
    const response = await BlogService.getAll();
    setBlogs(response);
    setContent(response[response.length - 1].content);
    setTitle(response[response.length - 1].title);
  };

  react.useEffect(() => {
    getBlogs();
    setLoading(false);
  }, []);

  const handleTabChange = (str: string) => {
    setActiveTab(str);
  }

  if (activeTab === "Home") {
    return (
      <div className=" bg-[#0F151E] w-screen h-screen">
        <Header handleTabChange={handleTabChange}/>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[#D3DAE0] text-3xl p-10">{title}</h1>
          <MarkdownPreview
            className="w-[58rem] p-10 mb-5"
            source={content}
          />
        </div>
      </div>
    );
  } else if (activeTab === "Blogs") {
    return (
      <div className=" bg-[#0F151E] w-screen h-screen">
        <Header handleTabChange={handleTabChange}/>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[#D3DAE0] text-3xl p-10">Work In Progress...</h1>
        </div>
      </div>
    )
  }
  
};

export default Home;
