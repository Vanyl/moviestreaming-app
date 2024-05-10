import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const linksMenu = [
    {
      // icon: '',
      name: "prime video",
      link: "/streaming-app",
    },
    {
      //   icon: "fas fa-film",
      name: "Movies",
      link: "/streaming-app/movies",
    },
    {
      //   icon: "fas fa-tv",
      name: "TV Series",
      link: "/streaming-app/series",
    },
    {
      // icon: '',
      name: "Search",
      link: "/streaming-app/search",
    },
    {
      // icon: '',
      name: "Login",
      link: "/streaming-app/login",
    },
  ];

  const [scrolled, setScrolled] = useState(false);

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
      className={`navbar sticky top-0 z-50 m-0 p-0 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="navbar-container m-0 p-0 mx-auto flex justify-center">
        {linksMenu.map((element, index) => (
          <NavLink
            key={index}
            to={element.link || "#"}
            className={`nav-link py-4 px-6 text-white `}
          >
            {element.icon ? element.icon : element.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
