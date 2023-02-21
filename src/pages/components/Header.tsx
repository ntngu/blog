const Header = () => {
  return (
    <div className="text-[#D3DAE0] font-thin justify-center items-center flex h-40 text-6xl flex-col">
      <div className="flex flex-row pt-20">
        <img src="/logo-white.png" className="h-32" />| blog.ntngu
      </div>
      <div className="text-4xl">
        <button
          className="rounded m-2 p-2 border border-[#0F151E] hover:border-[#D3DAE0]"
          type="button"
        >
          Home
        </button>
        <button
          className="rounded m-2 p-2 border border-[#0F151E] hover:border-[#D3DAE0]"
          type="button"
        >
          Blogs
        </button>
      </div>
    </div>
  );
};

export default Header;
