import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import react from "react";
import blogService from "@/services/blogs";
import { User } from "@/types/user";
import { Blog } from "@/types/blog";
import { DateTime } from "luxon";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const BlogItem = ({title, content, date, id}: Blog) => {
  const [user, setUser] = react.useState<User>();
  const router = useRouter();

  react.useEffect(() => {
    const userToken = window.localStorage.getItem("userToken");
    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
      blogService.setToken(user.token);
    }

  }, [])

  return (
    <div className="flex flex-row p-2 w-96">
      <div>
        {title} <br />
        {DateTime.fromISO(date!).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
      </div>
      <button className="p-2 ml-auto self-end shadow rounded bg-slate-200 hover:bg-slate-300" type="button">Edit</button>
    </div>
  )
}

export default BlogItem;