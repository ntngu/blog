import react from "react";
import blogService from "@/services/blogs";
import { User } from "@/types/user";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from "next/router";
import BlogForm from "@/pages/admin/components/BlogForm";

export async function getServerSideProps() {
  return {
      props: {},
  };
}

const Edit = () => {
  const [postTitle, setPostTitle] = react.useState<string | undefined>("");
  const [postContent, setPostContent] = react.useState<string | undefined>("");
  const [message, setMessage] = react.useState<string>("");
  const [user, setUser] = react.useState<User>();
  const [date, setDate] = react.useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  const handleCreate = async (event: react.FormEvent) => {
    event.preventDefault();
    try {
      const blog = {
        title: postTitle,
        content: postContent,
        id: id as string,
        date: date
      };
      console.log(id, blog);
      const response = await blogService.update(id as string, blog);
      router.push("/admin");
    } catch (err) {
      setMessage(`${postTitle} could not be posted...`);
    }
  };

  const handleTitleChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostTitle(value);
  };

  const handleContentChange = (str: string | undefined) => {
    setPostContent(str as string);
  };

  react.useEffect(() => {
    const userToken = window.localStorage.getItem("userToken");
    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
      blogService.setToken(user.token);
      blogService
        .getPost(id as string)
        .then((blog) => {
          setPostTitle(blog.title);
          setPostContent(blog.content);
          setDate(blog.date);
        })
        .catch((err) => {
          console.log("Error getting post");
        });
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
          title={postTitle}
          content={postContent}
        />
      </div>
    </div>
  );
};

export default Edit;
