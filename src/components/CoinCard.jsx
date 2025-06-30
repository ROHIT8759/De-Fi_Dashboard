// // src/components/CoinCard.jsx
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from 'chart.js';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// function CoinCard({ coin, chartRange }) {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//       <div className="flex items-center gap-4 mb-4">
//         <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//         <div>
//           <h2 className="text-xl font-bold">{coin.name}</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//         </div>
//       </div>
//       <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//       <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//       <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//       <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//       <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//       <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

//       {/* Price Chart */}
//       <div className="h-24 mt-2">
//         <Line
//           data={{
//             labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//             datasets: [
//               {
//                 data: coin.sparkline_in_7d.price,
//                 borderColor: '#4F46E5',
//                 borderWidth: 2,
//                 pointRadius: 0,
//               },
//             ],
//           }}
//           options={{
//             responsive: true,
//             plugins: { legend: { display: false } },
//             scales: { x: { display: false }, y: { display: false } },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default CoinCard;



// // CoinCard.jsx
// import React from 'react';
// import { Line } from 'react-chartjs-2';

// function CoinCard({ coin, chartRange, onTrade }) {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//       <div className="flex items-center gap-4 mb-4">
//         <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//         <div>
//           <h2 className="text-xl font-bold">{coin.name}</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//         </div>
//       </div>
//       <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//       <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//       <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//       <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//       <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//       <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>
      

//       <div className="h-24 mt-2">
//         <Line
//           data={{
//             labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//             datasets: [
//               {
//                 data: coin.sparkline_in_7d.price,
//                 borderColor: '#4F46E5',
//                 borderWidth: 2,
//                 pointRadius: 0,
//               },
//             ],
//           }}
//           options={{
//             responsive: true,
//             plugins: { legend: { display: false } },
//             scales: { x: { display: false }, y: { display: false } },
//           }}
//         />
//       </div>

//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={() => onTrade(coin, true)}
//           className="px-4 py-1 bg-green-600 text-white rounded shadow"
//         >
//           Buy
//         </button>
//         <button
//           onClick={() => onTrade(coin, false)}
//           className="px-4 py-1 bg-red-600 text-white rounded shadow"
//         >
//           Sell
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CoinCard;



// import React from 'react';
// import { Line } from 'react-chartjs-2';

// function CoinCard({ coin, chartRange, onTrade }) {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//       <div className="flex items-center gap-4 mb-4">
//         <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//         <div>
//           <h2 className="text-xl font-bold">{coin.name}</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//         </div>
//       </div>
//       <p>💰 Price: ${coin.current_price?.toLocaleString()}</p>
//       <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//       <p>📊 Market Cap: ${coin.market_cap?.toLocaleString()}</p>
//       <p>🔢 Volume: ${coin.total_volume?.toLocaleString()}</p>
//       <p>🪙 Circulating: {coin.circulating_supply?.toLocaleString()}</p>
//       <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

//       {coin?.sparkline_in_7d?.price?.length ? (
//         <div className="h-24 mt-2">
//           <Line
//             data={{
//               labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//               datasets: [
//                 {
//                   data: coin.sparkline_in_7d.price,
//                   borderColor: '#4F46E5',
//                   borderWidth: 2,
//                   pointRadius: 0,
//                 },
//               ],
//             }}
//             options={{
//               responsive: true,
//               plugins: { legend: { display: false } },
//               scales: { x: { display: false }, y: { display: false } },
//             }}
//           />
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500 mt-2">📉 Chart unavailable</p>
//       )}

//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={() => onTrade(coin, true)}
//           className="px-4 py-1 bg-green-600 text-white rounded shadow"
//         >
//           Buy
//         </button>
//         <button
//           onClick={() => onTrade(coin, false)}
//           className="px-4 py-1 bg-red-600 text-white rounded shadow"
//         >
//           Sell
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CoinCard;





// CoinCard.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function CoinCard({ coin, chartRange, onTrade }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition">
      <div className="flex items-center gap-4 mb-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="text-xl font-bold">{coin.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
        </div>
      </div>

      <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
      <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
      <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
      <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
      <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
      <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

      {/* Price Chart */}
      <div className="h-24 mt-2">
        <Line
          data={{
            labels: Array(coin.sparkline_in_7d?.price?.length || 0).fill(''),
            datasets: [
              {
                data: coin.sparkline_in_7d?.price || [],
                borderColor: '#4F46E5',
                borderWidth: 2,
                pointRadius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
          }}
        />
      </div>

      {/* Buy / Sell Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onTrade(coin, true)}
          className="px-4 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          Buy
        </button>
        <button
          onClick={() => onTrade(coin, false)}
          className="px-4 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700"
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default CoinCard;

