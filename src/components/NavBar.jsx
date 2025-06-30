// src/components/NavBar.jsx
import React from 'react';

function NavBar({ walletAddress, onConnect, profileTab, setProfileTab }) {
  return (
    <nav className="flex justify-between items-center mb-6 border-b pb-4">
      <h1 className="text-3xl font-bold">🪙 DeFi Dashboard</h1>
      <div className="flex gap-2">
        <button
          onClick={onConnect}
          className="px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
        </button>
        <button
          onClick={() => setProfileTab(!profileTab)}
          className="px-4 py-2 bg-gray-700 text-white rounded shadow"
        >
          {profileTab ? '🏠 Home' : '📂 Profile'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
