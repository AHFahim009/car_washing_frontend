import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Droplet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OverlayEffect from "@/components/overlayEffect/OverlayEffect";
import { Link, useNavigate } from "react-router-dom"
import { MobileMenu } from "./MobileMenu"
import AvatarDropDown from "./AvatarDropDown"
import { useAppSelector } from "@/redux/hooks";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth)
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavItemClick = (href: string) => {
    if (href === "/booking" && !token) {
      setShowOverlay(true);
    } else {
      setIsOpen(false);
      navigate(href);
    }

    // document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-black/80"
          }`}
      >
        <div className="container  mx-auto flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold flex items-center text-white">
            <Droplet className="w-6 h-6 mr-2 text-blue-600" />
            <a
              href="/"
              className="hover:text-blue-700 transition duration-300 text-blue-600"
            >
              SparkleWash
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6 ">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavItemClick(item.href)}
                className={`hover:text-blue-600 transition duration-300 ${scrolled ? "text-gray-800" : "text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
            {
              token ? <AvatarDropDown /> : <Link to={"/login"}>
                <Button className="bg-blue-600 hover:bg-blue-700  text-white">  Login </Button>
              </Link>
            }
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className={scrolled ? "text-gray-800" : "text-white"}
            >
              {isOpen ? (
                <X className="w-6 h-6 " />
              ) : (
                <Menu className="w-6 h-6 " />
              )}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
        </AnimatePresence>
      </nav>
      {showOverlay && <OverlayEffect setShowOverlay={setShowOverlay} />}
    </>
  );
}
