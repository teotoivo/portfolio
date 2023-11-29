"use client";

import React from "react";

import ItemCaroussel from "@/app/(portfolio)/components/ItemCaroussel";

export default async function page() {
  //get age from bday 07.11.2005
  const age = Math.floor(
    (new Date().getTime() - new Date("2005-11-07").getTime()) /
      1000 /
      60 /
      60 /
      24 /
      365,
  );

  return (
    <>
      <section id="main" className="bg-main bg-cover  bg-fixed">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex max-w-[90%] flex-col self-center">
            <div
              className={` w-fit self-center rounded-lg bg-background-with-opacity p-16  text-center`}
            >
              <h1 className="">Teo Maximilien</h1>
            </div>
          </div>
        </div>
        <picture className="">
          <source
            srcSet="/darkWaves.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img src="/lightWaves.svg" alt="wave divider" />
        </picture>
      </section>
      <section id="about">
        <div>
          <div className="flex w-full flex-col items-center gap-6 bg-background p-10">
            <h1 className="underline">About me</h1>
            <p className="text-center align-middle text-base">
              Im a {age} year old student studying software devlopment at
              Business College Helsinki in Finland. I have been programming for
              about 3 years now. I like coding on my free time and i also like
              gym climbing and going to the gym.
            </p>
          </div>
        </div>
      </section>
      <div>
        <picture>
          <source
            srcSet="/darkWaves.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img
            className=" rotate-180"
            src="/lightWaves.svg"
            alt="wave divider"
          />
        </picture>

        <section id="skills" className="flex min-h-screen justify-center">
          <ItemCaroussel />
        </section>
      </div>
    </>
  );
}
