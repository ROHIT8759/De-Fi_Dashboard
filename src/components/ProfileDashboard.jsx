// // src/components/ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { AptosClient } from 'aptos';
// import GetTrans

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// function ProfileDashboard({ walletAddress, aptosBalance }) {
//   const [nfts, setNfts] = useState([]);
//   const [tokens, setTokens] = useState([]);

//   useEffect(() => {
//     if (!walletAddress) return;

//     const fetchAssets = async () => {
//       try {
//         const resources = await aptos.getAccountResources(walletAddress);

//         // Fetch token balances (excluding AptosCoin)
//         const tokenBalances = resources.filter(
//           (r) =>
//             r.type.startsWith('0x1::coin::CoinStore') &&
//             !r.type.includes('aptos_coin::AptosCoin')
//         );

//         const parsedTokens = tokenBalances.map((t) => {
//           const type = t.type.split('<')[1]?.replace('>', '');
//           return {
//             type,
//             balance: parseInt(t.data.coin.value) / 1e8,
//           };
//         });

//         setTokens(parsedTokens);

//         // Dummy NFT parser (can be replaced with real NFT indexing service)
//         const nftResources = resources.filter((r) =>
//           r.type.toLowerCase().includes('token') &&
//           JSON.stringify(r.data).toLowerCase().includes('uri')
//         );

//         setNfts(nftResources.map((n, i) => ({ name: `NFT #${i + 1}`, data: n.data })));
//       } catch (err) {
//         console.error('Failed to load on-chain assets:', err);
//       }
//     };

//     fetchAssets();
//   }, [walletAddress]);

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold mb-2">🪙 Tokens</h3>
//         {tokens.length > 0 ? (
//           <ul className="list-disc ml-6 text-sm">
//             {tokens.map((token, index) => (
//               <li key={index}>
//                 <strong>{token.type}</strong>: {token.balance}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm">No other tokens found.</p>
//         )}
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold mb-2">🖼️ NFTs</h3>
//         {nfts.length > 0 ? (
//           <ul className="list-disc ml-6 text-sm">
//             {nfts.map((nft, index) => (
//               <li key={index}>
//                 <strong>{nft.name}</strong>: {nft.data?.uri || 'No URI'}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm">No NFTs found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfileDashboard;




// import React, { useEffect, useState } from 'react';
// import { fetchTransactionHistory } from '../utils/getTransactions';
// import { fetchNFTs } from '../utils/getNFTs';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [nfts, setNfts] = useState([]);

//   useEffect(() => {
//     const loadOnChainData = async () => {
//       if (!walletAddress) return;

//       const txs = await fetchTransactionHistory(walletAddress);
//       setTransactions(txs.slice(0, 10)); // Show last 10 txns

//       const rawNfts = await fetchNFTs(walletAddress);
//       const metadata = rawNfts.map((nft) => {
//         const uri = nft.data?.token_data?.uri || nft.data?.uri;
//         return {
//           name: nft.data?.token_data?.name || 'Unknown NFT',
//           uri,
//         };
//       }).filter(nft => nft.uri?.startsWith('http') || nft.uri?.includes('ipfs'));

//       setNfts(metadata);
//     };

