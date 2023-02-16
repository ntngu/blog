import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const BlogForm = () => {
  return (
    <div>
      <form>
        <label>title</label>
        <MDEditor></MDEditor>
      </form>
    </div>
  );
};

export default BlogForm;
