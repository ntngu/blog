import react from "react";
import { User } from "../../../types/user";
import { Blog } from "../../../types/blog";

const Admin = () => {
  const [user, setUser] = react.useState<User>();
  const [blogs, setBlogs] = react.useState<Blog[]>([]);
  const [username, setUsername] = react.useState<string>("");
  const [password, setPassword] = react.useState<string>("");
  const [title, setTitle] = react.useState<string>("");
  const [content, setContent] = react.useState<string>("");

  

  return (
    <>
      <h1>Hello World!</h1>    
    </>
  )
}

export default Admin;