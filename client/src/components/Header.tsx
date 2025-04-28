import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      // Redirect to home page first with the section hash
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed w-full bg-white z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "bg-opacity-90"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2">
        <div className="flex items-center justify-center w-full md:w-auto">
          <Link href="/" className="block">
            <div className="w-[100px] h-[100px] bg-primary rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-white text-xl font-heading font-bold">AGRI</span>
            </div>
          </Link>
        </div>
        
        <nav className="w-full md:w-auto mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-4 text-sm md:text-base font-accent">
            <li>
              <Link className="px-3 py-2 hover:text-primary transition-colors" href="/">
                Home
              </Link>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("events")}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("stories")}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Stories
              </button>
            </li>
            <li>
              <Link className="px-3 py-2 hover:text-primary transition-colors" href="/chapters">
                Chapters
              </Link>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("donate")}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Donate
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("volunteer")}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Volunteer
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("about")}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                About Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
