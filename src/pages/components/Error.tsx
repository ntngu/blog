import { About } from "@/types/about";
import Header from "./Header";

const Error = ({ handleTabChange }: About) => {
  return (
    <div className=" bg-[#0F151E] w-screen h-screen">
      <Header handleTabChange={handleTabChange} />
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-[#D3DAE0] text-3xl p-10">Error: How did you get here?</h1>
      </div>
    </div>
  );
}

export default Error;