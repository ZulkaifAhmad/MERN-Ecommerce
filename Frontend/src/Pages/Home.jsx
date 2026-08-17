import React from "react";
import Hero from "../Components/Hero.jsx";
import LatestProdcuts from "../Components/LatestProdcuts.jsx";
import BestSeller from "../Components/BestSeller.jsx";
import OurPolicy from "../Components/OurPolicy.jsx";
import Subscribe from "../Components/Subscribe.jsx";

function Home() {
  return (
    <div className="relative px-4">
      <Hero />
      <LatestProdcuts />
      <BestSeller />
      <OurPolicy />
      <Subscribe />
    </div>
  );
}

export default Home;
