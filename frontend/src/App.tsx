import React from "react";
import './styles/App.css';
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <HomePage />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
