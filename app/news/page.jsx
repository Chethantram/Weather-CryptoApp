"use client";
import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
dotenv.config();

const page = () => {
  const [news, setNews] = useState([]);

  const url = "https://crypto-news16.p.rapidapi.com/news/top/5";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_X_RAPID_API_KEY}`,
      "x-rapidapi-host": "crypto-news16.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const parsedResult = JSON.parse(result);
        setNews(parsedResult);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-5 h-full bg-white">
      <h2 className="text-2xl font-bold">CryptoCurrency News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
        {news.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4  space-y-3 bg-[#403d39] text-white rounded-lg shadow-lg"
          >
            <img
              src={`${item.thumbnail}`}
              alt="img"
              className="w-full h-[200px]"
            />
            <h5 className="font-mono">{new Date(item.date).toDateString()}</h5>
            <h2 className="text-xl font-semibold line-clamp-2">{item.title}</h2>
            <p className="text-gray-300 line-clamp-3 ">{item.description}</p>
            <a
              href={item.url}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
