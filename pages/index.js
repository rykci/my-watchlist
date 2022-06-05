import Head from "next/head";
import { useState } from "react";
import RateInput from "../components/RateInput";
import List from "../components/List";

const Home = ({ collections }) => {
  const [ethToSol, setEthToSol] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Your NFT Stats</title>
        <link rel="icon" href="/solana-sol-logo.svg" />
      </Head>

      {ethToSol === 0 ? (
        <RateInput ethToSol={ethToSol} setEthToSol={setEthToSol} />
      ) : (
        <List
          rate={ethToSol}
          setEthToSol={setEthToSol}
          collections={collections}
        />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    "https://api.opensea.io/api/v1/collections?asset_owner=7sjy8CKVmgUMJZzH2YR6rUZ845TcK1HqFekAUgT8gsKL&offset=0&limit=300"
  );

  //console.log(res);
  const collections = await res.json();

  let filtered = collections.filter(
    (collection) =>
      !collection.name.includes("autogen") && collection.name != "Solana"
  );

  filtered = await Promise.all(
    filtered.map(async (collection) => {
      let res = await fetch(
        `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`
      );

      let stats = await res.json();

      return { ...collection, stats: stats.stats };
    })
  );

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      collections: filtered.sort(
        (a, b) => b.stats.total_volume - a.stats.total_volume
      ),
    },
  };
}

export default Home;
