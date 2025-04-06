"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const page = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState({
    name: "",
    symbol: "",
    price: "",
    change: "",
    volume: "",
    marketCap: "",
  });
  const [topFive, setTopFive] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    if (!name.trim()) {
      alert("Please enter a cryptocurrency name.");
      return;
    }

    try {
      const url = `https://api.coincap.io/v2/assets/${name.toLowerCase()}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await res.json();
      if (!result.data) {
        alert("No data found for the entered cryptocurrency.");
        return;
      }

      setData({
        name: result.data.name,
        symbol: result.data.symbol,
        price: parseFloat(result.data.priceUsd).toFixed(2),
        change: parseFloat(result.data.changePercent24Hr).toFixed(2),
        volume: parseFloat(result.data.volumeUsd24Hr).toLocaleString(),
        marketCap: parseFloat(result.data.marketCapUsd).toLocaleString(),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        "Failed to fetch data. Please check the cryptocurrency name or try again later."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.coincap.io/v2/assets`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const result = await res.json();
        if (Array.isArray(result.data)) {
          const topFive = result.data
            .sort((a, b) => a.rank - b.rank)
            .slice(0, 5);
          setTopFive(topFive);
        } else {
          console.error("Unexpected data format:", result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum"
    );

    ws.onmessage = (message) => {
      const prices = JSON.parse(message.data);
      if (prices.bitcoin) {
        toast.success(
          `BTC Price Updated: $${parseFloat(prices.bitcoin).toFixed(2)}`,
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      }
      if (prices.ethereum) {
        toast.success(
          `ETH Price Updated: $${parseFloat(prices.ethereum).toFixed(2)}`,
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      }
    };

    return () => ws.close(); // Cleanup WebSocket connection on component unmount
  }, []);

  return (
    <>
      <div className="mx-5 md:mx-5 lg:mx-20 my-10 bg-gradient-to-r from-[#197278] text-white to bg-[#0077b6] p-5 md:mt-40  md:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Cryptocurrency</h1>
        <p className="font-mono text-md text-gray-200 text-center">
          Live crypto currency Tracker
        </p>
        <form
          className="flex justify-center gap-3 w-full items-center mt-4"
          onSubmit={onSubmitHandler} // Attach onSubmit to the form.
        >
          <input
            type="text"
            placeholder="search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 w-full md:w-3/4 lg:w-1/2 outline-none bg-white text-black  rounded-3xl shadow-lg"
          />
          <button type="submit">
            <Search className="p-2 text-white cursor-pointer hover:bg-gray-800 bg-black w-10 h-10 rounded-full" />
          </button>
        </form>
        <div className="overflow-x-auto mt-4">
          <table className="table-auto border-collapse border  border-gray-400 w-full">
            <thead>
              <tr className="bg-[#14213d] text-white font-mono text-md">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Symbol</th>
                <th className="border border-gray-400 px-4 py-2">
                  Price (USD)
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Change (24hr)
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  24hr Volume
                </th>
                <th className="border border-gray-400 px-4 py-2">Market Cap</th>
              </tr>
            </thead>
            <tbody className="bg-[#fca311] text-white font-mono text-md">
              {name.trim() === "" ? (
                topFive.map((coin) => (
                  <tr key={coin.id}>
                    <td className="border border-gray-400 px-4 py-2">
                      {coin.name}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {coin.symbol}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {parseFloat(coin.priceUsd).toFixed(2)}
                    </td>
                    <td
                      className={`border border-gray-400 px-4 py-2 ${
                        parseFloat(coin.changePercent24Hr) >= 0.0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {parseFloat(coin.volumeUsd24Hr).toLocaleString()}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {parseFloat(coin.marketCapUsd).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-400 px-4 py-2">
                    {data.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {data.symbol}
                  </td>
                  <td className={`border border-gray-400 px-4 py-2`}>
                    {data.price}
                  </td>
                  <td
                    className={`border border-gray-400 px-4 py-2 ${
                      parseFloat(data.change) >= 0.0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {data.change}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {data.volume}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {data.marketCap}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default page;
