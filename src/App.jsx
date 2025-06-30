// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { connectMartianWallet } from './utils/connectMartian';

// function App() {
//   const [prices, setPrices] = useState(null);
//   const [tvl, setTvl] = useState(null);
//   const [gas, setGas] = useState(null);
//   const [wallet, setWallet] = useState(null);

//   const fetchPrices = async () => {
//     const res = await axios.get(
//       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,aave,uniswap,curve-dao-token&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
//     );
//     setPrices(res.data);
//   };

//   const fetchTVL = async () => {
//     const res = await axios.get('https://api.llama.fi/summary/all');
//     setTvl(res.data);
//   };

//   const fetchGas = async () => {
//     try {
//       const res = await axios.get('https://ethgasstation.info/api/ethgasAPI.json');
//       setGas(res.data);
//     } catch (err) {
//       setGas(null);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWallet(address);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchPrices();
//     fetchTVL();
//     fetchGas();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-8 font-sans w-full overflow-x-hidden">
//       <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
//         <h1 className="text-4xl font-extrabold tracking-tight">🌐 DeFi Dashboard</h1>
//         <button
//           onClick={connectWallet}
//           className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-2 rounded-xl text-white shadow-md"
//         >
//           {wallet ? `Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}
//         </button>
//       </header>

//       {prices && (
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">📈 Live Prices</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {prices.map((coin) => (
//               <div key={coin.id} className="bg-gray-800 hover:bg-gray-700 transition p-5 rounded-2xl shadow-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <img src={coin.image} alt={coin.name} className="w-7 h-7" />
//                   <h3 className="text-xl font-bold uppercase">{coin.name}</h3>
//                 </div>
//                 <p>💵 Price: <span className="text-green-400">${coin.current_price}</span></p>
//                 <p>🏦 Market Cap: ${Math.round(coin.market_cap / 1e9)}B</p>
//                 <p>🔄 24h Volume: ${Math.round(coin.total_volume / 1e6)}M</p>
//                 <p>
//                   📊 24h Change:{' '}
//                   <span className={coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
//                     {coin.price_change_percentage_24h.toFixed(2)}%
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {tvl && (
//         <section className="mb-10">
//           <h2 className="text-2xl font-semibold mb-4">🔐 Total Value Locked</h2>
//           <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
//             <p className="text-lg">
//               Total TVL: <span className="text-blue-400 font-bold">${Math.round(tvl.total / 1e9)}B</span>
//             </p>
//           </div>
//         </section>
//       )}

//       {gas && (
//         <section>
//           <h2 className="text-2xl font-semibold mb-4">⛽ Gas Fees</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold">🚀 Fast</h3>
//               <p>{gas.fast / 10} Gwei</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold">⚖️ Average</h3>
//               <p>{gas.average / 10} Gwei</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg shadow">
//               <h3 className="font-bold">🐢 SafeLow</h3>
//               <p>{gas.safeLow / 10} Gwei</p>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from 'chart.js';
// import './index.css';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [darkMode, setDarkMode] = useState(true);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <div className={`${darkMode ? 'dark' : ''}`}>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">📈 DeFi Dashboard</h1>
//           <button
//             onClick={toggleTheme}
//             className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
//           >
//             Toggle {darkMode ? 'Light' : 'Dark'} Mode
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search Coin"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-800"
//           />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="p-2 border rounded dark:bg-gray-800"
//           >
//             <option value="rank">Sort by Rank</option>
//             <option value="volume">Sort by Volume</option>
//           </select>
//           <select
//             value={chartRange}
//             onChange={(e) => setChartRange(e.target.value)}
//             className="p-2 border rounded dark:bg-gray-800"
//           >
//             <option value="1d">1 Day</option>
//             <option value="7d">7 Days</option>
//             <option value="30d">30 Days</option>
//           </select>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredCoins.map((coin) => (
//             <div key={coin.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//               <div className="flex items-center gap-4 mb-4">
//                 <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//                 <div>
//                   <h2 className="text-xl font-bold">{coin.name}</h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//                 </div>
//               </div>

//               <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//               <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//               <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//               <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//               <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//               <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

//               <div className="h-24 mt-2">
//                 <Line
//                   data={{
//                     labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//                     datasets: [
//                       {
//                         data: coin.sparkline_in_7d.price,
//                         borderColor: '#4F46E5',
//                         borderWidth: 2,
//                         pointRadius: 0,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: { legend: { display: false } },
//                     scales: { x: { display: false }, y: { display: false } },
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from 'chart.js';
// import './index.css';
// import { connectMartianWallet } from './utils/connectMartian';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [darkMode, setDarkMode] = useState(true);
//   const [walletAddress, setWalletAddress] = useState(null);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <div className={`${darkMode ? 'dark' : ''}`}>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">📈 DeFi Dashboard</h1>
//           <div className="flex gap-2">
//             <button
//               onClick={toggleTheme}
//               className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
//             >
//               Toggle {darkMode ? 'Light' : 'Dark'} Mode
//             </button>
//             <button
//               onClick={handleConnectWallet}
//               className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
//             >
//               {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search Coin"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-800"
//           />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="p-2 border rounded dark:bg-gray-800"
//           >
//             <option value="rank">Sort by Rank</option>
//             <option value="volume">Sort by Volume</option>
//           </select>
//           <select
//             value={chartRange}
//             onChange={(e) => setChartRange(e.target.value)}
//             className="p-2 border rounded dark:bg-gray-800"
//           >
//             <option value="1d">1 Day</option>
//             <option value="7d">7 Days</option>
//             <option value="30d">30 Days</option>
//           </select>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredCoins.map((coin) => (
//             <div key={coin.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//               <div className="flex items-center gap-4 mb-4">
//                 <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//                 <div>
//                   <h2 className="text-xl font-bold">{coin.name}</h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//                 </div>
//               </div>

//               <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//               <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//               <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//               <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//               <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//               <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

//               <div className="h-24 mt-2">
//                 <Line
//                   data={{
//                     labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//                     datasets: [
//                       {
//                         data: coin.sparkline_in_7d.price,
//                         borderColor: '#4F46E5',
//                         borderWidth: 2,
//                         pointRadius: 0,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: { legend: { display: false } },
//                     scales: { x: { display: false }, y: { display: false } },
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from 'chart.js';
// import './index.css';
// import { connectMartianWallet } from './utils/connectMartian';
// import { AptosClient } from 'aptos';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [darkMode, setDarkMode] = useState(true);
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <div className={`${darkMode ? 'dark' : ''}`}>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">

//         {/* NavBar */}
//         <nav className="flex justify-between items-center mb-6 border-b pb-4">
//           <h1 className="text-3xl font-bold">🪙 DeFi Dashboard</h1>
//           <div className="flex gap-2">
//             <button onClick={toggleTheme} className="px-4 py-2 bg-indigo-600 text-white rounded shadow">
//               {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
//             </button>
//             <button
//               onClick={handleConnectWallet}
//               className="px-4 py-2 bg-green-600 text-white rounded shadow"
//             >
//               {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
//             </button>
//             <button onClick={() => setProfileTab(!profileTab)} className="px-4 py-2 bg-gray-700 text-white rounded shadow">
//               {profileTab ? 'Home' : '📂 Profile'}
//             </button>
//           </div>
//         </nav>

//         {/* Profile Dashboard */}
//         {profileTab ? (
//           <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//             <p>📬 Address: {walletAddress}</p>
//             <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>
//             <p>📦 NFTs, Tokens, and future on-chain data will show here.</p>
//           </div>
//         ) : (
//           <>
//             {/* Filters */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="🔍 Search Coin"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-800"
//               />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="p-2 border rounded dark:bg-gray-800"
//               >
//                 <option value="rank">Sort by Rank</option>
//                 <option value="volume">Sort by Volume</option>
//               </select>
//               <select
//                 value={chartRange}
//                 onChange={(e) => setChartRange(e.target.value)}
//                 className="p-2 border rounded dark:bg-gray-800"
//               >
//                 <option value="1d">1 Day</option>
//                 <option value="7d">7 Days</option>
//                 <option value="30d">30 Days</option>
//               </select>
//             </div>

//             {/* Coin Cards */}
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <div key={coin.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//                     <div>
//                       <h2 className="text-xl font-bold">{coin.name}</h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{coin.symbol}</p>
//                     </div>
//                   </div>
//                   <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//                   <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//                   <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//                   <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//                   <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//                   <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>

//                   <div className="h-24 mt-2">
//                     <Line
//                       data={{
//                         labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//                         datasets: [
//                           {
//                             data: coin.sparkline_in_7d.price,
//                             borderColor: '#4F46E5',
//                             borderWidth: 2,
//                             pointRadius: 0,
//                           },
//                         ],
//                       }}
//                       options={{
//                         responsive: true,
//                         plugins: { legend: { display: false } },
//                         scales: { x: { display: false }, y: { display: false } },
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



// // 🚀 Updated DeFi Dashboard with Aptos Integration
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
// } from 'chart.js';
// import './index.css';
// import { connectMartianWallet } from './utils/connectMartian';
// import { AptosClient } from 'aptos';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [nfts, setNfts] = useState([]);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//       fetchNFTs(address);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const fetchNFTs = async (address) => {
//     try {
//       const res = await aptos.getAccountModules(address);
//       setNfts(res);
//     } catch (err) {
//       setNfts([]);
//     }
//   };

//   const sendToken = async (recipient, amount) => {
//     try {
//       const response = await window.martian.signAndSubmitTransaction({
//         sender: walletAddress,
//         data: {
//           function: '0x1::coin::transfer',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [recipient, `${amount * 1e8}`],
//         },
//       });
//       alert('Transfer submitted: ' + response.hash);
//     } catch (err) {
//       alert('Transfer failed: ' + err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   return (
//     <div>
//       <div className="min-h-screen bg-white text-black p-4">
//         <nav className="flex justify-between items-center mb-6 border-b pb-4">
//           <h1 className="text-3xl font-bold">🪙 DeFi Dashboard</h1>
//           <div className="flex gap-2">
//             <button onClick={handleConnectWallet} className="px-4 py-2 bg-green-600 text-white rounded shadow">
//               {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
//             </button>
//             <button onClick={() => setProfileTab(!profileTab)} className="px-4 py-2 bg-gray-700 text-white rounded shadow">
//               {profileTab ? 'Home' : '📂 Profile'}
//             </button>
//           </div>
//         </nav>

//         {profileTab ? (
//           <div className="bg-gray-100 p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//             <p>📬 Address: {walletAddress}</p>
//             <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>
//             <p>🎨 NFTs Owned: {nfts.length}</p>
//             <div className="mt-4">
//               <h3 className="font-semibold">Token Transfer</h3>
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const recipient = e.target.recipient.value;
//                 const amount = parseFloat(e.target.amount.value);
//                 sendToken(recipient, amount);
//               }}>
//                 <input type="text" name="recipient" placeholder="Recipient Address" className="border p-2 rounded w-full mt-2" required />
//                 <input type="number" step="0.01" name="amount" placeholder="Amount" className="border p-2 rounded w-full mt-2" required />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Send Token</button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <input type="text" placeholder="🔍 Search Coin" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded w-full md:w-1/3" />
//               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded">
//                 <option value="rank">Sort by Rank</option>
//                 <option value="volume">Sort by Volume</option>
//               </select>
//               <select value={chartRange} onChange={(e) => setChartRange(e.target.value)} className="p-2 border rounded">
//                 <option value="1d">1 Day</option>
//                 <option value="7d">7 Days</option>
//                 <option value="30d">30 Days</option>
//               </select>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <div key={coin.id} className="bg-gray-100 p-4 rounded-xl shadow-md">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img src={coin.image} alt={coin.name} className="w-10 h-10" />
//                     <div>
//                       <h2 className="text-xl font-bold">{coin.name}</h2>
//                       <p className="text-sm text-gray-600 uppercase">{coin.symbol}</p>
//                     </div>
//                   </div>
//                   <p>💰 Price: ${coin.current_price.toLocaleString()}</p>
//                   <p>📈 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
//                   <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
//                   <p>🔢 Volume: ${coin.total_volume.toLocaleString()}</p>
//                   <p>🪙 Circulating: {coin.circulating_supply.toLocaleString()}</p>
//                   <p>📦 Total Supply: {coin.total_supply?.toLocaleString() || 'N/A'}</p>
//                   <div className="h-24 mt-2">
//                     <Line
//                       data={{
//                         labels: Array(coin.sparkline_in_7d.price.length).fill(''),
//                         datasets: [
//                           {
//                             data: coin.sparkline_in_7d.price,
//                             borderColor: '#4F46E5',
//                             borderWidth: 2,
//                             pointRadius: 0,
//                           },
//                         ],
//                       }}
//                       options={{
//                         responsive: true,
//                         plugins: { legend: { display: false } },
//                         scales: { x: { display: false }, y: { display: false } },
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard key={coin.id} coin={coin} chartRange={chartRange} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;





// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       fetchWalletData(address);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const fetchWalletData = async (address) => {
//     try {
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchPrices = async () => {
//     const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//       params: {
//         vs_currency: 'usd',
//         ids: coinList,
//         order: 'market_cap_desc',
//         sparkline: true,
//         price_change_percentage: '1h,24h,7d',
//       },
//     });
//     setCoins(res.data);
//     setFilteredCoins(res.data);
//   };

//   useEffect(() => {
//     fetchPrices();
//     const interval = setInterval(fetchPrices, 30000); // 30s updates
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} aptosClient={aptos} />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard key={coin.id} coin={coin} chartRange={chartRange} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';


// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [isBuying, setIsBuying] = useState(true);


//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard key={coin.id} coin={coin} chartRange={chartRange} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard
//                   key={coin.id}
//                   coin={coin}
//                   chartRange={chartRange}
//                   onTrade={handleTrade}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');

//   const coinList =
//     'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);

//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) =>
//         r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//       );
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert('Wallet connection failed: ' + err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//           params: {
//             vs_currency: 'usd',
//             ids: coinList,
//             order: 'market_cap_desc',
//             sparkline: true,
//             price_change_percentage: '1h,24h,7d',
//           },
//         });
//         setCoins(res.data);
//         setFilteredCoins(res.data);
//       } catch (error) {
//         console.error('CoinGecko API failed:', error.message);
//         alert('Failed to fetch coin data. Try again later.');
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//       <NavBar
//         walletAddress={walletAddress}
//         onConnect={handleConnectWallet}
//         profileTab={profileTab}
//         setProfileTab={setProfileTab}
//       />

//       {profileTab ? (
//         <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//       ) : (
//         <>
//           <Filters
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//             chartRange={chartRange}
//             setChartRange={setChartRange}
//           />

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredCoins.map((coin) => (
//               <CoinCard
//                 key={coin.id}
//                 coin={coin}
//                 chartRange={chartRange}
//                 onTrade={handleTrade}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {isBuyModalOpen && selectedCoin && (
//         <BuySellModal
//           coin={selectedCoin}
//           tradeType={tradeType}
//           onClose={() => setIsBuyModalOpen(false)}
//           walletAddress={walletAddress}
//           aptosClient={aptos}
//         />
//       )}
//     </div>
//   );
// }

// export default App;


// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');

//   const coinList =
//     'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);

//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) =>
//         r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//       );
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert('Wallet connection failed: ' + err.message);
//     }
//   };

//   const handleTransfer = async (amount, recipient) => {
//     if (!window.martian || !walletAddress) return alert('Connect Martian wallet first.');

//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x1::coin::transfer',
//         type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         arguments: [recipient, (amount * 1e8).toString()],
//       };

//       const txnRequest = await aptos.generateTransaction(walletAddress, payload);
//       const response = await window.martian.signAndSubmitTransaction(txnRequest);
//       alert(`✅ ${tradeType.toUpperCase()} successful: ${response.hash}`);
//     } catch (error) {
//       alert('❌ Transaction failed: ' + error.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//           params: {
//             vs_currency: 'usd',
//             ids: coinList,
//             order: 'market_cap_desc',
//             sparkline: true,
//             price_change_percentage: '1h,24h,7d',
//           },
//         });
//         setCoins(res.data);
//         setFilteredCoins(res.data);
//       } catch (error) {
//         console.error('CoinGecko API failed:', error.message);
//         alert('Failed to fetch coin data. Try again later.');
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//       <NavBar
//         walletAddress={walletAddress}
//         onConnect={handleConnectWallet}
//         profileTab={profileTab}
//         setProfileTab={setProfileTab}
//       />

//       {profileTab ? (
//         <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//       ) : (
//         <>
//           <Filters
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//             chartRange={chartRange}
//             setChartRange={setChartRange}
//           />

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredCoins.map((coin) => (
//               <CoinCard
//                 key={coin.id}
//                 coin={coin}
//                 chartRange={chartRange}
//                 onTrade={handleTrade}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {isBuyModalOpen && selectedCoin && (
//         <BuySellModal
//           coin={selectedCoin}
//           tradeType={tradeType}
//           onClose={() => setIsBuyModalOpen(false)}
//           walletAddress={walletAddress}
//           onTransfer={handleTransfer}
//         />
//       )}
//     </div>
//   );
// }

// export default App;




// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';

// const MAINNET_URL = 'https://fullnode.mainnet.aptoslabs.com';
// const TESTNET_URL = 'https://fullnode.testnet.aptoslabs.com';

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');
//   const [isLoading, setIsLoading] = useState(false);
//   const [network, setNetwork] = useState('mainnet');

//   const aptos = new AptosClient(network === 'mainnet' ? MAINNET_URL : TESTNET_URL);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleTransfer = async (receiver, amount) => {
//     if (!walletAddress || !receiver || !amount || isNaN(amount) || amount <= 0) {
//       alert('Invalid address or amount');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const txPayload = {
//         type: 'entry_function_payload',
//         function: '0x1::aptos_account::transfer',
//         type_arguments: [],
//         arguments: [receiver, (parseFloat(amount) * 1e8).toString()],
//       };
//       const txRequest = await aptos.generateTransaction(walletAddress, txPayload);
//       const signedTx = await window.martian.signAndSubmitTransaction(txRequest);
//       console.log('Transaction Hash:', signedTx.hash);
//       alert('Transaction submitted: ' + signedTx.hash);
//     } catch (err) {
//       console.error(err);
//       alert('Transaction failed: ' + err.message);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <div className="flex justify-end mb-2">
//           <select
//             value={network}
//             onChange={(e) => setNetwork(e.target.value)}
//             className="p-2 rounded bg-gray-200 dark:bg-gray-700"
//           >
//             <option value="mainnet">Mainnet</option>
//             <option value="testnet">Testnet</option>
//           </select>
//         </div>

//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard
//                   key={coin.id}
//                   coin={coin}
//                   chartRange={chartRange}
//                   onTrade={handleTrade}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//             onTransfer={handleTransfer}
//             isLoading={isLoading}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;





// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com';
// const aptos = new AptosClient(NODE_URL);

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');
//   const [txHistory, setTxHistory] = useState([]);

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   useEffect(() => {
//     const fetchTxHistory = async () => {
//       if (!walletAddress) return;
//       try {
//         const response = await axios.get(`${NODE_URL}/accounts/${walletAddress}/transactions?limit=10`);
//         setTxHistory(response.data);
//       } catch (error) {
//         console.error('Failed to fetch transaction history:', error);
//       }
//     };
//     fetchTxHistory();
//   }, [walletAddress]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard
//             walletAddress={walletAddress}
//             aptosBalance={aptosBalance}
//             txHistory={txHistory}
//           />
//         ) : (
//           <>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredCoins.map((coin) => (
//                 <CoinCard
//                   key={coin.id}
//                   coin={coin}
//                   chartRange={chartRange}
//                   onTrade={handleTrade}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';
// import AssetTable from './components/AssetTable';
// import SummaryHeader from './components/AssetTable';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');
//   const [viewMode, setViewMode] = useState('cards');

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <SummaryHeader />
//             <div className="flex justify-end mb-4">
//               <button
//                 onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
//                 className="px-3 py-1 bg-indigo-600 text-white rounded shadow"
//               >
//                 Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
//               </button>
//             </div>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             {viewMode === 'cards' ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredCoins.map((coin) => (
//                   <CoinCard
//                     key={coin.id}
//                     coin={coin}
//                     chartRange={chartRange}
//                     onTrade={handleTrade}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <AssetTable coins={filteredCoins} onTrade={handleTrade} />
//             )}
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';
// import AssetTable from './components/AssetTable';
// import SummaryHeader from './components/SummaryHeader'; // ✅ FIXED import

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');
//   const [viewMode, setViewMode] = useState('cards');

//   const coinList =
//     'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find(
//         (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//       );
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });

//       const enrichedCoins = res.data.map((coin) => ({
//         id: coin.id,
//         name: coin.name,
//         symbol: coin.symbol.toUpperCase(),
//         image: coin.image,
//         price: coin.current_price,
//         ltv: 80,
//         depositAPR: Math.floor(Math.random() * 5 + 1), // Optional: mock APR
//         borrowAPR: Math.floor(Math.random() * 5 + 3),
//         marketSize: parseFloat((coin.circulating_supply || 0).toFixed(2)),
//         marketSizeUSD: coin.market_cap || 0,
//         totalBorrowed: parseFloat((coin.total_volume / coin.current_price).toFixed(4)) || 0,
//         totalBorrowedUSD: coin.total_volume || 0,
//         walletBalance: 0, // Can be updated later from wallet
//         sparkline_in_7d: coin.sparkline_in_7d,
//         price_change_percentage_24h: coin.price_change_percentage_24h,
//         market_cap_rank: coin.market_cap_rank,
//         total_volume: coin.total_volume,
//         current_price: coin.current_price,
//       }));

//       setCoins(enrichedCoins);
//       setFilteredCoins(enrichedCoins);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter(
//         (coin) =>
//           coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <SummaryHeader />
//             <div className="flex justify-end mb-4">
//               <button
//                 onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
//                 className="px-3 py-1 bg-indigo-600 text-white rounded shadow"
//               >
//                 Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
//               </button>
//             </div>

//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             {viewMode === 'cards' ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredCoins.map((coin) => (
//                   <CoinCard
//                     key={coin.id}
//                     coin={coin}
//                     chartRange={chartRange}
//                     onTrade={handleTrade}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <AssetTable assets={filteredCoins} onTrade={handleTrade} />
//             )}
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// // App.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';
// import { AptosClient } from 'aptos';
// import { connectMartianWallet } from './utils/connectMartian';
// import NavBar from './components/NavBar';
// import ProfileDashboard from './components/ProfileDashboard';
// import CoinCard from './components/CoinCard';
// import Filters from './components/Filters';
// import BuySellModal from './components/BuySellModal';
// import AssetTable from './components/AssetTable';
// import SummaryHeader from './components/SummaryHeader';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function App() {
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('rank');
//   const [chartRange, setChartRange] = useState('7d');
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [aptosBalance, setAptosBalance] = useState(null);
//   const [profileTab, setProfileTab] = useState(false);
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
//   const [tradeType, setTradeType] = useState('buy');
//   const [viewMode, setViewMode] = useState('cards');

//   const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

//   const handleConnectWallet = async () => {
//     try {
//       const { address } = await connectMartianWallet();
//       setWalletAddress(address);
//       const res = await aptos.getAccountResources(address);
//       const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
//       const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//       setAptosBalance(balance);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
//         params: {
//           vs_currency: 'usd',
//           ids: coinList,
//           order: 'market_cap_desc',
//           sparkline: true,
//           price_change_percentage: '1h,24h,7d',
//         },
//       });
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter((coin) =>
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === 'volume') {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = (coin, isBuy) => {
//     setSelectedCoin(coin);
//     setTradeType(isBuy ? 'buy' : 'sell');
//     setIsBuyModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
//         <NavBar
//           walletAddress={walletAddress}
//           onConnect={handleConnectWallet}
//           profileTab={profileTab}
//           setProfileTab={setProfileTab}
//         />

//         {profileTab ? (
//           <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
//         ) : (
//           <>
//             <SummaryHeader />
//             <div className="flex justify-end mb-4">
//               <button
//                 onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
//                 className="px-3 py-1 bg-indigo-600 text-white rounded shadow"
//               >
//                 Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
//               </button>
//             </div>
//             <Filters
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//               chartRange={chartRange}
//               setChartRange={setChartRange}
//             />

//             {viewMode === 'cards' ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredCoins.map((coin) => (
//                   <CoinCard
//                     key={coin.id}
//                     coin={coin}
//                     chartRange={chartRange}
//                     onTrade={handleTrade}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <AssetTable coins={filteredCoins} onTrade={handleTrade} />
//             )}
//           </>
//         )}

//         {isBuyModalOpen && selectedCoin && (
//           <BuySellModal
//             coin={selectedCoin}
//             tradeType={tradeType}
//             onClose={() => setIsBuyModalOpen(false)}
//             walletAddress={walletAddress}
//             aptosClient={aptos}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { AptosClient } from 'aptos';
import { connectMartianWallet } from './utils/connectMartian';
import NavBar from './components/NavBar';
import ProfileDashboard from './components/ProfileDashboard';
import CoinCard from './components/CoinCard';
import Filters from './components/Filters';
import BuySellModal from './components/BuySellModal';
import AssetTable from './components/AssetTable';
import SummaryHeader from './components/SummaryHeader';

const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [chartRange, setChartRange] = useState('7d');
  const [walletAddress, setWalletAddress] = useState(null);
  const [aptosBalance, setAptosBalance] = useState(null);
  const [profileTab, setProfileTab] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState('buy');
  const [viewMode, setViewMode] = useState('cards');

  const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

  const handleConnectWallet = async () => {
    try {
      const { address } = await connectMartianWallet();
      setWalletAddress(address);
      const res = await aptos.getAccountResources(address);
      const coinStore = res.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
      const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
      setAptosBalance(balance);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinList,
          order: 'market_cap_desc',
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
        },
      });
      setCoins(res.data);
      setFilteredCoins(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...coins];
    if (searchTerm) {
      data = data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === 'volume') {
      data.sort((a, b) => b.total_volume - a.total_volume);
    } else {
      data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    }
    setFilteredCoins(data);
  }, [searchTerm, sortBy, coins]);

  const handleTrade = (coin, isBuy) => {
    setSelectedCoin(coin);
    setTradeType(isBuy ? 'buy' : 'sell');
    setIsBuyModalOpen(true);
  };

  // 👉 Compute stats for SummaryHeader
  const marketSize = filteredCoins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  const totalBorrowed = filteredCoins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
  const lentOut = marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : 0;

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
        <NavBar
          walletAddress={walletAddress}
          onConnect={handleConnectWallet}
          profileTab={profileTab}
          setProfileTab={setProfileTab}
        />

        {profileTab ? (
          <ProfileDashboard walletAddress={walletAddress} aptosBalance={aptosBalance} />
        ) : (
          <>
            <SummaryHeader
              marketSize={marketSize}
              totalBorrowed={totalBorrowed}
              lentOut={lentOut}
            />

            <div className="flex justify-end mb-4">
              <button
                onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
                className="px-3 py-1 bg-indigo-600 text-white rounded shadow"
              >
                Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
              </button>
            </div>

            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              chartRange={chartRange}
              setChartRange={setChartRange}
            />

            {viewMode === 'cards' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCoins.map((coin) => (
                  <CoinCard
                    key={coin.id}
                    coin={coin}
                    chartRange={chartRange}
                    onTrade={handleTrade}
                  />
                ))}
              </div>
            ) : (
              <AssetTable coins={filteredCoins} onTrade={handleTrade} />
            )}
          </>
        )}

        {isBuyModalOpen && selectedCoin && (
          <BuySellModal
            coin={selectedCoin}
            tradeType={tradeType}
            onClose={() => setIsBuyModalOpen(false)}
            walletAddress={walletAddress}
            aptosClient={aptos}
          />
        )}
      </div>
    </div>
  );
}

export default App;
