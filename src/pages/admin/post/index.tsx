import react from "react";
import blogService from "@/services/blogs";
import { User } from "@/types/user";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

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

  const contentChange = (e: string | undefined) => {
    setContent(e);
  };

  return (
    <div>
      <form>
        <label>Title</label>
        <input name="title"></input>
        <MDEditor
          value={content}
          onChange={setContent}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </form>
    </div>
  );
};

export default Post;
