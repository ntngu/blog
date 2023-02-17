import react from "react";
import blogService from "@/services/blogs";
import { User } from "@/types/user";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Post = () => {
  const [title, setTitle] = react.useState<string>("");
  const [content, setContent] = react.useState<string | undefined>("");
  const [message, setMessage] = react.useState<string>("");
  const [user, setUser] = react.useState<User>();

  const handleCreate = async (event: react.FormEvent) => {
    event.preventDefault();
    try {
      const blog = {
        title: title,
        content: content,
        date: new Date().toString(),
      };
      const response = await blogService.create(blog);
      setMessage(`${title} posted...`);
      setContent("");
      setTitle("");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setMessage(`${title} could not be posted...`);
    }
  };

  const titleChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
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
        <form onSubmit={handleCreate} className="flex flex-col bg-white shadow-md px-8 pt-6 mb-4 justify-items-center">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={title}
            onChange={titleChange}
            className="shadow border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-4"
          ></input>
          <MDEditor
            value={content}
            onChange={setContent}
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
    </div>
  );
};

export default Post;
