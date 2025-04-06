"use client";
import { Waves, Wind } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import sun from "@/assets/sun.png";
import cloudy from "@/assets/cloudy.png";
import drizzle from "@/assets/drizzle.png";
import rain from "@/assets/rain.png";
import snow from "@/assets/snow.png";
dotenv.config();

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    city: "",
    icon: "",
  });

  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const onSubmitHandler = async (e) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      city.toLowerCase() || "London"
    }&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    const icons = allIcons[data.weather[0].icon];

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: data.main.temp,
      city: data.name,
      icon: icons,
    });
    setCity("");
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString(undefined, options);
  };

  const simulateWeatherAlert = () => {
    const alerts = [
      "Heavy rain expected in the next hour!",
      "Strong winds forecasted for the evening.",
      "Sunny weather ahead, enjoy your day!",
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    toast.info(randomAlert, { position: "top-right", autoClose: 5000 });
  };

  useEffect(() => {
    onSubmitHandler();
    const interval = setInterval(simulateWeatherAlert, 30000); // Simulate alerts every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-5 md:mx-0">
      <div className="flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 mx-auto mt-20 md:mt-40 p-5  md:p-10 text-white  bg-gradient-to-r  from-indigo-900 to bg-violet-600 rounded-md shadow-lg">
        <div className=" items-center w-full ">
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold">Weather App</h1>
            <p className="text-gray-300 font-mono">{getCurrentDate()}</p>
          </div>
          <div className="bg-gray-300 flex justify-between rounded-md  items-center">
            <input
              type="text"
              placeholder="Enter the city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 outline-none text-black w-full"
            />
            <button
              className="bg-black hover:bg-gray-900 text-white px-4 cursor-pointer py-2 rounded-l-none rounded-md ml-2"
              onClick={(e) => onSubmitHandler(e)}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <h2>
            <Image width={100} height={100} alt="img" src={weatherData.icon} />
          </h2>
          <h2 className="text-4xl font-medium mt-3">
            {weatherData.temperature}°C
          </h2>
          <p className="text-gray-300 text-lg font-mono">{weatherData.city}</p>
        </div>
        <div className="flex justify-between items-center w-full md:px-5 lg:px-20 mt-5">
          <div className="flex items-center gap-3">
            <div>
              <Waves className="size-9" />
            </div>

            <div>
              <h3 className="text-md font-semibold">{weatherData.humidity}%</h3>
              <p className="font-mono text-gray-300">Humidity</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Wind className="size-9" />
            </div>

            <div>
              <h3 className="text-md font-semibold">
                {weatherData.windSpeed} km/hr
              </h3>
              <p className="font-mono text-gray-300">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Weather;
