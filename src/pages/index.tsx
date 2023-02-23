import react from "react";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Blog } from "../types/blog";
import BlogService from "@/services/blogs";
import HomePage from "./components/Home";
import Blogs from "./components/Blogs";
import About from "./components/About";

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
  };

  switch (activeTab) {
    case "Home":
      return (
        <HomePage
          handleTabChange={handleTabChange}
          content={content}
          title={title}
        />
      );
    case "Blogs":
      return <Blogs handleTabChange={handleTabChange} />;
    default:
      return <About handleTabChange={handleTabChange} />;
  }
};

export default Home;
