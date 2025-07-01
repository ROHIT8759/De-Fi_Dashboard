// // AssetTable.jsx
// import React from 'react';

// const AssetTable = ({ assets }) => {
//   return (
//     <div className="overflow-x-auto rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
//       <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
//         <thead className="bg-gray-200 dark:bg-gray-800 text-xs uppercase font-medium">
//           <tr>
//             <th className="px-6 py-4">Asset Name</th>
//             <th className="px-6 py-4">LTV</th>
//             <th className="px-6 py-4">Deposit APR</th>
//             <th className="px-6 py-4">Market Size</th>
//             <th className="px-6 py-4">Borrow APR</th>
//             <th className="px-6 py-4">Total Borrowed</th>
//             <th className="px-6 py-4">Wallet</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
//           {assets.map((asset) => (
//             <tr key={asset.symbol} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//               <td className="px-6 py-4 flex items-center gap-2">
//                 <img src={asset.image} alt={asset.name} className="w-6 h-6 rounded-full" />
//                 <div>
//                   <div className="font-semibold">{asset.name}</div>
//                   <div className="text-xs text-gray-500">${asset.price.toLocaleString()}</div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">{asset.ltv}%</td>
//               <td className="px-6 py-4 text-green-500 font-semibold">{asset.depositAPR}%</td>
//               <td className="px-6 py-4">
//                 {asset.marketSize} {asset.symbol}
//                 <div className="text-xs text-gray-500">${asset.marketSizeUSD.toLocaleString()}</div>
//               </td>
//               <td className="px-6 py-4 text-red-500 font-semibold">{asset.borrowAPR}%</td>
//               <td className="px-6 py-4">
//                 {asset.totalBorrowed} {asset.symbol}
//                 <div className="text-xs text-gray-500">${asset.totalBorrowedUSD.toLocaleString()}</div>
//               </td>
//               <td className="px-6 py-4">
//                 {asset.walletBalance} {asset.symbol}
//                 <div className="text-xs text-gray-500">${(asset.walletBalance * asset.price).toFixed(2)}</div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssetTable;


// import React from 'react';

// const AssetTable = ({ assets }) => {
//   return (
//     <div className="overflow-x-auto rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
//       <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
//         <thead className="bg-gray-200 dark:bg-gray-800 text-xs uppercase font-medium">
//           <tr>
//             <th className="px-6 py-4">Asset Name</th>
//             <th className="px-6 py-4">LTV</th>
//             <th className="px-6 py-4">Deposit APR</th>
//             <th className="px-6 py-4">Market Size</th>
//             <th className="px-6 py-4">Borrow APR</th>
//             <th className="px-6 py-4">Total Borrowed</th>
//             <th className="px-6 py-4">Wallet</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
//           {assets?.map((asset) => (
//             <tr key={asset?.symbol} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//               <td className="px-6 py-4 flex items-center gap-2">
//                 <img src={asset?.image || ''} alt={asset?.name || 'token'} className="w-6 h-6 rounded-full" />
//                 <div>
//                   <div className="font-semibold">{asset?.name || 'N/A'}</div>
//                   <div className="text-xs text-gray-500">
//                     ${asset?.price?.toLocaleString() || '0.00'}
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">{asset?.ltv || 0}%</td>
//               <td className="px-6 py-4 text-green-500 font-semibold">
//                 {asset?.depositAPR || 0}%
//               </td>
//               <td className="px-6 py-4">
//                 {asset?.marketSize || 0} {asset?.symbol}
//                 <div className="text-xs text-gray-500">
//                   ${asset?.marketSizeUSD?.toLocaleString() || '0.00'}
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-red-500 font-semibold">
//                 {asset?.borrowAPR || 0}%
//               </td>
//               <td className="px-6 py-4">
//                 {asset?.totalBorrowed || 0} {asset?.symbol}
//                 <div className="text-xs text-gray-500">
//                   ${asset?.totalBorrowedUSD?.toLocaleString() || '0.00'}
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 {asset?.walletBalance || 0} {asset?.symbol}
//                 <div className="text-xs text-gray-500">
//                   ${((asset?.walletBalance || 0) * (asset?.price || 0)).toFixed(2)}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssetTable;



// /// AssetTable
// import React from 'react';

