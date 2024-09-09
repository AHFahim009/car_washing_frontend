/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OverlayEffect from "@/components/overlayEffect/OverlayEffect";
import AvatarDropDown from "./AvatarDropDown";
import { useAppSelector } from "@/redux/hooks";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ setIsOpen }: { setIsOpen: any }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const user = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleNavItemClick = (href: string) => {
    if (href === "/booking" && !user) {
      setShowOverlay(true);
    } else {
      navigate(href);
      setIsOpen(false);
    }

    // document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden bg-white/90 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-4 py-2">
        <AvatarDropDown />
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavItemClick(item.href)}
            className="block w-full text-left py-2 text-gray-800 hover:text-blue-600 transition duration-300"
          >
            {item.label}
          </button>
        ))}
        <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
          Book Now
        </Button>
        {showOverlay && <OverlayEffect setShowOverlay={setShowOverlay} />}
      </div>
    </motion.div>
  );
}
