import Header from "./Header";
import { HomePage } from "@/types/homePage";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const HomePage = ({ handleTabChange, title, content }: HomePage) => {
  return (
    <div className=" bg-[#0F151E] w-screen h-screen overflow-auto">
      <Header handleTabChange={handleTabChange} />
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-[#D3DAE0] text-3xl p-10">{title}</h1>
        <MarkdownPreview className="w-[58rem] p-10 mb-5" source={content} />
      </div>
    </div>
  );
};

export default HomePage;
