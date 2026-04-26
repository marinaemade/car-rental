import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <IconButton
          size="lg"
          onClick={scrollToTop}
          className="rounded-full bg-green hover:bg-softGreen shadow-lg shadow-green/20 transition-all duration-300 animate-bounce md:animate-none"
        >
          <ArrowUpIcon strokeWidth={3} className="h-6 w-6 text-black" />
        </IconButton>
      )}
    </div>
  );
};

export default ScrollToTop;