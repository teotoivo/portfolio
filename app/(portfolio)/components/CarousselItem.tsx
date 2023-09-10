"use client";
import React, { useEffect, useRef } from "react";
import { Variants, motion, AnimationScope, useAnimate } from "framer-motion";
import type { animate as typeAnimate } from "framer-motion";

/*
Type '(string | ((props: SVGProps<SVGSVGElement>) => Element))[]' is not assignable to type 'skillItem'.
  Target requires 2 element(s) but source may have fewer.ts(2322)
CarousselItem.tsx(18, 3): The expected type comes from property 'skillItem' which is declared here on type 'IntrinsicAttributes & { skillItem: skillItem; index: number; skills: string[][]; }'
*/

type skillItem = [
  string,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactElement,
];

export default function CarousselItem({
  skillItem,
  index,

  skills,
}: {
  //its ["HTML", HtmlIcon]
  skillItem: skillItem;
  index: number;
  skills: skillItem[];
}) {
  const [skill, Icon] = skillItem;

  return (
    <motion.div
      key={skill}
      initial={{ border: "2px solid var(--btn-border)" }}
      whileHover={{
        scale: 1.1,
        boxShadow: "inset 0px 0px 5px -3px rgba(255, 255, 255, 1)",
        border: "2px solid var(--btn-border-hover)",
      }}
      className="flex min-w-max flex-1 items-center justify-center gap-4 rounded-md bg-background-with-opacity p-4"
    >
      <p>{skill}</p>
      <Icon className="h-6 w-6" />
    </motion.div>
  );
}
