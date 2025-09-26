import React from "react";
import Navbar from "../components/layout/navbar";
import Hero from "../components/sections/heroHome";
import Footer from "../components/layout/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
