"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  const [search, setSearch] = useState("");
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search) {
      await router.push(`/movies/search?query=${search}`);
      setSearch("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBackground(window.scrollY > 50 ? "bg-gray-200 bg-opacity-50" : "transparent");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`border-gray-800 h-20 ${navbarBackground}`}>
      <div className="container mx-0 flex justify-start items-center ">
        <Link href="/">
          <div className="text-white text-4xl font-bold cursor-pointer">
            <img
              src="https://movix-eta.vercel.app/assets/movix-logo-d720c325.svg"
              className="w-[280px] h-[40px] md:w-40 md:h-24"
              alt="Movix Logo"
            />
          </div>
        </Link>
        <form
          className="mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
          onSubmit={handleSubmit} // Use 'onSubmit' on the form
          role="search"
        >
          <input
            type="text"
            placeholder="Search Any Movie"
            className="bg-transparent w-full focus:outline-none pr-4 text-black font-semibold border-0 focus:ring-0 px-0 py-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="hidden md:flex md:flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border transition ease-in-out duration-150 text-base bg-gradient-to-r from-orange-500 to-orange-900 text-white border-transparent py-1.5 h-[38px] -mr-3"
          >
            Search
          </button>

          <BiSearch
            className="md:hidden text-black ml-2"
            size={24}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </nav>
  );
}
