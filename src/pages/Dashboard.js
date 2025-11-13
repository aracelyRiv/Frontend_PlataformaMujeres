import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import DashboardFamiliarSection from "../components/sections/DashboardFamiliarSection";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <DashboardFamiliarSection />
      <Footer />
    </div>
  );
}
