// src/components/Filters.jsx
import React from 'react';

function Filters({ searchTerm, setSearchTerm, sortBy, setSortBy, chartRange, setChartRange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="🔍 Search Coin"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-800"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border rounded dark:bg-gray-800"
      >
        <option value="rank">Sort by Rank</option>
        <option value="volume">Sort by Volume</option>
      </select>

      <select
        value={chartRange}
        onChange={(e) => setChartRange(e.target.value)}
        className="p-2 border rounded dark:bg-gray-800"
      >
        <option value="1d">1 Day</option>
        <option value="7d">7 Days</option>
        <option value="30d">30 Days</option>
      </select>
    </div>
  );
}

export default Filters;
