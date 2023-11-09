"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  const [search, setSearch] = useState("");
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (search.trim() !== "") {
        // Perform your API request here
        // If no results, set the error state
        setError("This word doesn't match the API.");
        showAlert("This word doesn't match the API.");
      }
    } catch (error) {
      setError("Error searching. Please try again.");
      showAlert("Error searching. Please try again.");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBackground("bg-gray-200 bg-opacity-50");
    } else {
      setNavbarBackground("bg-transparent-200");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileSearch = async () => {
    try {
      if (search.trim() !== "") {
        // Perform your API request here
        // If no results, set the error state
        setError("This word doesn't match the API.");
        showAlert("This word doesn't match the API.");
      }
    } catch (error) {
      setError("Error searching. Please try again.");
      showAlert("Error searching. Please try again.");
    }
  };

  const showAlert = (message) => {
    // You can replace this with your preferred modal or notification library
    alert(message);
  };

  return (
    <nav className={`border-gray-800 ${navbarBackground}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-4xl font-bold cursor-pointer">
            <img
              src="https://movix-eta.vercel.app/assets/movix-logo-d720c325.svg"
              className="w-16 h-16 md:w-25 md:h-25"
              alt="Movix Logo"
            />
          </div>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
        >
          <input
            type="text"
            placeholder="Search any movie"
            className="bg-transparent w-full focus:outline-none pr-4 text-black font-semibold border-0 focus:ring-0 px-0 py-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="hidden md:flex md:flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
          >
            Search
          </button>
          <BiSearch
            className="md:hidden text-black ml-2 cursor-pointer"
            size={24}
            onClick={handleMobileSearch}
          />
        </form>
      </div>
    </nav>
  );
}