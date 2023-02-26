import { Blogs } from "@/types/blogs";
import { Blog } from "@/types/blog";
import Header from "./Header";
import react from "react";
import blogService from "@/services/blogs";
import { DateTime } from "luxon";
import BlogView from "./BlogView";

const Blogs = ({ handleTabChange, blogs }: Blogs) => {
  const blogList = blogs && blogs.map((blog) => (
    <li key={blog.id} className="flex justify-around text-xl">
      <button className="text-[#D3DAE0] underline mr-10" type="button">
        {blog.title}
      </button>
      <div key={`date_${blog.id}`}className="text-[#D3DAE0]">
        {DateTime.fromISO(blog.date!).toLocaleString()}
      </div>
    </li>
  ));

  return (
    <div className=" bg-[#0F151E] w-screen h-screen">
      <Header handleTabChange={handleTabChange} />
      <ul className="flex justify-center items-center flex-col p-10">
        {blogList}
      </ul>
    </div>
  );
};

export default Blogs;
