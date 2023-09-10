import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Petrochemicals from "./components/Petrochemicals/Petrochemicals";
import Products from "./components/Products/Products";
import Buyers from "./components/Buyers/Buyers";
import Counters from "./components/Counters/Counters";

const Home = () => {
  return (
    <React.StrictMode>
      <Header />
      <main className="relative bg-white">
        <Banner />
        <Petrochemicals />
        <Products />
        <Buyers />
        <Counters />
      </main>
    </React.StrictMode>
  );
};

export default Home;
