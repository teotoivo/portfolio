"use client";
import React, { useEffect, useRef } from "react";
import { Variants, motion, AnimationScope, useAnimate } from "framer-motion";
import type { animate as typeAnimate } from "framer-motion";

export default function CarousselItem({
  skillItem,
  index,
  animate1,

  skills,
}: {
  skillItem: string[];
  index: number;
  skills: string[][];
  animate1: [typeof typeAnimate, AnimationScope];
}) {
  const skill = skillItem[0] as string;
  const testRef = useRef<HTMLDivElement>(null);

  const [animate, scope] = animate1;

  const [testScope, testAnimate] = useAnimate();

  let position = (index - 1) * 220;

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

  useEffect(() => {
    /*animate(
      scope.current,
      { xKeyFrames },
      { times, duration: 30, repeat: Infinity, type: "tween", ease: "linear" },
    );*/

    async function test() {
      await animate(
        testScope.current,
        { x: xKeyFrames },
        {
          duration: 50,
          times: times,
          repeat: Infinity,
          type: "tween",
          ease: "linear",
        },
      );
    }
    test();
  }, []);

  return (
    <motion.div
      onMouseEnter={() => {
        scope.animations.forEach((animation) => {
          animation.pause();
        });
      }}
      onMouseLeave={() => {
        scope.animations.forEach((animation) => {
          animation.play();
        });
      }}
      ref={testScope}
      key={skill}
      whileHover={{
        scale: 1.1,
        boxShadow: "inset 0px 0px 5px -3px rgba(255, 255, 255, 1)",
      }}
      className="absolute left-0 top-0 w-[200px] rounded-md bg-background-with-opacity p-4"
    >
      <p>{skill}</p>
    </motion.div>
  );
}
