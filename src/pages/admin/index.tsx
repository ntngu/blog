import react from "react";
import { useRouter } from "next/router";
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
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div></div>
    )
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

  return (
    <div className="flex h-screen w-screen bg-gray-300">
      <button type="button"> </button>
      <button type="button" onClick={() => router.push("/admin/post")}>Submit a post</button> 
    </div>
  );
};

export default Admin;
