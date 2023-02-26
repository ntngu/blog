import react from "react";
import { Blog } from "../types/blog";
import blogService from "@/services/blogs";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Error from "./components/Error";
import HomeView from "./components/HomeView";

const Home = () => {
  const [blogs, setBlogs] = react.useState<Blog[]>([]);
  const [message, setMessage] = react.useState<string>("");
  const [content, setContent] = react.useState<string | undefined>("");
  const [title, setTitle] = react.useState<string | undefined>("");
  const [loading, setLoading] = react.useState<boolean>(true);
  const [activeTab, setActiveTab] = react.useState<string>("Home");

  const getBlogs = async () => {
    const response = await blogService.getAll();
    setBlogs(response);
    setContent(response[0].content);
    setTitle(response[0].title);
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
        <HomeView
          handleTabChange={handleTabChange}
          content={content}
          title={title}
        />
      );
    case "Blogs":
      return <Blogs handleTabChange={handleTabChange} blogs={blogs} />;
    case "About":
      return <About handleTabChange={handleTabChange} />;
    default:
      return <Error handleTabChange={handleTabChange} />;
  }
};

export default Home;
