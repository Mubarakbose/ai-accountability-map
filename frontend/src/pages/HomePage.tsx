// src/pages/HomePage.tsx
import React from "react";
import AccountabilityMap from "../components/AccountabilityMap";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-6">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Accountability Map</h1>
      <div className="max-w-7xl mx-auto">
        <AccountabilityMap />
      </div>
    </div>
  );
};

export default HomePage;
