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




// ProfileDashboard.jsx
import React, { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import axios from 'axios';

const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

const ProfileDashboard = ({ walletAddress, aptosBalance }) => {
  const [transactions, setTransactions] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const [stakingTab, setStakingTab] = useState(false);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await axios.get(
          `https://api.mainnet.aptoslabs.com/v1/accounts/${walletAddress}/transactions`
        );
        setTransactions(res.data.slice(0, 10));
      } catch (e) {
        console.error('Failed to load transactions', e);
      }
    };

    const fetchNFTs = async () => {
      try {
        const res = await aptos.getAccountResources(walletAddress);
        const tokens = res.filter((r) => r.type.includes('0x3::token::Token')); // adjust if using new metadata standard
        setNfts(tokens);
      } catch (e) {
        console.error('Failed to load NFTs', e);
      }
    };

    if (walletAddress) {
      fetchTx();
      fetchNFTs();
    }
  }, [walletAddress]);

  const handleTransferNFT = async () => {
    if (!recipient || !selectedToken) return alert('Missing recipient or token');
    try {
      const txn = {
        type: 'entry_function_payload',
        function: '0x3::token_transfers::direct_transfer_script',
        type_arguments: [],
        arguments: [walletAddress, recipient, selectedToken.data.id.token_data_id.name, 1],
      };
      const response = await window.martian.signAndSubmitTransaction(txn);
      alert('Transfer submitted: ' + response.hash);
    } catch (e) {
      console.error('Transfer failed', e);
      alert('Failed to transfer NFT');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">👤 Profile Dashboard</h2>
        <button onClick={() => setStakingTab(!stakingTab)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">
          {stakingTab ? '📦 View NFTs' : '🏦 Staking' }
        </button>
      </div>

      <p>📬 Address: {walletAddress}</p>
      <p>💸 Aptos Balance: {aptosBalance?.toFixed(4)} APT</p>

      {stakingTab ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">🔐 Staking Options</h3>
          <p className="text-gray-500 mb-4">Coming soon: Integration with Tortuga and Ditto staking protocols</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded">
              <h4 className="font-bold">Tortuga Staking</h4>
              <p>Earn tAPT for APT deposits</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Stake</button>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-bold">Ditto Staking</h4>
              <p>Stake APT to receive stAPT</p>
              <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Stake</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* NFTs */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">🖼️ Your NFTs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedToken(nft)}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedToken === nft ? 'border-blue-500' : ''
                  }`}
                >
                  <p className="text-sm font-semibold truncate">{nft.data.id.token_data_id.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Recipient address"
                className="p-2 border rounded w-full h-12 text-black"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button
                onClick={handleTransferNFT}
                className="h-12 bg-purple-600 text-white px-4 py-0 rounded"
              >
                Transfer NFT
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">🧾 Recent Transactions</h3>
            <ul className="list-disc ml-6">
              {transactions.map((tx, i) => (
                <li key={i} className="text-sm">
                  {tx.type} - {tx.version} - {tx.timestamp}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDashboard;