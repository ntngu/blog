import react from "react";
import blogService from "@/services/blogs";
import { User } from "@/types/user";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from "next/router";
import BlogForm from "../components/BlogForm";

const Post = () => {
  const [title, setTitle] = react.useState<string>("");
  const [content, setContent] = react.useState<string | undefined>("");
  const [message, setMessage] = react.useState<string>("");
  const [user, setUser] = react.useState<User>();
  const router = useRouter();

  const handleCreate = async (event: react.FormEvent) => {
    event.preventDefault();
    try {
      const blog = {
        title: title,
        content: content,
        date: new Date().toString(),
        id: ""
      };
      const response = await blogService.create(blog);
      router.push("/admin");
    } catch (err) {
      setMessage(`${title} could not be posted...`);
    }
  };

  const handleTitleChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleContentChange = (str: string | undefined) => {
    setContent(str as string);
  };

  react.useEffect(() => {
    const userToken = window.localStorage.getItem("userToken");
    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return <div className="bg-gray-300 flex h-screen w-screen"></div>;
  }

  return (
    <div className="bg-gray-300 h-screen w-screen">
      <div className="flex items-center justify-center flex-col h-screen w-screen">
        <BlogForm
          handleCreate={handleCreate}
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          title={title}
          content={content}
        />
      </div>
    </div>
  );
};

export default Post;
