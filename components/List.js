import React from "react";

export default function List({ rate, setEthToSol, collections }) {
  return (
    <div className="	flex flex-col">
      <table className="table-auto overflow-x-scroll">
        <thead className="m-2">
          <tr className="m-4">
            <th>Collection</th>
            <th>Floor Price</th>
            <th>24h %</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr
              className="m-4 space-x-6 hover:bg-slate-100 hover:drop-shadow-xl"
              key={collection.slug}
            >
              <td>
                <a
                  href={`https://opensea.io/collection/${collection.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center m-2 gap-4 font-semibold hover:cursor-pointer"
                >
                  <img
                    className="rounded-full w-16"
                    src={collection.image_url}
                  />{" "}
                  <span className="truncate">{collection.name}</span>
                </a>
              </td>
              <td className=" font-semibold items-center justify-center p-6">
                {(collection.stats.floor_price * rate).toFixed(2)}
              </td>
              <td
                className={
                  collection.stats.one_day_change < 0
                    ? "text-red-500 font-semibold text-right p-6"
                    : "text-green-500 font-semibold text-right p-6"
                }
              >
                {collection.stats.one_day_change.toFixed(2)}%
              </td>
              <td className="font-semibold items-center justify-center p-6 text-center">
                {(collection.stats.total_volume * rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-sky-500 p-4 rounded-lg text-white font-bold hover:cursor-pointer"
        onClick={() => setEthToSol(0)}
      >
        BACK
      </button>
    </div>
  );
}
