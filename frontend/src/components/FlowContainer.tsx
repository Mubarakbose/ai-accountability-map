import React from "react";
import AccountabilityMap from "./AccountabilityMap";

const FlowContainer: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-7xl p-4">
      <AccountabilityMap />
    </div>
  </div>
);

export default FlowContainer;
