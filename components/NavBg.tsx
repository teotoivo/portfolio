"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css";

export default function NavBg() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onWindScroll = () => {
      const element = ref.current;
      if (element) {
        const { top } = element.getBoundingClientRect();
        const isVisible = top < window.innerHeight;
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener("scroll", onWindScroll);
    return () => {
      window.removeEventListener("scroll", onWindScroll);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`w-full gap-4 h-16 grid grid-flow-col bg-background-with-opacity items-center px-6 fixed top-0 shadow-2xl shadow-background ${
        isVisible ? "-translate-y-24" : "translate-y-0"
      } transition-all duration-500 ease-in-out`}
    ></div>
  );
}
