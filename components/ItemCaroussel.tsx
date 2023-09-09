"use client";

import React, { useEffect, useState } from "react";
import { Variants, motion, useAnimate, useAnimation } from "framer-motion";
import CarousselItem from "./CarousselItem";

export default function ItemCaroussel() {
  const [scope, animate] = useAnimate();
  const skills = [
    ["HTML", ""],
    ["CSS"],
    ["JavaScript", ""],
    ["React", ""],
    ["Next.js", ""],
    ["TailwindCSS", ""],
    ["Framer Motion", ""],
    ["TypeScript", ""],
    ["Node.js", ""],
    ["Express.js", ""],
    ["SQL", ""],
  ];

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-14">
      <h1 className="underline">Skills</h1>
      <div className="w-full">
        <div className="relative m-2 hidden h-48  gap-4  md:flex">
          {skills.map((skillItem, index) => {
            return (
              <CarousselItem
                key={skillItem[0]}
                skillItem={skillItem}
                index={index}
                skills={skills}
                animate1={[animate, scope]}
              />
            );
          })}
        </div>
      </div>
      <div className="m-2 flex flex-wrap gap-4 md:hidden">
        {skills.map((skillItem) => {
          const skill = skillItem[0] as string;

          return (
            <motion.div
              key={skill}
              className="rounded-md bg-background-with-opacity p-4"
            >
              <p>{skill}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