//     loadOnChainData();
//   }, [walletAddress]);

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       {/* NFT Gallery */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">🎨 NFTs</h3>
//         {nfts.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {nfts.map((nft, index) => (
//               <div key={index} className="bg-white dark:bg-gray-700 rounded p-2">
//                 <img
//                   src={nft.uri}
//                   alt={nft.name}
//                   className="w-full h-32 object-cover rounded"
//                   onError={(e) => (e.target.style.display = 'none')}
//                 />
//                 <p className="mt-1 text-sm text-center">{nft.name}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No NFTs found.</p>
//         )}
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">🧾 Recent Transactions</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700 text-left">
//                 <th className="p-2">Hash</th>
//                 <th className="p-2">Type</th>
//                 <th className="p-2">Success</th>
//                 <th className="p-2">Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((txn, index) => (
//                 <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
//                   <td className="p-2 truncate max-w-[120px]">
//                     <a
//                       href={`https://explorer.aptoslabs.com/txn/${txn.hash}?network=mainnet`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       {txn.hash.slice(0, 6)}...{txn.hash.slice(-4)}
//                     </a>
//                   </td>
//                   <td className="p-2">{txn.type}</td>
//                   <td className="p-2">{txn.success ? '✅' : '❌'}</td>
//                   <td className="p-2">{new Date(txn.timestamp / 1000).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;




// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ProfileDashboard({ walletAddress, aptosBalance, aptosClient }) {
//   const [transactions, setTransactions] = useState([]);
//   const [nfts, setNfts] = useState([]);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch Aptos transactions
//   useEffect(() => {
//     if (!walletAddress) return;
//     const fetchTxs = async () => {
//       try {
//         const res = await axios.get(
//           `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions?limit=10`
//         );
//         setTransactions(res.data);
//       } catch (err) {
//         console.error('Error fetching tx history:', err);
//       }
//     };
//     fetchTxs();
//   }, [walletAddress]);

//   // Fetch NFTs
//   useEffect(() => {
//     if (!walletAddress || !aptosClient) return;
//     const fetchNFTs = async () => {
//       try {
//         const resources = await aptosClient.getAccountResources(walletAddress);
//         const tokens = resources.filter((r) =>
//           r.type.startsWith('0x3::token::TokenStore')
//         );
//         setNfts(tokens);
//       } catch (err) {
//         console.error('Error fetching NFTs:', err);
//       }
//     };
//     fetchNFTs();
//   }, [walletAddress, aptosClient]);

//   const handleTransfer = async () => {
//     if (!walletAddress || !transferAddress || !amount) return;
//     setLoading(true);
//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x1::coin::transfer',
//         type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         arguments: [transferAddress, Math.floor(parseFloat(amount) * 1e8)],
//       };
//       const tx = await window.martian.generateTransaction(walletAddress, payload);
//       const signed = await window.martian.signAndSubmitTransaction(tx);
//       alert('✅ Token sent! Tx: ' + signed.hash);
//     } catch (e) {
//       alert('❌ Failed: ' + e.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">🔁 Send Tokens</h3>
//         <div className="flex gap-2">
//           <input
//             placeholder="Recipient Address"
//             className="p-2 border rounded w-full"
//             value={transferAddress}
//             onChange={(e) => setTransferAddress(e.target.value)}
//           />
//           <input
//             placeholder="Amount (APT)"
//             className="p-2 border rounded w-32"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <button
//             onClick={handleTransfer}
//             className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
//             disabled={loading}
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2">🧾 Transaction History</h3>
//         <ul className="text-sm space-y-2 max-h-60 overflow-auto">
//           {transactions.map((tx, idx) => (
//             <li key={idx} className="bg-white dark:bg-gray-700 p-2 rounded">
//               <a
//                 href={`https://explorer.aptoslabs.com/txn/${tx.hash}`} 
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 dark:text-blue-400"
//               >
//                 Tx Hash: {tx.hash.slice(0, 10)}...
//               </a>
//               <p>Status: {tx.success ? '✅ Success' : '❌ Failed'}</p>
//               <p>Type: {tx.type}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2">🌟 NFTs</h3>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {nfts.map((nft, idx) => (
//             <div key={idx} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
//               <p className="font-bold">ID: {nft.type.split('::').pop()}</p>
//               <p className="text-sm">Type: {nft.type}</p>
//               {nft.data.uri && nft.data.uri.startsWith('http') && (
//                 <img
//                   src={nft.data.uri}
//                   alt="NFT preview"
//                   className="mt-2 w-full h-40 object-contain rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileDashboard;




// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { AptosClient, BCS, TxnBuilderTypes } from 'aptos';

// const aptosClient = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [nfts, setNfts] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [stakingAmount, setStakingAmount] = useState('');

//   // Fetch NFTs
//   useEffect(() => {
//     const fetchNFTs = async () => {
//       if (!walletAddress) return;
//       try {
//         const res = await fetch(`https://aptos-mainnet.nodereal.io/v1/accounts/${walletAddress}/resources`);
//         const data = await res.json();
//         const tokens = data?.data?.filter((r) => r.type.includes('0x3::token::TokenStore')) || [];
//         setNfts(tokens);
//       } catch (err) {
//         console.error('Failed to load NFTs:', err);
//       }
//     };
//     fetchNFTs();
//   }, [walletAddress]);

//   // Fetch transaction history
//   useEffect(() => {
//     const fetchTxs = async () => {
//       if (!walletAddress) return;
//       try {
//         const res = await fetch(`https://explorer-api.mainnet.aptoslabs.com/accounts/${walletAddress}/transactions?limit=10`);
//         const txs = await res.json();
//         setTransactions(txs);
//       } catch (err) {
//         console.error('Failed to load transactions:', err);
//       }
//     };
//     fetchTxs();
//   }, [walletAddress]);

//   // NFT Transfer logic
//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress) return alert('Fill all fields');
//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };
//       const txnReq = await aptosClient.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.martian.signAndSubmitTransaction(txnReq);
//       alert('NFT transferred successfully');
//     } catch (err) {
//       alert('Transfer failed');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       {/* NFT Listing */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">🎨 Your NFTs</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nfts.map((nft, i) => (
//           <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl">
//             <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//             <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//             <button
//               onClick={() => setSelectedToken(nft.data)}
//               className="mt-2 px-2 py-1 text-sm bg-indigo-600 text-white rounded"
//             >
//               Select for Transfer
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* NFT Transfer */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold mb-2">🧾 Transfer Selected NFT</h4>
//         <input
//           type="text"
//           placeholder="Recipient address"
//           value={transferAddress}
//           onChange={(e) => setTransferAddress(e.target.value)}
//           className="p-2 border rounded w-full md:w-2/3 mb-2 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleNftTransfer}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Send NFT
//         </button>
//       </div>

//       {/* Staking Placeholder */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">🏦 Staking / Yield Farming</h4>
//         <select className="p-2 border rounded mb-2 dark:bg-gray-700">
//           <option value="">Select Protocol</option>
//           <option value="tortuga">Tortuga</option>
//           <option value="ditto">Ditto</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Amount to stake"
//           value={stakingAmount}
//           onChange={(e) => setStakingAmount(e.target.value)}
//           className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-700"
//         />
//         <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded">
//           Stake
//         </button>
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">📜 Recent Transactions</h4>
//         <ul className="text-sm space-y-2">
//           {transactions.map((tx, i) => (
//             <li key={i} className="truncate border-b pb-1">
//               ✅ {tx.hash.slice(0, 10)}... — {tx.type} — {new Date(tx.timestamp / 1000).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;




// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { AptosClient } from 'aptos';
// import axios from 'axios';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [nfts, setNfts] = useState([]);
//   const [recipient, setRecipient] = useState('');
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [stakingTab, setStakingTab] = useState(false);

//   useEffect(() => {
//     const fetchTx = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions`
//         );
//         setTransactions(res.data.slice(0, 10));
//       } catch (e) {
//         console.error('Failed to load transactions', e);
//       }
//     };

//     const fetchNFTs = async () => {
//       try {
//         const res = await aptos.getAccountResources(walletAddress);
//         const tokens = res.filter((r) => r.type.includes('0x3::token::Token')); // adjust if using new metadata standard
//         setNfts(tokens);
//       } catch (e) {
//         console.error('Failed to load NFTs', e);
//       }
//     };

//     if (walletAddress) {
//       fetchTx();
//       fetchNFTs();
//     }
//   }, [walletAddress]);

//   const handleTransferNFT = async () => {
//     if (!recipient || !selectedToken) return alert('Missing recipient or token');
//     try {
//       const txn = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::direct_transfer_script',
//         type_arguments: [],
//         arguments: [walletAddress, recipient, selectedToken.data.id.token_data_id.name, 1],
//       };
//       const response = await window.martian.signAndSubmitTransaction(txn);
//       alert('Transfer submitted: ' + response.hash);
//     } catch (e) {
//       console.error('Transfer failed', e);
//       alert('Failed to transfer NFT');
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//         <button onClick={() => setStakingTab(!stakingTab)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">
//           {stakingTab ? '📦 View NFTs' : '🏦 Staking' }
//         </button>
//       </div>

//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       {stakingTab ? (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold">🔐 Staking Options</h3>
//           <p className="text-gray-500 mb-4">Coming soon: Integration with Tortuga and Ditto staking protocols</p>
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="p-4 border rounded">
//               <h4 className="font-bold">Tortuga Staking</h4>
//               <p>Earn tAPT for APT deposits</p>
//               <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Stake</button>
//             </div>
//             <div className="p-4 border rounded">
//               <h4 className="font-bold">Ditto Staking</h4>
//               <p>Stake APT to receive stAPT</p>
//               <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Stake</button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* NFTs */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">🖼️ Your NFTs</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {nfts.map((nft, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setSelectedToken(nft)}
//                   className={`p-2 border rounded cursor-pointer ${
//                     selectedToken === nft ? 'border-blue-500' : ''
//                   }`}
//                 >
//                   <p className="text-sm font-semibold truncate">{nft.data.id.token_data_id.name}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 flex flex-col md:flex-row gap-2">
//               <input
//                 type="text"
//                 placeholder="Recipient address"
//                 className="p-2 border rounded w-full h-12 text-black"
//                 value={recipient}
//                 onChange={(e) => setRecipient(e.target.value)}
//               />
//               <button
//                 onClick={handleTransferNFT}
//                 className="h-12 bg-purple-600 text-white px-4 py-0 rounded"
//               >
//                 Transfer NFT
//               </button>
//             </div>
//           </div>

//           {/* Transaction History */}
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-2">🧾 Recent Transactions</h3>
//             <ul className="list-disc ml-6">
//               {transactions.map((tx, i) => (
//                 <li key={i} className="text-sm">
//                   {tx.type} - {tx.version} - {tx.timestamp}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProfileDashboard;



// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';


// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);

//   useEffect(() => {
//     const getTokenData = async () => {
//       if (!walletAddress) return;
//       const tokenList = await fetchTokenBalances(walletAddress);
//       setTokens(tokenList);
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         const data = await res.json();
//         setApr(data.apr);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//       }
//     };

//     getTokenData();
//     getTortugaAPR();
//   }, [walletAddress]);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-black dark:text-white">
//       <h1 className="text-2xl font-bold mb-4">🚀 Wallet Dashboard</h1>

//       <div className="mb-6">
//         <p className="text-sm text-gray-400">Wallet Address:</p>
//         <p className="font-mono break-all text-blue-500">{walletAddress}</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">💰 APT Balance</h2>
//           <p className="text-2xl font-bold">{aptosBalance?.toFixed(4)} APT</p>
//         </div>

//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-2xl font-bold text-green-500">{apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}</p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//         <ul className="divide-y divide-gray-300 dark:divide-gray-700 text-sm">
//           {tokens.map((token, idx) => (
//             <li key={idx} className="py-2">
//               <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance.toFixed(4)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;



// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);

//   useEffect(() => {
//     const getTokenData = async () => {
//       if (!walletAddress) return;
//       const tokenList = await fetchTokenBalances(walletAddress);
//       setTokens(tokenList);
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         const data = await res.json();
//         setApr(data.apr);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//       }
//     };

//     getTokenData();
//     getTortugaAPR();
//   }, [walletAddress]);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-black dark:text-white">
//       <h1 className="text-2xl font-bold mb-4">🚀 Wallet Dashboard</h1>

//       <div className="mb-6">
//         <p className="text-sm text-gray-400">Wallet Address:</p>
//         <p className="font-mono break-all text-blue-500">{walletAddress}</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">💰 APT Balance</h2>
//           <p className="text-2xl font-bold">{aptosBalance?.toFixed(4)} APT</p>
//         </div>

//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-2xl font-bold text-green-500">{apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}</p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//         <ul className="divide-y divide-gray-300 dark:divide-gray-700 text-sm">
//           {tokens.map((token, idx) => (
//             <li key={idx} className="py-2">
//               <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance.toFixed(4)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;




// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [stakingAmount, setStakingAmount] = useState('');
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const getTokenData = async () => {
//       if (!walletAddress) return;
//       const tokenList = await fetchTokenBalances(walletAddress);
//       setTokens(tokenList);
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         const data = await res.json();
//         setApr(data.apr);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//       }
//     };

//     getTokenData();
//     getTortugaAPR();
//   }, [walletAddress]);

//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress) return alert('Fill all fields');
//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };
//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.martian.signAndSubmitTransaction(txnReq);
//       alert('NFT transferred successfully');
//     } catch (err) {
//       alert('Transfer failed');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       {/* APT & APR */}
//       <div className="grid gap-6 md:grid-cols-2 my-6">
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-2xl font-bold text-green-500">{apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}</p>
//         </div>
//       </div>

//       {/* Token Balances */}
//       <div className="mt-6">
//         <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//         <ul className="divide-y divide-gray-300 dark:divide-gray-700 text-sm">
//           {tokens.map((token, idx) => (
//             <li key={idx} className="py-2">
//               <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance.toFixed(4)}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* NFT Listing */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">🎨 Your NFTs</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nfts.map((nft, i) => (
//           <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl">
//             <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//             <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//             <button
//               onClick={() => setSelectedToken(nft.data)}
//               className="mt-2 px-2 py-1 text-sm bg-indigo-600 text-white rounded"
//             >
//               Select for Transfer
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* NFT Transfer */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold mb-2">🧾 Transfer Selected NFT</h4>
//         <input
//           type="text"
//           placeholder="Recipient address"
//           value={transferAddress}
//           onChange={(e) => setTransferAddress(e.target.value)}
//           className="p-2 border rounded w-full md:w-2/3 mb-2 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleNftTransfer}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Send NFT
//         </button>
//       </div>

//       {/* Staking Placeholder */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">🏦 Staking / Yield Farming</h4>
//         <select className="p-2 border rounded mb-2 dark:bg-gray-700">
//           <option value="">Select Protocol</option>
//           <option value="tortuga">Tortuga</option>
//           <option value="ditto">Ditto</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Amount to stake"
//           value={stakingAmount}
//           onChange={(e) => setStakingAmount(e.target.value)}
//           className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-700"
//         />
//         <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded">
//           Stake
//         </button>
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">📜 Recent Transactions</h4>
//         <ul className="text-sm space-y-2">
//           {transactions.map((tx, i) => (
//             <li key={i} className="truncate border-b pb-1">
//               ✅ {tx.hash.slice(0, 10)}... — {tx.type} — {new Date(tx.timestamp / 1000).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;



// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [stakingAmount, setStakingAmount] = useState('');
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const getTokenData = async () => {
//       if (!walletAddress) return;
//       const tokenList = await fetchTokenBalances(walletAddress);
//       setTokens(tokenList);
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         const data = await res.json();
//         setApr(data.apr);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//       }
//     };

//     const getNFTs = async () => {
//       try {
//         const res = await fetch(`https://indexer.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resources`);
//         const resources = await res.json();
//         const ownedTokens = resources.filter(r => r.type.includes('TokenStore') || r.type.includes('token::TokenStore'));
//         const nftData = ownedTokens.flatMap((r) => {
//           const tokens = r.data?.tokens?.data || [];
//           return tokens.map((t) => ({ data: t?.value }));
//         });
//         setNfts(nftData);
//       } catch (err) {
//         console.error('NFT fetch failed:', err);
//       }
//     };

//     const getTransactions = async () => {
//       try {
//         const res = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions?limit=10`);
//         const data = await res.json();
//         setTransactions(data);
//       } catch (err) {
//         console.error('Failed to fetch transactions:', err);
//       }
//     };

//     getTokenData();
//     getTortugaAPR();
//     getNFTs();
//     getTransactions();
//   }, [walletAddress]);

//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress) return alert('Fill all fields');
//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };
//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnReq);
//       alert('NFT transferred successfully');
//     } catch (err) {
//       alert('Transfer failed');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       <div className="grid gap-6 md:grid-cols-2 mt-4">
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-xl font-bold text-green-500">{apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}</p>
//         </div>
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//           <ul className="text-sm">
//             {tokens.map((token, idx) => (
//               <li key={idx} className="py-1">
//                 <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance.toFixed(4)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* NFT Listing */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">🎨 Your NFTs</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nfts.map((nft, i) => (
//           <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl">
//             <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//             <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//             <button
//               onClick={() => setSelectedToken(nft.data)}
//               className="mt-2 px-2 py-1 text-sm bg-indigo-600 text-white rounded"
//             >
//               Select for Transfer
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* NFT Transfer */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold mb-2">🧾 Transfer Selected NFT</h4>
//         <input
//           type="text"
//           placeholder="Recipient address"
//           value={transferAddress}
//           onChange={(e) => setTransferAddress(e.target.value)}
//           className="p-2 border rounded w-full md:w-2/3 mb-2 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleNftTransfer}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Send NFT
//         </button>
//       </div>

//       {/* Staking Placeholder */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">🏦 Staking / Yield Farming</h4>
//         <select className="p-2 border rounded mb-2 dark:bg-gray-700">
//           <option value="">Select Protocol</option>
//           <option value="tortuga">Tortuga</option>
//           <option value="ditto">Ditto</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Amount to stake"
//           value={stakingAmount}
//           onChange={(e) => setStakingAmount(e.target.value)}
//           className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-700"
//         />
//         <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded">
//           Stake
//         </button>
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">📜 Recent Transactions</h4>
//         <ul className="text-sm space-y-2">
//           {transactions.map((tx, i) => (
//             <li key={i} className="truncate border-b pb-1">
//               ✅ {tx.hash.slice(0, 10)}... — {tx.type} — {new Date(tx.timestamp / 1000).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;



// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [stakingAmount, setStakingAmount] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [stakingProtocol, setStakingProtocol] = useState('');

//   useEffect(() => {
//     const getTokenData = async () => {
//       if (!walletAddress) return;
//       const tokenList = await fetchTokenBalances(walletAddress);
//       setTokens(tokenList);
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         const data = await res.json();
//         setApr(data.apr);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//       }
//     };

//     const getNFTs = async () => {
//       try {
//         const res = await fetch(`https://indexer.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resources`);
//         const resources = await res.json();
//         const ownedTokens = resources.filter(r => r.type.includes('TokenStore') || r.type.includes('token::TokenStore'));
//         const nftData = ownedTokens.flatMap((r) => {
//           const tokens = r.data?.tokens?.data || [];
//           return tokens.map((t) => ({ data: t?.value }));
//         });
//         setNfts(nftData);
//       } catch (err) {
//         console.error('NFT fetch failed:', err);
//       }
//     };

//     const getTransactions = async () => {
//       try {
//         const res = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions?limit=10`);
//         const data = await res.json();
//         setTransactions(data);
//       } catch (err) {
//         console.error('Failed to fetch transactions:', err);
//       }
//     };

//     getTokenData();
//     getTortugaAPR();
//     getNFTs();
//     getTransactions();
//   }, [walletAddress]);

//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress) return alert('Fill all fields');
//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };
//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnReq);
//       alert('NFT transferred successfully');
//     } catch (err) {
//       alert('Transfer failed');
//       console.error(err);
//     }
//   };

//   const handleStaking = async () => {
//     if (!walletAddress || !stakingAmount || !stakingProtocol) return alert('Fill all fields');
//     try {
//       const amount = parseInt(parseFloat(stakingAmount) * 1e8); // 8 decimals for APT

//       let payload;
//       if (stakingProtocol === 'tortuga') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x5d7dc21486b0c96a7a63708943506b18853c4f7ee7bb372617b78a6be0a4f46d::stake::stake_entry',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else if (stakingProtocol === 'ditto') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x7ce7d8a0cfc297c4b91f4171ed479fdc3b68949d32d7b564d1cc438e57f16b0b::staking::stake',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else {
//         return alert('Invalid staking protocol');
//       }

//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnReq);
//       alert('Staked successfully');
//     } catch (err) {
//       alert('Staking failed');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

//       <div className="grid gap-6 md:grid-cols-2 mt-4">
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-xl font-bold text-green-500">{apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}</p>
//         </div>
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//           <ul className="text-sm">
//             {tokens.map((token, idx) => (
//               <li key={idx} className="py-1">
//                 <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance.toFixed(4)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* NFT Listing */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">🎨 Your NFTs</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nfts.map((nft, i) => (
//           <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl">
//             <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//             <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//             <button
//               onClick={() => setSelectedToken(nft.data)}
//               className="mt-2 px-2 py-1 text-sm bg-indigo-600 text-white rounded"
//             >
//               Select for Transfer
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* NFT Transfer */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold mb-2">🧾 Transfer Selected NFT</h4>
//         <input
//           type="text"
//           placeholder="Recipient address"
//           value={transferAddress}
//           onChange={(e) => setTransferAddress(e.target.value)}
//           className="p-2 border rounded w-full md:w-2/3 mb-2 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleNftTransfer}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Send NFT
//         </button>
//       </div>

//       {/* Staking Form */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">🏦 Staking / Yield Farming</h4>
//         <select
//           value={stakingProtocol}
//           onChange={(e) => setStakingProtocol(e.target.value)}
//           className="p-2 border rounded mb-2 dark:bg-gray-700"
//         >
//           <option value="">Select Protocol</option>
//           <option value="tortuga">Tortuga</option>
//           <option value="ditto">Ditto</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Amount to stake"
//           value={stakingAmount}
//           onChange={(e) => setStakingAmount(e.target.value)}
//           className="p-2 border rounded w-full md:w-1/3 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleStaking}
//           className="ml-2 px-4 py-2 bg-purple-600 text-white rounded"
//         >
//           Stake
//         </button>
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">📜 Recent Transactions</h4>
//         <ul className="text-sm space-y-2">
//           {transactions.map((tx, i) => (
//             <li key={i} className="truncate border-b pb-1">
//               ✅ {tx.hash.slice(0, 10)}... — {tx.type} — {new Date(tx.timestamp / 1000).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;



// // ProfileDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchAptosBalance, fetchTokenBalances } from '../utils/fetchBalances';

// const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [stakingAmount, setStakingAmount] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [stakingProtocol, setStakingProtocol] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!walletAddress) return;

//     const getTokenData = async () => {
//       try {
//         setLoading(true);
//         const tokenList = await fetchTokenBalances(walletAddress);
//         setTokens(tokenList || []);
//       } catch (err) {
//         console.error('Failed to fetch tokens:', err);
//         setError('Failed to fetch token data');
//       }
//     };

//     const getTortugaAPR = async () => {
//       try {
//         const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//         if (!res.ok) throw new Error('APR fetch failed');
//         const data = await res.json();
//         setApr(data.apr || data);
//       } catch (err) {
//         console.error('Failed to fetch APR:', err);
//         setApr(0); // Set default value instead of null
//       }
//     };

//     const getNFTs = async () => {
//       try {
//         const res = await fetch(`https://indexer.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/resources`);
//         if (!res.ok) throw new Error('NFT fetch failed');
//         const resources = await res.json();
        
//         // More robust NFT parsing
//         const ownedTokens = resources.filter(r => 
//           r.type && (r.type.includes('TokenStore') || r.type.includes('token::TokenStore'))
//         );
        
//         const nftData = ownedTokens.flatMap((r) => {
//           const tokens = r.data?.tokens?.data || [];
//           return tokens.map((t) => ({
//             data: {
//               ...t?.value,
//               token_id: t?.value?.token_id || `nft_${Math.random()}`,
//               token_name: t?.value?.token_name || 'Unnamed NFT'
//             }
//           }));
//         });
        
//         setNfts(nftData || []);
//       } catch (err) {
//         console.error('NFT fetch failed:', err);
//         setNfts([]);
//       }
//     };

//     const getTransactions = async () => {
//       try {
//         const res = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions?limit=10`);
//         if (!res.ok) throw new Error('Transaction fetch failed');
//         const data = await res.json();
//         setTransactions(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error('Failed to fetch transactions:', err);
//         setTransactions([]);
//       }
//     };

//     // Execute all async functions
//     Promise.all([
//       getTokenData(),
//       getTortugaAPR(),
//       getNFTs(),
//       getTransactions()
//     ]).finally(() => {
//       setLoading(false);
//     });

//   }, [walletAddress]);

//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress) {
//       alert('Please fill all fields');
//       return;
//     }

//     // Validate address format (basic check)
//     if (transferAddress.length !== 66 && !transferAddress.startsWith('0x')) {
//       alert('Invalid recipient address format');
//       return;
//     }

//     try {
//       // Check if window.aptos exists
//       if (!window.aptos) {
//         alert('Aptos wallet not detected. Please install and connect your wallet.');
//         return;
//       }

//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };

//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnReq);
      
//       alert('NFT transferred successfully');
//       setSelectedToken(null);
//       setTransferAddress('');
//     } catch (err) {
//       alert(`Transfer failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   const handleStaking = async () => {
//     if (!walletAddress || !stakingAmount || !stakingProtocol) {
//       alert('Please fill all fields');
//       return;
//     }

//     if (isNaN(stakingAmount) || parseFloat(stakingAmount) <= 0) {
//       alert('Please enter a valid staking amount');
//       return;
//     }

//     try {
//       // Check if window.aptos exists
//       if (!window.aptos) {
//         alert('Aptos wallet not detected. Please install and connect your wallet.');
//         return;
//       }

//       const amount = Math.floor(parseFloat(stakingAmount) * 1e8); // 8 decimals for APT

//       let payload;
//       if (stakingProtocol === 'tortuga') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x5d7dc21486b0c96a7a63708943506b18853c4f7ee7bb372617b78a6be0a4f46d::stake::stake_entry',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else if (stakingProtocol === 'ditto') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x7ce7d8a0cfc297c4b91f4171ed479fdc3b68949d32d7b564d1cc438e57f16b0b::staking::stake',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else {
//         alert('Invalid staking protocol');
//         return;
//       }

//       const txnReq = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnReq);
      
//       alert('Staked successfully');
//       setStakingAmount('');
//       setStakingProtocol('');
//     } catch (err) {
//       alert(`Staking failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//         <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//         <p>Loading wallet data...</p>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//         <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
//       <p>📬 Address: {walletAddress}</p>
//       <p>💸 Aptos Balance: {aptosBalance ? aptosBalance.toFixed(4) : '0.0000'} APT</p>

//       <div className="grid gap-6 md:grid-cols-2 mt-4">
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h2>
//           <p className="text-xl font-bold text-green-500">
//             {apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}
//           </p>
//         </div>
//         <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//           <h2 className="font-semibold text-lg mb-2">🪙 Token Balances</h2>
//           <ul className="text-sm">
//             {tokens.length > 0 ? (
//               tokens.map((token, idx) => (
//                 <li key={idx} className="py-1">
//                   <span className="font-mono text-indigo-500">{token.tokenType}</span>: {token.balance ? token.balance.toFixed(4) : '0.0000'}
//                 </li>
//               ))
//             ) : (
//               <li className="py-1 text-gray-500">No tokens found</li>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* NFT Listing */}
//       <h3 className="text-xl font-semibold mt-6 mb-2">🎨 Your NFTs</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nfts.length > 0 ? (
//           nfts.map((nft, i) => (
//             <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-xl">
//               <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//               <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//               <button
//                 onClick={() => setSelectedToken(nft.data)}
//                 className="mt-2 px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
//               >
//                 Select for Transfer
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No NFTs found</p>
//         )}
//       </div>

//       {/* NFT Transfer */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold mb-2">🧾 Transfer Selected NFT</h4>
//         {selectedToken && (
//           <p className="text-sm text-green-600 mb-2">
//             Selected: {selectedToken.token_name || 'Unnamed NFT'}
//           </p>
//         )}
//         <input
//           type="text"
//           placeholder="Recipient address (0x...)"
//           value={transferAddress}
//           onChange={(e) => setTransferAddress(e.target.value)}
//           className="p-2 border rounded w-full md:w-2/3 mb-2 dark:bg-gray-700"
//         />
//         <button
//           onClick={handleNftTransfer}
//           disabled={!selectedToken}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 hover:bg-green-700"
//         >
//           Send NFT
//         </button>
//       </div>

//       {/* Staking Form */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">🏦 Staking / Yield Farming</h4>
//         <div className="flex flex-col md:flex-row gap-2">
//           <select
//             value={stakingProtocol}
//             onChange={(e) => setStakingProtocol(e.target.value)}
//             className="p-2 border rounded dark:bg-gray-700"
//           >
//             <option value="">Select Protocol</option>
//             <option value="tortuga">Tortuga</option>
//             <option value="ditto">Ditto</option>
//           </select>
//           <input
//             type="number"
//             step="0.0001"
//             min="0"
//             placeholder="Amount to stake"
//             value={stakingAmount}
//             onChange={(e) => setStakingAmount(e.target.value)}
//             className="p-2 border rounded flex-1 dark:bg-gray-700"
//           />
//           <button
//             onClick={handleStaking}
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//           >
//             Stake
//           </button>
//         </div>
//       </div>

//       {/* Transaction History */}
//       <div className="mt-6">
//         <h4 className="text-lg font-semibold mb-2">📜 Recent Transactions</h4>
//         <ul className="text-sm space-y-2">
//           {transactions.length > 0 ? (
//             transactions.map((tx, i) => (
//               <li key={i} className="truncate border-b pb-1">
//                 ✅ {tx.hash?.slice(0, 10)}... — {tx.type} — {
//                   tx.timestamp ? new Date(parseInt(tx.timestamp) / 1000).toLocaleString() : 'Unknown time'
//                 }
//               </li>
//             ))
//           ) : (
//             <li className="text-gray-500">No recent transactions</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;



// import React, { useEffect, useState } from 'react';
// import aptosClient from '../utils/aptosClient';


// const ProfileDashboard = ({ walletAddress, aptosBalance, connectedWallet }) => {
//   const [tokens, setTokens] = useState([]);
//   const [apr, setApr] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [transferAddress, setTransferAddress] = useState('');
//   const [stakingAmount, setStakingAmount] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [stakingProtocol, setStakingProtocol] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ELEGENT Card specific states
//   const [trustScore, setTrustScore] = useState(null);
//   const [activeLoans, setActiveLoans] = useState([]);
//   const [loanHistory, setLoanHistory] = useState([]);
//   const [borrowAmount, setBorrowAmount] = useState('');
//   const [borrowDuration, setBorrowDuration] = useState(7);
//   const [repayLoanId, setRepayLoanId] = useState('');
//   const [repayAmount, setRepayAmount] = useState('');
//   const [activeTab, setActiveTab] = useState('overview'); // overview, loans, staking, nfts

//   useEffect(() => {
//     if (!walletAddress) return;

//     const loadUserData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Load traditional DeFi data
//         await Promise.all([
//           getTokenData(),
//           getTortugaAPR(),
//           getNFTs(),
//           getTransactions(),
//           // ELEGENT Card specific data
//           getTrustScoreData(),
//           getActiveLoans(),
//           getLoanHistory()
//         ]);
//       } catch (err) {
//         console.error('Error loading user data:', err);
//         setError('Failed to load user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserData();
//   }, [walletAddress]);

//   // Traditional DeFi functions (existing)
//   const getTokenData = async () => {
//     try {
//       // You can implement this using aptosClient if needed
//       const resources = await aptosClient.getAccountResources(walletAddress);
//       const tokenResources = resources.filter(r => 
//         r.type.includes('coin::CoinStore') && 
//         !r.type.includes('aptos_coin::AptosCoin')
//       );
      
//       const tokenList = tokenResources.map(resource => ({
//         tokenType: resource.type.split('<')[1]?.replace('>', '') || 'Unknown',
//         balance: parseInt(resource.data.coin.value) / 1e8
//       }));
      
//       setTokens(tokenList || []);
//     } catch (err) {
//       console.error('Failed to fetch tokens:', err);
//     }
//   };

//   const getTortugaAPR = async () => {
//     try {
//       const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
//       if (!res.ok) throw new Error('APR fetch failed');
//       const data = await res.json();
//       setApr(data.apr || data);
//     } catch (err) {
//       console.error('Failed to fetch APR:', err);
//       setApr(0);
//     }
//   };

//   const getNFTs = async () => {
//     try {
//       const resources = await aptosClient.getAccountResources(walletAddress);
//       const ownedTokens = resources.filter(r => 
//         r.type && (r.type.includes('TokenStore') || r.type.includes('token::TokenStore'))
//       );
      
//       const nftData = ownedTokens.flatMap((r) => {
//         const tokens = r.data?.tokens?.data || [];
//         return tokens.map((t) => ({
//           data: {
//             ...t?.value,
//             token_id: t?.value?.token_id || `nft_${Math.random()}`,
//             token_name: t?.value?.token_name || 'Unnamed NFT'
//           }
//         }));
//       });
      
//       setNfts(nftData || []);
//     } catch (err) {
//       console.error('NFT fetch failed:', err);
//       setNfts([]);
//     }
//   };

//   const getTransactions = async () => {
//     try {
//       const txs = await aptosClient.getAccountTransactions(walletAddress, { limit: 10 });
//       setTransactions(Array.isArray(txs) ? txs : []);
//     } catch (err) {
//       console.error('Failed to fetch transactions:', err);
//       setTransactions([]);
//     }
//   };

//   // ELEGENT Card specific functions
//   const getTrustScoreData = async () => {
//     try {
//       const trustScoreData = await aptosClient.getTrustScoreNFT(walletAddress);
//       setTrustScore(trustScoreData);
//     } catch (err) {
//       console.error('Failed to fetch TrustScore:', err);
//     }
//   };

//   const getActiveLoans = async () => {
//     try {
//       const loans = await aptosClient.getActiveLoans(walletAddress);
//       setActiveLoans(loans);
//     } catch (err) {
//       console.error('Failed to fetch active loans:', err);
//     }
//   };

//   const getLoanHistory = async () => {
//     try {
//       const history = await aptosClient.getLoanHistory(walletAddress);
//       setLoanHistory(history);
//     } catch (err) {
//       console.error('Failed to fetch loan history:', err);
//     }
//   };

//   // ELEGENT Card transaction handlers
//   const handleBorrow = async () => {
//     if (!borrowAmount || !connectedWallet) {
//       alert('Please enter amount and connect wallet');
//       return;
//     }

//     try {
//       const payload = aptosClient.generateLoanBorrowPayload(parseFloat(borrowAmount), borrowDuration);
//       const gasEstimate = await aptosClient.estimateGas(payload, walletAddress);
      
//       console.log('Gas estimate:', gasEstimate);
      
//       const result = await connectedWallet.provider.signAndSubmitTransaction(payload);
//       alert(`Loan borrowed successfully! Tx: ${result.hash}`);
      
//       // Refresh data
//       await Promise.all([getActiveLoans(), getTrustScoreData()]);
//       setBorrowAmount('');
//     } catch (err) {
//       alert(`Borrow failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   const handleRepay = async () => {
//     if (!repayAmount || !repayLoanId || !connectedWallet) {
//       alert('Please fill all fields and connect wallet');
//       return;
//     }

//     try {
//       const payload = aptosClient.generateLoanRepayPayload(repayLoanId, parseFloat(repayAmount));
//       const result = await connectedWallet.provider.signAndSubmitTransaction(payload);
//       alert(`Loan repaid successfully! Tx: ${result.hash}`);
      
//       // Refresh data
//       await Promise.all([getActiveLoans(), getTrustScoreData(), getLoanHistory()]);
//       setRepayAmount('');
//       setRepayLoanId('');
//     } catch (err) {
//       alert(`Repay failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   const handleClaimFaucet = async () => {
//     if (!connectedWallet) {
//       alert('Please connect wallet');
//       return;
//     }

//     try {
//       const networkInfo = aptosClient.getNetworkInfo();
//       if (!networkInfo.hasFaucet) {
//         alert('Faucet not available on mainnet');
//         return;
//       }

//       await aptosClient.fundAccount(walletAddress);
//       alert('Faucet tokens claimed successfully!');
//     } catch (err) {
//       alert(`Faucet claim failed: ${err.message}`);
//     }
//   };

//   // Existing handlers (simplified)
//   const handleNftTransfer = async () => {
//     if (!walletAddress || !selectedToken || !transferAddress || !connectedWallet) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x3::token_transfers::offer_script',
//         arguments: [transferAddress, selectedToken.token_id],
//         type_arguments: [],
//       };

//       const result = await connectedWallet.provider.signAndSubmitTransaction(payload);
//       alert('NFT transferred successfully');
//       setSelectedToken(null);
//       setTransferAddress('');
//     } catch (err) {
//       alert(`Transfer failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   const handleStaking = async () => {
//     if (!walletAddress || !stakingAmount || !stakingProtocol || !connectedWallet) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       const amount = aptosClient.aptToOctas(parseFloat(stakingAmount));

//       let payload;
//       if (stakingProtocol === 'tortuga') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x5d7dc21486b0c96a7a63708943506b18853c4f7ee7bb372617b78a6be0a4f46d::stake::stake_entry',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else if (stakingProtocol === 'ditto') {
//         payload = {
//           type: 'entry_function_payload',
//           function: '0x7ce7d8a0cfc297c4b91f4171ed479fdc3b68949d32d7b564d1cc438e57f16b0b::staking::stake',
//           type_arguments: ['0x1::aptos_coin::AptosCoin'],
//           arguments: [amount.toString()],
//         };
//       } else {
//         alert('Invalid staking protocol');
//         return;
//       }

//       const result = await connectedWallet.provider.signAndSubmitTransaction(payload);
//       alert('Staked successfully');
//       setStakingAmount('');
//       setStakingProtocol('');
//     } catch (err) {
//       alert(`Staking failed: ${err.message}`);
//       console.error(err);
//     }
//   };

//   // Loading and error states
//   if (loading) {
//     return (
//       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//         <h2 className="text-2xl font-bold mb-4">💳 ELEGENT Card Dashboard</h2>
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           <span className="ml-3">Loading wallet data...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//         <h2 className="text-2xl font-bold mb-4">💳 ELEGENT Card Dashboard</h2>
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p className="font-bold">Error:</p>
//           <p>{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">💳 ELEGENT Card Dashboard</h2>
//         <div className="text-sm">
//           <p>📬 {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
//           <p>💸 Balance: {aptosBalance ? aptosBalance.toFixed(4) : '0.0000'} APT</p>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex space-x-1 mb-6 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
//         {[
//           { id: 'overview', label: '📊 Overview', icon: '📊' },
//           { id: 'loans', label: '💰 Loans', icon: '💰' },
//           { id: 'staking', label: '🏦 Staking', icon: '🏦' },
//           { id: 'nfts', label: '🎨 NFTs', icon: '🎨' }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
//               activeTab === tab.id 
//                 ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' 
//                 : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'overview' && (
//         <div className="space-y-6">
//           {/* TrustScore Card */}
//           {trustScore && (
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
//               <h3 className="text-xl font-bold mb-4">🏆 TrustScore NFT</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="text-sm opacity-80">Score</p>
//                   <p className="text-2xl font-bold">{trustScore.score}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm opacity-80">Level</p>
//                   <p className="text-2xl font-bold">{trustScore.level}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm opacity-80">Borrow Limit</p>
//                   <p className="text-2xl font-bold">${trustScore.borrowLimit}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm opacity-80">Success Rate</p>
//                   <p className="text-2xl font-bold">
//                     {trustScore.totalLoans > 0 
//                       ? Math.round((trustScore.successfulRepayments / trustScore.totalLoans) * 100)
//                       : 0}%
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Quick Stats */}
//           <div className="grid gap-4 md:grid-cols-3">
//             <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//               <h3 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h3>
//               <p className="text-xl font-bold text-green-500">
//                 {apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}
//               </p>
//             </div>
//             <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//               <h3 className="font-semibold text-lg mb-2">💰 Active Loans</h3>
//               <p className="text-xl font-bold text-orange-500">{activeLoans.length}</p>
//             </div>
//             <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
//               <h3 className="font-semibold text-lg mb-2">🪙 Other Tokens</h3>
//               <p className="text-xl font-bold text-blue-500">{tokens.length}</p>
//             </div>
//           </div>

//           {/* Faucet for testnet */}
//           {aptosClient.getNetworkInfo().hasFaucet && (
//             <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-xl">
//               <h4 className="font-semibold text-yellow-800 mb-2">🚰 Testnet Faucet</h4>
//               <p className="text-sm text-yellow-700 mb-3">Get free testnet APT tokens to try ELEGENT Card</p>
//               <button
//                 onClick={handleClaimFaucet}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//               >
//                 Claim Faucet Tokens
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === 'loans' && (
//         <div className="space-y-6">
//           {/* Borrow Section */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">💰 Borrow Funds</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Amount (APT)</label>
//                 <input
//                   type="number"
//                   value={borrowAmount}
//                   onChange={(e) => setBorrowAmount(e.target.value)}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                   placeholder="Enter amount"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Duration (days)</label>
//                 <select 
//                   value={borrowDuration} 
//                   onChange={(e) => setBorrowDuration(Number(e.target.value))}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                 >
//                   <option value={7}>7 days</option>
//                   <option value={10}>10 days</option>
//                   <option value={15}>15 days</option>
//                 </select>
//               </div>
//               <div className="flex items-end">
//                 <button
//                   onClick={handleBorrow}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//                 >
//                   Borrow
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Active Loans */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">📋 Active Loans</h3>
//             {activeLoans.length > 0 ? (
//               <div className="space-y-3">
//                 {activeLoans.map((loan) => (
//                   <div key={loan.id} className="border p-4 rounded-lg">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-semibold">Loan #{loan.id}</p>
//                         <p className="text-sm text-gray-600">
//                           Amount: {loan.amount} APT | Due: {new Date(loan.dueDate * 1000).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <span className={`px-2 py-1 rounded text-sm ${
//                           loan.isOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                         }`}>
//                           {loan.isOverdue ? 'Overdue' : 'Active'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No active loans</p>
//             )}
//           </div>

//           {/* Repay Section */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">💳 Repay Loan</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Loan ID</label>
//                 <input
//                   type="text"
//                   value={repayLoanId}
//                   onChange={(e) => setRepayLoanId(e.target.value)}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                   placeholder="Enter loan ID"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Amount (APT)</label>
//                 <input
//                   type="number"
//                   value={repayAmount}
//                   onChange={(e) => setRepayAmount(e.target.value)}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                   placeholder="Enter amount"
//                 />
//               </div>
//               <div className="flex items-end">
//                 <button
//                   onClick={handleRepay}
//                   className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//                 >
//                   Repay
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Loan History */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">📚 Loan History</h3>
//             {loanHistory.length > 0 ? (
//               <div className="space-y-2">
//                 {loanHistory.map((tx, i) => (
//                   <div key={i} className="flex justify-between items-center border-b pb-2">
//                     <div>
//                       <span className={`px-2 py-1 rounded text-xs ${
//                         tx.type === 'borrow' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                       }`}>
//                         {tx.type}
//                       </span>
//                       <span className="ml-2">{tx.amount} APT</span>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {new Date(tx.timestamp).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No loan history</p>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === 'staking' && (
//         <div className="space-y-6">
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">🏦 Staking / Yield Farming</h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Protocol</label>
//                 <select
//                   value={stakingProtocol}
//                   onChange={(e) => setStakingProtocol(e.target.value)}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                 >
//                   <option value="">Select Protocol</option>
//                   <option value="tortuga">Tortuga</option>
//                   <option value="ditto">Ditto</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Amount (APT)</label>
//                 <input
//                   type="number"
//                   step="0.0001"
//                   min="0"
//                   placeholder="Amount to stake"
//                   value={stakingAmount}
//                   onChange={(e) => setStakingAmount(e.target.value)}
//                   className="w-full p-2 border rounded dark:bg-gray-600"
//                 />
//               </div>
//               <div className="md:col-span-2 flex items-end">
//                 <button
//                   onClick={handleStaking}
//                   className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
//                 >
//                   Stake
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === 'nfts' && (
//         <div className="space-y-6">
//           {/* NFT Gallery */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">🎨 Your NFTs</h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {nfts.length > 0 ? (
//                 nfts.map((nft, i) => (
//                   <div key={i} className="border p-4 rounded-xl">
//                     <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
//                     <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
//                     <button
//                       onClick={() => setSelectedToken(nft.data)}
//                       className={`mt-2 px-2 py-1 text-sm rounded ${
//                         selectedToken === nft.data 
//                           ? 'bg-green-600 text-white' 
//                           : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                       }`}
//                     >
//                       {selectedToken === nft.data ? 'Selected' : 'Select for Transfer'}
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 col-span-full">No NFTs found</p>
//               )}
//             </div>
//           </div>

//           {/* NFT Transfer */}
//           <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
//             <h3 className="text-xl font-bold mb-4">🧾 Transfer Selected NFT</h3>
//             {selectedToken && (
//               <p className="text-sm text-green-600 mb-2">
//                 Selected: {selectedToken.token_name || 'Unnamed NFT'}
//               </p>
//             )}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Recipient address (0x...)"
//                 value={transferAddress}
//                 onChange={(e) => setTransferAddress(e.target.value)}
//                 className="flex-1 p-2 border rounded dark:bg-gray-600"
//               />
//               <button
//                 onClick={handleNftTransfer}
//                 disabled={!selectedToken}
//                 className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 hover:bg-green-700"
//               >
//                 Send NFT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Recent Transactions (always visible at bottom) */}
//       <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl">
//         <h3 className="text-xl font-bold mb-4">📜 Recent Transactions</h3>
//         <div className="space-y-2 max-h-60 overflow-y-auto">
//           {transactions.length > 0 ? (
//             transactions.map((tx, i) => (
//               <div key={i} className="flex justify-between items-center border-b pb-2">
//                 <div>
//                   <span className="text-sm font-mono">
//                     {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-4)}
//                   </span>
//                   <span className="ml-2 text-sm text-gray-600">{tx.type}</span>
//                 </div>
//                 <div className="text-right text-sm">
//                   <span className={tx.success ? 'text-green-600' : 'text-red-600'}>
//                     {tx.success ? '✅' : '❌'}
//                   </span>
//                   <div className="text-gray-500">
//                     {tx.timestamp ? new Date(parseInt(tx.timestamp) / 1000).toLocaleString() : 'Unknown'}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No recent transactions</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;





import React, { useEffect, useState, useCallback } from 'react';
import aptosClient from '../utils/aptosClient';

const ProfileDashboard = ({ walletAddress, aptosBalance, connectedWallet }) => {
  const [tokens, setTokens] = useState([]);
  const [apr, setApr] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [transferAddress, setTransferAddress] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [stakingProtocol, setStakingProtocol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ELEGENT Card specific states
  const [trustScore, setTrustScore] = useState(null);
  const [activeLoans, setActiveLoans] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [borrowAmount, setBorrowAmount] = useState('');
  const [borrowDuration, setBorrowDuration] = useState(7);
  const [repayLoanId, setRepayLoanId] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Traditional DeFi functions wrapped with useCallback
  const getTokenData = useCallback(async () => {
    try {
      const resources = await aptosClient.getAccountResources(walletAddress);
      const tokenResources = resources.filter(r => 
        r.type.includes('coin::CoinStore') && 
        !r.type.includes('aptos_coin::AptosCoin')
      );
      
      const tokenList = tokenResources.map(resource => ({
        tokenType: resource.type.split('<')[1]?.replace('>', '') || 'Unknown',
        balance: parseInt(resource.data.coin.value) / 1e8
      }));
      
      setTokens(tokenList || []);
    } catch (err) {
      console.error('Failed to fetch tokens:', err);
    }
  }, [walletAddress]);

  const getTortugaAPR = useCallback(async () => {
    try {
      const res = await fetch('https://api.tortuga.finance/aptos/mainnet/apr');
      if (!res.ok) throw new Error('APR fetch failed');
      const data = await res.json();
      setApr(data.apr || data);
    } catch (err) {
      console.error('Failed to fetch APR:', err);
      setApr(0);
    }
  }, []);

  const getNFTs = useCallback(async () => {
    try {
      const resources = await aptosClient.getAccountResources(walletAddress);
      const ownedTokens = resources.filter(r => 
        r.type && (r.type.includes('TokenStore') || r.type.includes('token::TokenStore'))
      );
      
      const nftData = ownedTokens.flatMap((r) => {
        const tokens = r.data?.tokens?.data || [];
        return tokens.map((t) => ({
          data: {
            ...t?.value,
            token_id: t?.value?.token_id || `nft_${Math.random()}`,
            token_name: t?.value?.token_name || 'Unnamed NFT'
          }
        }));
      });
      
      setNfts(nftData || []);
    } catch (err) {
      console.error('NFT fetch failed:', err);
      setNfts([]);
    }
  }, [walletAddress]);

  const getTransactions = useCallback(async () => {
    try {
      const txs = await aptosClient.getAccountTransactions(walletAddress, { limit: 10 });
      setTransactions(Array.isArray(txs) ? txs : []);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setTransactions([]);
    }
  }, [walletAddress]);

  // ELEGENT Card specific functions
  const getTrustScoreData = useCallback(async () => {
    try {
      const trustScoreData = await aptosClient.getTrustScoreNFT(walletAddress);
      setTrustScore(trustScoreData);
    } catch (err) {
      console.error('Failed to fetch TrustScore:', err);
    }
  }, [walletAddress]);

  const getActiveLoans = useCallback(async () => {
    try {
      const loans = await aptosClient.getActiveLoans(walletAddress);
      setActiveLoans(loans);
    } catch (err) {
      console.error('Failed to fetch active loans:', err);
    }
  }, [walletAddress]);

  const getLoanHistory = useCallback(async () => {
    try {
      const history = await aptosClient.getLoanHistory(walletAddress);
      setLoanHistory(history);
    } catch (err) {
      console.error('Failed to fetch loan history:', err);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress) return;

    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        await Promise.all([
          getTokenData(),
          getTortugaAPR(),
          getNFTs(),
          getTransactions(),
          getTrustScoreData(),
          getActiveLoans(),
          getLoanHistory()
        ]);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [walletAddress, getTokenData, getTortugaAPR, getNFTs, getTransactions, getTrustScoreData, getActiveLoans, getLoanHistory]);

  // ELEGENT Card transaction handlers
  const handleBorrow = async () => {
    if (!borrowAmount || !connectedWallet) {
      alert('Please enter amount and connect wallet');
      return;
    }

    try {
      const payload = aptosClient.generateLoanBorrowPayload(parseFloat(borrowAmount), borrowDuration);
      await connectedWallet.provider.signAndSubmitTransaction(payload);
      alert('Loan borrowed successfully!');
      
      await Promise.all([getActiveLoans(), getTrustScoreData()]);
      setBorrowAmount('');
    } catch (err) {
      alert(`Borrow failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleRepay = async () => {
    if (!repayAmount || !repayLoanId || !connectedWallet) {
      alert('Please fill all fields and connect wallet');
      return;
    }

    try {
      const payload = aptosClient.generateLoanRepayPayload(repayLoanId, parseFloat(repayAmount));
      await connectedWallet.provider.signAndSubmitTransaction(payload);
      alert('Loan repaid successfully!');
      
      await Promise.all([getActiveLoans(), getTrustScoreData(), getLoanHistory()]);
      setRepayAmount('');
      setRepayLoanId('');
    } catch (err) {
      alert(`Repay failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleClaimFaucet = async () => {
    if (!connectedWallet) {
      alert('Please connect wallet');
      return;
    }

    try {
      const networkInfo = aptosClient.getNetworkInfo();
      if (!networkInfo.hasFaucet) {
        alert('Faucet not available on mainnet');
        return;
      }

      await aptosClient.fundAccount(walletAddress);
      alert('Faucet tokens claimed successfully!');
    } catch (err) {
      alert(`Faucet claim failed: ${err.message}`);
    }
  };

  const handleNftTransfer = async () => {
    if (!walletAddress || !selectedToken || !transferAddress || !connectedWallet) {
      alert('Please fill all fields');
      return;
    }

    try {
      const payload = {
        type: 'entry_function_payload',
        function: '0x3::token_transfers::offer_script',
        arguments: [transferAddress, selectedToken.token_id],
        type_arguments: [],
      };

      await connectedWallet.provider.signAndSubmitTransaction(payload);
      alert('NFT transferred successfully');
      setSelectedToken(null);
      setTransferAddress('');
    } catch (err) {
      alert(`Transfer failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleStaking = async () => {
    if (!walletAddress || !stakingAmount || !stakingProtocol || !connectedWallet) {
      alert('Please fill all fields');
      return;
    }

    try {
      const amount = aptosClient.aptToOctas(parseFloat(stakingAmount));

      let payload;
      if (stakingProtocol === 'tortuga') {
        payload = {
          type: 'entry_function_payload',
          function: '0x5d7dc21486b0c96a7a63708943506b18853c4f7ee7bb372617b78a6be0a4f46d::stake::stake_entry',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
          arguments: [amount.toString()],
        };
      } else if (stakingProtocol === 'ditto') {
        payload = {
          type: 'entry_function_payload',
          function: '0x7ce7d8a0cfc297c4b91f4171ed479fdc3b68949d32d7b564d1cc438e57f16b0b::staking::stake',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
          arguments: [amount.toString()],
        };
      } else {
        alert('Invalid staking protocol');
        return;
      }

      await connectedWallet.provider.signAndSubmitTransaction(payload);
      alert('Staked successfully');
      setStakingAmount('');
      setStakingProtocol('');
    } catch (err) {
      alert(`Staking failed: ${err.message}`);
      console.error(err);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-4">💳 ELEGENT Card Dashboard</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Loading wallet data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-4">💳 ELEGENT Card Dashboard</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-black dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">💳 ELEGENT Card Dashboard</h2>
        <div className="text-sm">
          <p>📬 {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
          <p>💸 Balance: {aptosBalance ? aptosBalance.toFixed(4) : '0.0000'} APT</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'loans', label: '💰 Loans' },
          { id: 'staking', label: '🏦 Staking' },
          { id: 'nfts', label: '🎨 NFTs' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* TrustScore Card */}
          {trustScore && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-4">🏆 TrustScore NFT</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-80">Score</p>
                  <p className="text-2xl font-bold">{trustScore.score}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Level</p>
                  <p className="text-2xl font-bold">{trustScore.level}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Borrow Limit</p>
                  <p className="text-2xl font-bold">${trustScore.borrowLimit}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Success Rate</p>
                  <p className="text-2xl font-bold">
                    {trustScore.totalLoans > 0 
                      ? Math.round((trustScore.successfulRepayments / trustScore.totalLoans) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">🔥 Tortuga APR</h3>
              <p className="text-xl font-bold text-green-500">
                {apr !== null ? `${apr.toFixed(2)}%` : 'Loading...'}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">💰 Active Loans</h3>
              <p className="text-xl font-bold text-orange-500">{activeLoans.length}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">🪙 Other Tokens</h3>
              <p className="text-xl font-bold text-blue-500">{tokens.length}</p>
            </div>
          </div>

          {/* Faucet for testnet */}
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-xl">
            <h4 className="font-semibold text-yellow-800 mb-2">🚰 Testnet Faucet</h4>
            <p className="text-sm text-yellow-700 mb-3">Get free testnet APT tokens to try ELEGENT Card</p>
            <button
              onClick={handleClaimFaucet}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Claim Faucet Tokens
            </button>
          </div>
        </div>
      )}

      {activeTab === 'loans' && (
        <div className="space-y-6">
          {/* Borrow Section */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">💰 Borrow Funds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount (APT)</label>
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (days)</label>
                <select 
                  value={borrowDuration} 
                  onChange={(e) => setBorrowDuration(Number(e.target.value))}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                >
                  <option value={7}>7 days</option>
                  <option value={10}>10 days</option>
                  <option value={15}>15 days</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleBorrow}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Borrow
                </button>
              </div>
            </div>
          </div>

          {/* Active Loans */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">📋 Active Loans</h3>
            {activeLoans.length > 0 ? (
              <div className="space-y-3">
                {activeLoans.map((loan) => (
                  <div key={loan.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Loan #{loan.id}</p>
                        <p className="text-sm text-gray-600">
                          Amount: {loan.amount} APT | Due: {new Date(loan.dueDate * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-sm ${
                          loan.isOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {loan.isOverdue ? 'Overdue' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active loans</p>
            )}
          </div>

          {/* Repay Section */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">💳 Repay Loan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Loan ID</label>
                <input
                  type="text"
                  value={repayLoanId}
                  onChange={(e) => setRepayLoanId(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                  placeholder="Enter loan ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (APT)</label>
                <input
                  type="number"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleRepay}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Repay
                </button>
              </div>
            </div>
          </div>

          {/* Loan History */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">📚 Loan History</h3>
            {loanHistory.length > 0 ? (
              <div className="space-y-2">
                {loanHistory.map((tx, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        tx.type === 'borrow' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {tx.type}
                      </span>
                      <span className="ml-2">{tx.amount} APT</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No loan history</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'staking' && (
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">🏦 Staking / Yield Farming</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Protocol</label>
                <select
                  value={stakingProtocol}
                  onChange={(e) => setStakingProtocol(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                >
                  <option value="">Select Protocol</option>
                  <option value="tortuga">Tortuga</option>
                  <option value="ditto">Ditto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (APT)</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="Amount to stake"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-600"
                />
              </div>
              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={handleStaking}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                >
                  Stake
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nfts' && (
        <div className="space-y-6">
          {/* NFT Gallery */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">🎨 Your NFTs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nfts.length > 0 ? (
                nfts.map((nft, i) => (
                  <div key={i} className="border p-4 rounded-xl">
                    <p className="text-sm font-bold">{nft.data?.token_name || 'Unnamed NFT'}</p>
                    <p className="text-xs truncate">ID: {nft.data?.token_id}</p>
                    <button
                      onClick={() => setSelectedToken(nft.data)}
                      className={`mt-2 px-2 py-1 text-sm rounded ${
                        selectedToken === nft.data 
                          ? 'bg-green-600 text-white' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {selectedToken === nft.data ? 'Selected' : 'Select for Transfer'}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full">No NFTs found</p>
              )}
            </div>
          </div>

          {/* NFT Transfer */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl">
            <h3 className="text-xl font-bold mb-4">🧾 Transfer Selected NFT</h3>
            {selectedToken && (
              <p className="text-sm text-green-600 mb-2">
                Selected: {selectedToken.token_name || 'Unnamed NFT'}
              </p>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Recipient address (0x...)"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                className="flex-1 p-2 border rounded dark:bg-gray-600"
              />
              <button
                onClick={handleNftTransfer}
                disabled={!selectedToken}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 hover:bg-green-700"
              >
                Send NFT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl">
        <h3 className="text-xl font-bold mb-4">📜 Recent Transactions</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {transactions.length > 0 ? (
            transactions.map((tx, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div>
                  <span className="text-sm font-mono">
                    {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-4)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">{tx.type}</span>
                </div>
                <div className="text-right text-sm">
                  <span className={tx.success ? 'text-green-600' : 'text-red-600'}>
                    {tx.success ? '✅' : '❌'}
                  </span>
                  <div className="text-gray-500">
                    {tx.timestamp ? new Date(parseInt(tx.timestamp)).toLocaleString() : 'Unknown'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;