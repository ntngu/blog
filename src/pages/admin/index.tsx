import react from "react";
import { User } from "../../types/user";
import { Blog } from "../../types/blog";
import loginService from "../../services/login";
import blogService from "../../services/blogs";
import Login from "./components/Login";

const Admin = () => {
  const [user, setUser] = react.useState<User>();
  const [blogs, setBlogs] = react.useState<Blog[]>([]);
  const [username, setUsername] = react.useState<string>("");
  const [password, setPassword] = react.useState<string>("");
  const [title, setTitle] = react.useState<string>("");
  const [content, setContent] = react.useState<string>("");
  const [message, setMessage] = react.useState<string>("");

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
    } catch (err) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLogout = (event: react.FormEvent) => {
    event.preventDefault();
    window.localStorage.removeItem("userToken");
    setUser(undefined);
  };

  const handleCreate = async (event: react.FormEvent) => {
    event.preventDefault();
    try {
      const blog = {
        title: title,
        content: content,
        date: new Date().toString(),
      };
      const response = await blogService.create(blog);
      setBlogs([...blogs, response]);
      setMessage(`${title} posted...`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setMessage(`${title} could not be posted...`);
    }
  };

  const usernameChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const passwordChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  const titleChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const contentChange = (e: react.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setContent(value);
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
    return (
      <Login
        handleLogin={handleLogin}
        handleNameChange={usernameChange}
        handlePasswordChange={passwordChange}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-300">
      
    </div>
  );
};

export default Admin;
