import { Header } from "@/types/header";
import Image from "next/image";

const Header = ({ handleTabChange }: Header) => {
  return (
    <div className="text-[#D3DAE0] font-thin justify-center items-center flex h-40 text-6xl flex-col mb-16">
      <div className="flex flex-row pt-20">
        <Image width={491} height={478} alt="Personal logo" src="/logo-white.png" className="h-32 w-32" />| blog.ntngu
      </div>
      <div className="text-4xl">
        <button
          className="rounded m-2 p-2 border border-[#0F151E] hover:border-[#D3DAE0]"
          type="button"
          onClick={() => handleTabChange("Home")}
        >
          Home
        </button>
        <button
          className="rounded m-2 p-2 border border-[#0F151E] hover:border-[#D3DAE0]"
          type="button"
          onClick={() => handleTabChange("Blogs")}
        >
          Blogs
        </button>
        <button
          className="rounded m-2 p-2 border border-[#0F151E] hover:border-[#D3DAE0]"
          type="button"
          onClick={() => handleTabChange("About")}
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Header;
