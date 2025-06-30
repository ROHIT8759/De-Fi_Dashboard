// SummaryHeader.jsx
import React from 'react';

const SummaryHeader = ({ marketSize, totalBorrowed, lentOut }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex gap-4 flex-wrap">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 min-w-[200px] shadow">
          <p className="text-sm text-gray-500">Current Market Size</p>
          <p className="text-xl font-semibold text-green-500">${marketSize.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 min-w-[200px] shadow">
          <p className="text-sm text-gray-500">Total Borrowed</p>
          <p className="text-xl font-semibold text-red-500">${totalBorrowed.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 min-w-[200px] shadow">
          <p className="text-sm text-gray-500">Lent Out</p>
          <p className="text-xl font-semibold text-blue-500">{lentOut}%</p>
        </div>
      </div>

      <div>
        <a
          href="https://bridge.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow transition"
        >
          🔗 Click here to bridge your asset from EVM chain!
        </a>
      </div>
    </div>
  );
};

export default SummaryHeader;
