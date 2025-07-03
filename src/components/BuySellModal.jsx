// import React, { useState } from 'react';
// import { AptosClient, TxnBuilderTypes, BCS } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com'; // or testnet URL
// const aptosClient = new AptosClient(NODE_URL);

// function BuySellModal({ onClose, walletAddress, selectedToken, isBuy = true }) {
//   const [amount, setAmount] = useState('');
//   const [status, setStatus] = useState('');

//   const handleTrade = async () => {
//     if (!walletAddress || !amount || !selectedToken) return;

//     try {
//       const payload = {
//         type: 'entry_function_payload',
//         function: isBuy
//           ? '0x1::aptos_account::transfer' // placeholder logic, replace with DEX function if needed
//           : '0x1::aptos_account::transfer',
//         type_arguments: [],
//         arguments: [walletAddress, Math.floor(parseFloat(amount) * 1e8)], // 8 decimals assumed
//       };

//       const tx = await aptosClient.generateTransaction(walletAddress, payload);
//       const response = await window.martian.signAndSubmitTransaction(tx);
//       await aptosClient.waitForTransaction(response.hash);
//       setStatus('✅ Trade successful!');
//     } catch (err) {
//       setStatus(`❌ Trade failed: ${err.message}`);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-96">
//         <h2 className="text-xl font-bold mb-4">
//           {isBuy ? '🛒 Buy' : '💸 Sell'} {selectedToken?.symbol?.toUpperCase()}
//         </h2>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 mb-4 border rounded dark:bg-gray-700"
//         />
//         <button
//           onClick={handleTrade}
//           className="w-full py-2 px-4 bg-indigo-600 text-white rounded shadow"
//         >
//           Confirm {isBuy ? 'Buy' : 'Sell'}
//         </button>
//         <button
//           onClick={onClose}
//           className="mt-3 w-full py-2 px-4 bg-gray-400 text-white rounded shadow"
//         >
//           Cancel
//         </button>
//         {status && <p className="mt-2 text-sm text-center">{status}</p>}
//       </div>
//     </div>
//   );
// }

// export default BuySellModal;


// // BuySellModal.jsx
// import React, { useState } from 'react';
// import { AptosClient, AptosAccount, TxnBuilderTypes, BCS } from 'aptos';

// function BuySellModal({ coin, tradeType, onClose, walletAddress, aptosClient, isMainnet = true }) {
//   const [amount, setAmount] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const NETWORK = isMainnet
//     ? 'https://fullnode.mainnet.aptoslabs.com'
//     : 'https://fullnode.testnet.aptoslabs.com';

//   const handleTrade = async () => {
//     if (!walletAddress || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
//       alert('Please enter a valid amount.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setStatus('Preparing transaction...');

//       const recipient = tradeType === 'buy' ? walletAddress : '0x1'; // Dummy recipient for sell
//       const sendAmount = Math.floor(parseFloat(amount) * 1e8);

//       const payload = new TxnBuilderTypes.EntryFunctionPayload(
//         TxnBuilderTypes.EntryFunction.natural(
//           "0x1::coin",
//           "transfer",
//           [TxnBuilderTypes.TypeTagStruct.fromString("0x1::aptos_coin::AptosCoin")],
//           [
//             BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)),
//             BCS.bcsSerializeUint64(sendAmount)
//           ]
//         )
//       );

//       const response = await window.martian.signAndSubmitTransaction({
//         sender: walletAddress,
//         data: {
//           function: "0x1::coin::transfer",
//           type_arguments: ["0x1::aptos_coin::AptosCoin"],
//           arguments: [recipient, sendAmount.toString()],
//         },
//       });

//       setStatus(`✅ Transaction Submitted! Hash: ${response.hash}`);
//     } catch (error) {
//       console.error(error);
//       setStatus('❌ Transaction failed: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-xl">
//         <h2 className="text-2xl font-semibold mb-4">
//           {tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.name}
//         </h2>

//         <input
//           type="number"
//           min="0"
//           placeholder="Amount in APT"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 mb-4 border dark:bg-gray-800 rounded"
//         />

//         <div className="flex justify-between gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-500 text-white rounded shadow"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleTrade}
//             className="px-4 py-2 bg-indigo-600 text-white rounded shadow disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} APT`}
//           </button>
//         </div>

//         {status && <p className="mt-4 text-sm text-center">{status}</p>}
//       </div>
//     </div>
//   );
// }

// export default BuySellModal;




// // BuySellModal.jsx
// import React, { useState } from 'react';
// import { AptosClient } from 'aptos';

// const aptosClient = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// const BuySellModal = ({ coin, tradeType, onClose, walletAddress }) => {
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleTrade = async () => {
//     if (!walletAddress || !amount || !coin) return alert('Please fill in all fields');

//     try {
//       setLoading(true);

//       // Simulated swap logic (no real DEX used yet)
//       // Replace with protocol-specific swap contract later
//       const amountToSend = parseInt(parseFloat(amount) * 1e8); // Assuming 8 decimals

//       const payload = {
//         type: 'entry_function_payload',
//         function: '0x1::coin::transfer',
//         type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         arguments: [
//           coin.address, // Temporarily using coin ID as recipient
//           amountToSend.toString()
//         ],
//       };

//       const txnRequest = await window.aptos.generateTransaction(walletAddress, payload);
//       const signedTxn = await window.aptos.signAndSubmitTransaction(txnRequest);

//       alert(`${tradeType === 'buy' ? 'Purchase' : 'Sale'} successful!`);
//       onClose();
//     } catch (err) {
//       console.error('Trade failed', err);
//       alert('Transaction failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">{tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.name}</h2>

//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 border rounded dark:bg-gray-700 mb-4"
//         />

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleTrade}
//             disabled={loading}
//             className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             {loading ? 'Processing...' : 'Confirm'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuySellModal;





// BuySellModal.jsx
import React, { useState } from 'react';
import { AptosClient } from 'aptos';

const aptosClient = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// Replace this with your treasury or liquidity reserve address
const RESERVE_ADDRESS = '0x1234567890abcdef...';

const BuySellModal = ({ coin, tradeType, onClose, walletAddress }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    if (!walletAddress || !amount || !coin) {
      return alert('Please fill in all fields.');
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return alert('Please enter a valid amount.');
    }

    try {
      setLoading(true);
      const amountToSend = Math.floor(parsedAmount * 1e8); // 8 decimals assumed

      let payload;

      if (tradeType === 'buy') {
        // Buying token: send APT to reserve
        payload = {
          type: 'entry_function_payload',
          function: '0x1::coin::transfer',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
          arguments: [RESERVE_ADDRESS, amountToSend.toString()],
        };
      } else {
        // Selling token: send selected token to reserve
        if (!coin.token_type) {
          throw new Error('Token type not defined for selected coin');
        }

        payload = {
          type: 'entry_function_payload',
          function: '0x1::coin::transfer',
          type_arguments: [coin.token_type],
          arguments: [RESERVE_ADDRESS, amountToSend.toString()],
        };
      }

      const txnRequest = await window.aptos.generateTransaction(walletAddress, payload);
      const signedTxn = await window.aptos.signAndSubmitTransaction(txnRequest);

      alert(`${tradeType === 'buy' ? 'Purchase' : 'Sale'} successful! ✅`);
      onClose();
    } catch (err) {
      console.error('Trade failed:', err);
      alert(`Transaction failed ❌: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.name}</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleTrade}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {loading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySellModal;
