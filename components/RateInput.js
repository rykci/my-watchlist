import React, { useState } from "react";

export default function RateInput({ ethToSol, setEthToSol }) {
  const [ethPrice, setEthPrice] = useState(0);
  const [solPrice, setSolPrice] = useState(0);

  const handleEth = (event) => {
    setEthPrice(event.target.value);
  };

  const handleSol = (event) => {
    setSolPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ethPrice <= 0 || solPrice <= 0) {
      alert("invalid input");
    } else {
      setEthToSol(ethPrice / solPrice);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-y-5">
        <label className="flex gap-x-5 items-center justify-center">
          <span className="font-semibold">ETH:</span>
          <input
            className="border-2 border-black rounded-md p-2"
            type="text"
            name="eth"
            value={ethPrice}
            onChange={handleEth}
          />
        </label>
        <label className="flex gap-x-5 items-center justify-center">
          <span className="font-semibold">SOL:</span>
          <input
            className="border-2 border-black rounded-md p-2"
            type="text"
            name="sol"
            value={solPrice}
            onChange={handleSol}
          />
        </label>
        <input
          onSubmit={handleSubmit}
          onClick={handleSubmit}
          className="bg-sky-500 p-4 rounded-lg text-white font-bold hover:cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
