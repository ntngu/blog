import react from "react";
import { useRouter } from "next/router";
import { User } from "../../types/user";
import { Blog } from "../../types/blog";
import loginService from "../../services/login";
import blogService from "../../services/blogs";
import Login from "./components/Login";
import BlogItem from "./BlogItem";

const Admin = () => {
  const [user, setUser] = react.useState<User>();
  const [blogs, setBlogs] = react.useState<Blog[]>([]);
  const [username, setUsername] = react.useState<string>("");
  const [password, setPassword] = react.useState<string>("");
  const [message, setMessage] = react.useState<string>("");
  const [loading, setLoading] = react.useState<boolean>(true);

  const router = useRouter();

  const handleLogin = async (event: react.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("userToken", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
      blogService.setToken(user.token);
      console.log(user.token);
    } catch (err) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await blogService.remove(id);
    } catch (err) {
      console.log(err);
    }
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((err) => console.log(err));
  };

  const handleLogout = (event: react.FormEvent) => {
    event.preventDefault();
    window.localStorage.removeItem("userToken");
    setUser(undefined);
  };

  const usernameChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const passwordChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  react.useEffect(() => {
    const userToken = window.localStorage.getItem("userToken");
    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!user) {
    return (
      <Login
        handleLogin={handleLogin}
        handleNameChange={usernameChange}
        handlePasswordChange={passwordChange}
      />
    );
  }

  const blogList = blogs.map((blog) => (
    <div key={blog.id} className="flex flex-row items-center justify-center">
      <BlogItem
        key={`blog_${blog.id}`}
        id={blog.id}
        title={blog.title}
        content={blog.content}
        date={blog.date}
      />
      <button 
        onClick={() => handleDelete(blog.id as string)}
        className="p-2 ml-auto shadow rounded bg-slate-200 hover:bg-slate-300"
        type="button"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col items-center h-screen w-screen overflow-auto bg-gray-300 justify-center">
      <div className="flex flex-col justify-center w-96 align-middle bg-slate-100 shadow rounded p-10">
        <button 
          onClick={() => router.push("/admin/post")}
          className="p-2 ml-auto self-end shadow rounded bg-slate-200 hover:bg-slate-300"
          type="button"
        >Post</button>
        {blogList}
      </div>
    </div>
  );
};

export default Admin;
