"use client";

import React, { useEffect, useState } from "react";
import { Variants, motion, useAnimate, useAnimation } from "framer-motion";
import CarousselItem from "./CarousselItem";
import {
  CssIcon,
  FramerMotionIcon,
  HtmlIcon,
  JsIcon,
  NextJsIcon,
  NodejsIcon,
  ReactIcon,
  SqlIcon,
  TailwindIcon,
  TsIcon,
} from "./Icons";
type skillItem = [
  string,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactElement,
];

export default function ItemCaroussel() {
  const skills = [
    ["HTML", HtmlIcon],
    ["CSS", CssIcon],
    ["JavaScript", JsIcon],
    ["React", ReactIcon],
    ["Next.js", NextJsIcon],
    ["TailwindCSS", TailwindIcon],
    ["Framer Motion", FramerMotionIcon],
    ["TypeScript", TsIcon],
    ["Node.js", NodejsIcon],
    ["SQL", SqlIcon],
  ] as skillItem[];

  return (
    <div className=" flex w-full flex-col items-center justify-center gap-14">
      <h1 className="underline">Skills</h1>
      <div className="w-full">
        <div className="mx-4 flex flex-row flex-wrap gap-4">
          {skills.map((skillItem, index) => {
            return (
              <CarousselItem
                key={skillItem[0]}
                skillItem={skillItem}
                index={index}
                skills={skills}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
