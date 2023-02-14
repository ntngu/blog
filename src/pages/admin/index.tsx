import react from "react";
import { User } from "../../../types/user";
import { Blog } from "../../../types/blog";

const Admin = () => {
  const [user, setUser] = react.useState<User>();
  const [blogs, setBlogs] = react.useState<Blog[]>([]);

  return (
    <>
      <h1>Hello World!</h1>    
    </>
  )
}

export default Admin;