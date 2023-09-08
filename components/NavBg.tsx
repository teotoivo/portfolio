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
      className={`fixed top-0 grid h-16 w-full grid-flow-col items-center gap-4 bg-background-with-opacity px-6 shadow-2xl shadow-background ${
        isVisible ? "-translate-y-24" : "translate-y-0"
      } transition-all duration-500 ease-in-out`}
    ></div>
  );
}