// const AssetTable = ({ coins, onTrade }) => {
//   return (
//     <div className="overflow-x-auto rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
//       <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
//         <thead className="bg-gray-200 dark:bg-gray-800 text-xs uppercase font-medium">
//           <tr>
//             <th className="px-6 py-4">Asset Name</th>
//             <th className="px-6 py-4">LTV</th>
//             <th className="px-6 py-4">Deposit APR</th>
//             <th className="px-6 py-4">Market Size</th>
//             <th className="px-6 py-4">Borrow APR</th>
//             <th className="px-6 py-4">Total Borrowed</th>
//             <th className="px-6 py-4">Wallet</th>
//             <th className="px-6 py-4">Action</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
//           {coins.map((coin) => (
//             <tr key={coin.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//               <td className="px-6 py-4 flex items-center gap-2">
//                 <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
//                 <div>
//                   <div className="font-semibold">{coin.name}</div>
//                   <div className="text-xs text-gray-500">${coin.current_price.toLocaleString()}</div>
//                 </div>
//               </td>

//               <td className="px-6 py-4">80%</td>

//               <td className="px-6 py-4 text-green-500 font-semibold">
//                 {(coin.price_change_percentage_7d_in_currency ?? 0).toFixed(2)}%
//               </td>

//               <td className="px-6 py-4">
//                 {coin.circulating_supply.toFixed(0)} {coin.symbol.toUpperCase()}
//                 <div className="text-xs text-gray-500">
//                   ${coin.market_cap?.toLocaleString()}
//                 </div>
//               </td>

//               <td className="px-6 py-4 text-red-500 font-semibold">
//                 {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
//               </td>

//               <td className="px-6 py-4">
//                 {(coin.total_volume / coin.current_price).toFixed(2)} {coin.symbol.toUpperCase()}
//                 <div className="text-xs text-gray-500">
//                   ${coin.total_volume?.toLocaleString()}
//                 </div>
//               </td>

//               <td className="px-6 py-4">0.00 {coin.symbol.toUpperCase()}
//                 <div className="text-xs text-gray-500">$0.00</div>
//               </td>

//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => onTrade(coin, true)}
//                   className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded mr-1"
//                 >
//                   Buy
//                 </button>
//                 <button
//                   onClick={() => onTrade(coin, false)}
//                   className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
//                 >
//                   Sell
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssetTable;




// AssetTable.jsx
import React from 'react';

const AssetTable = ({ assets = [], onTrade }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-200 dark:bg-gray-800 text-xs uppercase font-medium">
          <tr>
            <th className="px-6 py-4">Asset Name</th>
            <th className="px-6 py-4">LTV</th>
            <th className="px-6 py-4">Deposit APR</th>
            <th className="px-6 py-4">Market Size</th>
            <th className="px-6 py-4">Borrow APR</th>
            <th className="px-6 py-4">Total Borrowed</th>
            <th className="px-6 py-4">Wallet</th>
            <th className="px-6 py-4">Trade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
          {assets.map((asset) => (
            <tr key={asset.symbol} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <td className="px-6 py-4 flex items-center gap-2">
                <img src={asset.image} alt={asset.name} className="w-6 h-6 rounded-full" />
                <div>
                  <div className="font-semibold">{asset.name}</div>
                  <div className="text-xs text-gray-500">
                    ${asset.current_price?.toLocaleString() || '0.00'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">60%</td>
              <td className="px-6 py-4 text-green-500 font-semibold">3.2%</td>
              <td className="px-6 py-4">
                {asset.circulating_supply?.toLocaleString() || '-'} {asset.symbol?.toUpperCase()}
                <div className="text-xs text-gray-500">
                  ${asset.market_cap?.toLocaleString() || '0'}
                </div>
              </td>
              <td className="px-6 py-4 text-red-500 font-semibold">6.7%</td>
              <td className="px-6 py-4">
                {asset.total_volume?.toLocaleString() || '0'} {asset.symbol?.toUpperCase()}
                <div className="text-xs text-gray-500">
                  ${(asset.total_volume * asset.current_price || 0).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4">
                --
                <div className="text-xs text-gray-500">--</div>
              </td>
              <td className="px-6 py-4">
                <button
                  className="text-sm px-2 py-1 rounded bg-green-600 text-white shadow"
                  onClick={() => onTrade(asset, true)}
                >
                  Buy
                </button>
                <button
                  className="text-sm px-2 py-1 rounded bg-red-600 text-white shadow ml-2"
                  onClick={() => onTrade(asset, false)}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
