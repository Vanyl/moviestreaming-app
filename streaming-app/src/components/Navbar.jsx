import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import amazonPrimeLogo from "../assets/amazon_prime.png"
import amazonPrimeTitle from "../assets/amazon_prime_title.png"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
  const linksMenuLeft = [
    {
      name: "Home page",
      link: "/streaming-app",
    },
    {
      name: "Movies",
      link: "/streaming-app/movies",
    },
    {
      name: "TV Series",
      link: "/streaming-app/series",
    },
  ];

  const linksMenuRight = [
    {
      icon: <MagnifyingGlassIcon className="h-5 w-5 text-white" />,
      name: "Search",
      link: "/streaming-app/search",
    },
    {
      icon: <BookmarkIcon className="h-5 w-5 text-white" />,
      name: "Book Mark"
    },
    {
      // icon: '',
      name: "Login",
      link: "/streaming-app/login",
    },
  ]

  const [scrolled, setScrolled] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar flex top-0 z-50 my-0 mx-10 p-0 ${ //removed sticky
        scrolled ? "scrolled" : ""
        }`}
    >
      {/* removed mx-auto */}
      <div className={`navbar-container px-[18px] flex items-center justify-between w-full ${scrolled ? "scrolled-container" : ""}`}>
        <div className="flex items-center md:hidden"
          // onMouseEnter={() => setDropDownOpen(true)}
          // onMouseLeave={() => setDropDownOpen(false)}
        >
          <button onClick={() => setDropDownOpen(!dropDownOpen)} className="text-white flex items-center gap-1 hover:bg-white hover:text-black">
            Menu <ChevronDownIcon className="h-3 w-3" />
          </button>
          <div className={`absolute bg-amazonMenu p-4 rounded-md mt-52 flex flex-col gap-4 ${dropDownOpen ? "block" : "hidden"}`}>
            {linksMenuLeft.map((element, index) => (
              <NavLink
                key={index}
                to={element.link || "#"}
                className={`nav-link py-0 px-3 text-white`}
                onClick={() => setDropDownOpen(false)}
              >
                {element.name}
              </NavLink>
            ))}
            <div className="mx-3 bg-sky-500">
              <img className="max-h-[25px] max-w-[120px] px-3" src={amazonPrimeLogo} alt="Prime Video" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center ">
          {/* flex-grow */}
          <span className="mx-3">
            <img className="w-[80px] h-auto md:mr-[36px]" src={amazonPrimeTitle} alt="Prime Video" />
          </span>

        </div>

        {/* Left Links Section for Desktop */}
        <div className="hidden md:flex items-center">
          {linksMenuLeft.map((element, index) => (
            <NavLink
              key={index}
              to={element.link || "#"}
              className={`nav-link py-0 px-3 text-white`}
            >
              {element.name}
            </NavLink>
          ))}
          <div className="nav-divider mx-3"></div>
          <span className="hidden md:block mx-3">
            <img className="max-h-[25px] max-w-[120px] px-3" src={amazonPrimeLogo} alt="Prime Video" />
          </span>
        </div>

        <div className="flex items-center ml-auto">
          {linksMenuRight.map((element, index) => (
            <NavLink
              key={index}
              to={element.link || "#"}
              className={`nav-link py-0 px-3 text-white`}
            >
              {element.icon ? element.icon : element.name}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

// i forgot to do mobile first.
// if i am at the breakpoint 768px i would like my