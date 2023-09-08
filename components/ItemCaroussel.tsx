"use client";

import React, { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";

export default function ItemCaroussel() {
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
            const skill = skillItem[0] as string;

            let position = (index - 1) * 220;

            console.log(skill);

            const itemAmmount = skills.length + 1;

            const xKeyFramesF = () => {
              let xKeyFrames = [];

              for (let i = 0; i < itemAmmount + 1; i++) {
                let temp = itemAmmount - 2;

                if (position === temp * 220) {
                  position = -220;
                  xKeyFrames.push(position);
                } else {
                  position += 220;
                  xKeyFrames.push(position);
                }
              }
              return xKeyFrames;
            };

            const xKeyFrames = xKeyFramesF();

            function roundToTwo(num: number) {
              return Math.round((num + Number.EPSILON) * 100) / 100;
            }

            const timesF = () => {
              let times: number[] = [];
              let keyFrames = xKeyFrames;

              //find index of -220
              let index = keyFrames.indexOf(-220);

              let lastNum = 0;

              let secondaryI = 0;

              for (let i = 0; i < keyFrames.length; i++) {
                if (index === i) {
                  times.push(lastNum);
                } else {
                  times.push(roundToTwo(secondaryI / (keyFrames.length - 2)));
                  lastNum = roundToTwo(secondaryI / (keyFrames.length - 2));
                  secondaryI++;
                }
              }

              return times;
            };

            const times = timesF();

            console.log(xKeyFrames, times);

            const cardVariants: Variants = {
              show: {
                x: xKeyFrames,
                transition: {
                  duration: 30,
                  times: times,
                  repeat: Infinity,
                  type: "tween",
                  ease: "linear",
                },
              },
            };

            return (
              <motion.div
                variants={cardVariants}
                animate="show"
                key={skill}
                className="absolute left-0 top-0 w-[200px] rounded-md bg-background-with-opacity p-4"
              >
                <p>{skill}</p>
              </motion.div>
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
