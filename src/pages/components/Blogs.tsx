import { Blogs } from "@/types/blogs";
import { Blog } from "@/types/blog";
import Header from "./Header";
import Router from "next/router";
import react from "react";
import blogService from "@/services/blogs";
import { DateTime } from "luxon";
import BlogView from "./BlogView";

const Blogs = ({ handleTabChange, blogs }: Blogs) => {
  const [active, setActive] = react.useState<string>("");

  const modal = (id: string) => {
    setActive(id);
  }

  const blogList = blogs && blogs.map((blog) => (
    <div key={blog.id} className="flex justify-around text-xl flex-col">
      <div className="flex justify-center flex-row">
        <button 
          className="text-[#D3DAE0] underline mr-10" type="button"
          onClick={() => modal(blog.id!)}
        >
          {blog.title}
        </button>
        <div key={`date_${blog.id}`}className="text-[#D3DAE0]">
          {DateTime.fromISO(blog.date!).toLocaleString()}
        </div>
      </div>
      
      {active === blog.id ? <div className="z-10 bg-[#0F151E] relative h-screen">
        <BlogView modal={modal} title={blog.title} content={blog.content}/>
      </div> : <></>}
      
    </div>
  ));

  return (
    <div className="bg-[#0F151E] w-screen h-screen overflow-auto">
      <Header handleTabChange={handleTabChange} />
      <div>
      <div className="flex justify-center items-center flex-col p-10">
        {blogList}
      </div>
      </div>
    </div>
  );
};

export default Blogs;
