"use client";
import { Cloudy, Gem, Newspaper } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState("weather");
  useEffect(() => {
    
  }, [])
  
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") setMenu("weather");
    else if (currentPath === "/crypto") setMenu("crypto");
    else if (currentPath === "/news") setMenu("news");
  }, []);

  return (
    <div className="flex justify-between px-5 md:px-0 md:justify-evenly items-center py-4 bg-gradient-to-r from-[#1b263b] to bg-[#0d1b2a] text-white">
      <div>
        <h2 className="md:text-xl hidden md:block font-bold">CHETHAN</h2>
        <h2 className="text-lg md:hidden font-bold">CTR</h2>
      </div>
      <div>
        <ul className="flex gap-8 md:gap-7">
          <Link
            onClick={() => setMenu("weather")}
            href={"/"}
            className={`font-mono text-md hover:border-b-2 flex  md:gap-2 items-center hover:border-gray-500 ${
              menu === "weather" ? "border-b-2 border-white" : ""
            }`}
          >
            <Cloudy className="size-4"/>
            <h3 className="hidden md:block">Weather</h3>
          </Link>
          <Link
            onClick={() => setMenu("crypto")}
            href={"/crypto"}
            className={`font-mono text-md hover:border-b-2 flex  md:gap-2 items-center hover:border-gray-500 ${
              menu === "crypto" ? "border-b-2 border-white" : ""
            }`}
          >
            <Gem className="size-4 "/>
            <h3 className="hidden md:block">Cryptocurrency</h3>
          </Link>
          <Link
            onClick={() => setMenu("news")}
            href={"/news"}
            className={`font-mono text-md hover:border-b-2 flex  md:gap-2 items-center hover:border-gray-500 ${
              menu === "news" ? "border-b-2 border-white" : ""
            }`}
          >
            <Newspaper className="size-4"/>
            <h3 className="hidden md:block">News</h3>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
