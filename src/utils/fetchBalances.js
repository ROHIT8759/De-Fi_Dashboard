// // src/utils/fetchBalances.js
// import { AptosClient } from "aptos";

// const MAINNET_NODE = "https://fullnode.mainnet.aptoslabs.com";
// const aptos = new AptosClient(MAINNET_NODE);

// export const fetchTokenBalances = async (walletAddress) => {
//   try {
//     const resources = await aptos.getAccountResources(walletAddress);
//     const coinResources = resources.filter((res) =>
//       res.type.startsWith("0x1::coin::CoinStore")
//     );

//     return coinResources.map((res) => {
//       const tokenType = res.type.match(/<(.+)>/)[1];
//       const balance = parseInt(res.data.coin.value);
//       return {
//         tokenType,
//         balance: balance / 1e8, // assumes 8 decimals
//       };
//     });
//   } catch (err) {
//     console.error("Fetch balance error:", err);
//     return [];
//   }
// };




// // src/utils/fetchBalances.js
// import { AptosClient } from 'aptos';

// const MAINNET_NODE = 'https://fullnode.mainnet.aptoslabs.com';
// const TESTNET_NODE = 'https://fullnode.testnet.aptoslabs.com';

// export const fetchAptosBalance = async (walletAddress, isTestnet = false) => {
//   const client = new AptosClient(isTestnet ? TESTNET_NODE : MAINNET_NODE);
//   const resources = await client.getAccountResources(walletAddress);
//   const coinStore = resources.find(r => r.type.includes('AptosCoin'));
//   const balance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;
//   return balance;
// };

// export const fetchTokenBalances = async (walletAddress, isTestnet = false) => {
//   const client = new AptosClient(isTestnet ? TESTNET_NODE : MAINNET_NODE);
//   const resources = await client.getAccountResources(walletAddress);
//   const tokenStores = resources.filter(r => r.type.startsWith('0x1::coin::CoinStore'));

//   const tokens = tokenStores.map((store) => {
//     const [_, tokenType] = store.type.match(/<(.+)>/) || [];
//     return {
//       type: tokenType,
//       amount: parseInt(store.data.coin.value) / 1e8,
//     };
//   });

//   return tokens;
// };

// export const fetchTortugaAPR = async () => {
//   try {
//     const res = await fetch('https://api.tortuga.finance/mainnet/metrics');
//     const data = await res.json();
//     return data.apr || 0;
//   } catch {
//     return 0;
//   }
// };


// // fetchBalances.js
// import { AptosClient } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com'; // Switch to testnet if needed
// const aptosClient = new AptosClient(NODE_URL);

// export const fetchBalances = async (walletAddress) => {
//   if (!walletAddress) return null;

//   try {
//     const resources = await aptosClient.getAccountResources(walletAddress);
//     const coinStore = resources.find(
//       (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//     );

//     const aptBalance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;

//     // Placeholder values — replace with protocol APIs or on-chain queries later
//     const marketSize = 1254321.56;
//     const totalBorrowed = 489322.11;
//     const lentOut = ((totalBorrowed / marketSize) * 100).toFixed(2);

//     return {
//       aptBalance,
//       marketSize,
//       totalBorrowed,
//       lentOut,
//     };
//   } catch (err) {
//     console.error('Error fetching on-chain balances:', err);
//     return null;
//   }
// };




// // src/utils/fetchBalances.js
// import { AptosClient } from 'aptos';

// const aptos = new AptosClient('https://fullnode.mainnet.aptoslabs.com');

// export const fetchBalances = async (walletAddress) => {
//   try {
//     const resources = await aptos.getAccountResources(walletAddress);
//     const coinStore = resources.find(
//       (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//     );
//     const aptosBalance = coinStore ? parseInt(coinStore.data.coin.value) / 1e8 : 0;

//     // Placeholder protocol stats (replace later with real on-chain fetch)
//     const marketSize = 1250000;
//     const totalBorrowed = 750000;
//     const lentOut = ((totalBorrowed / marketSize) * 100).toFixed(2);

//     return { aptosBalance, marketSize, totalBorrowed, lentOut };
//   } catch (error) {
//     console.error('Error fetching balances:', error.message);
//     return { aptosBalance: 0, marketSize: 0, totalBorrowed: 0, lentOut: 0 };
//   }
// };




// // src/utils/fetchBalances.js

// import { AptosClient } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com';
// const client = new AptosClient(NODE_URL);

// export async function fetchTokenBalances(address, tokens) {
//   const balances = {};

//   try {
//     const resources = await client.getAccountResources(address);

//     for (const token of tokens) {
//       const tokenType = token.aptosType;
//       const store = resources.find((r) => r.type === `0x1::coin::CoinStore<${tokenType}>`);
//       const balance = store ? parseInt(store.data.coin.value) / 1e8 : 0;
//       balances[token.symbol] = balance;
//     }
//   } catch (err) {
//     console.error('Error fetching balances:', err);
//   }

//   return balances;
// }



// // src/utils/fetchBalances.js

// import { AptosClient } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com';
// const client = new AptosClient(NODE_URL);

// /**
//  * Fetch wallet token balances for a list of tokens from Aptos mainnet.
//  * @param {string} address - Wallet address
//  * @param {Array} tokens - Array of token objects with `symbol` and `aptosType` fields
//  * @returns {Object} - Balances keyed by token symbol, e.g., { APT: 1.25, USDT: 32.1 }
//  */
// export async function fetchTokenBalances(address, tokens) {
//   const balances = {};

//   try {
//     const resources = await client.getAccountResources(address);

//     for (const token of tokens) {
//       const tokenType = token.aptosType;
//       const store = resources.find((r) => r.type === `0x1::coin::CoinStore<${tokenType}>`);
//       const balance = store ? parseInt(store.data.coin.value) / 1e8 : 0;
//       balances[token.symbol] = balance;
//     }
//   } catch (err) {
//     console.error(`🔴 Failed to fetch balances for ${address}:`, err.message);
//   }

//   return balances;
// }




// // fetchBalances.js
// import { AptosClient } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com/v1'; // Ensure /v1 is added for proper endpoint
// const aptosClient = new AptosClient(NODE_URL);

// // Fetch APT balance from CoinStore
// export async function fetchAptosBalance(address) {
//   const resources = await aptosClient.getAccountResources(address);
//   const aptosCoinStore = resources.find((r) =>
//     r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//   );
//   return aptosCoinStore
//     ? parseInt(aptosCoinStore.data.coin.value, 10) / 1e8
//     : 0;
// }

// // Future export for token balances
// export async function fetchTokenBalances(address, tokenList = []) {
//   const resources = await aptosClient.getAccountResources(address);
//   const balances = {};

//   for (const token of tokenList) {
//     const typeTag = token.type; // Ensure token.type is full type like 0x...::coin::CoinType
//     const store = resources.find((r) => r.type === `0x1::coin::CoinStore<${typeTag}>`);
//     balances[token.symbol] = store
//       ? parseInt(store.data.coin.value, 10) / 10 ** token.decimals
//       : 0;
//   }

//   return balances;
// }



// // fetchBalances.js
// import { AptosClient } from 'aptos';

// const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com/v1';
// const aptosClient = new AptosClient(NODE_URL);

// // Fetch APT balance from CoinStore
// export async function fetchAptosBalance(address) {
//   try {
//     const resources = await aptosClient.getAccountResources(address);
//     const aptosCoinStore = resources.find(
//       (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//     );
//     return aptosCoinStore
//       ? parseInt(aptosCoinStore.data.coin.value, 10) / 1e8
//       : 0;
//   } catch (error) {
//     console.error('Error fetching APT balance:', error);
//     return 0;
//   }
// }

// // Fetch token balances from list of token types
// export async function fetchTokenBalances(address, tokenList = []) {
//   try {
//     const resources = await aptosClient.getAccountResources(address);
//     const balances = {};

//     for (const token of tokenList) {
//       const typeTag = token.type; // e.g., 0x...::coin::SomeCoin
//       const store = resources.find(
//         (r) => r.type === `0x1::coin::CoinStore<${typeTag}>`
//       );
//       balances[token.symbol] = store
//         ? parseInt(store.data.coin.value, 10) / 10 ** token.decimals
//         : 0;
//     }

//     return balances;
//   } catch (error) {
//     console.error('Error fetching token balances:', error);
//     return {};
//   }
// }


// fetchBalances.js
import { AptosClient } from 'aptos';

const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com/v1';
const aptosClient = new AptosClient(NODE_URL);

// Fetch APT balance from CoinStore
export async function fetchAptosBalance(address) {
  try {
    const resources = await aptosClient.getAccountResources(address);
    const aptosCoinStore = resources.find(
      (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
    );
    return aptosCoinStore
      ? parseInt(aptosCoinStore.data.coin.value, 10) / 1e8
      : 0;
  } catch (error) {
    console.error('Error fetching APT balance:', error);
    return 0;
  }
}

// Fetch token balances from list of token types
export async function fetchTokenBalances(address, tokenList = []) {
  try {
    const resources = await aptosClient.getAccountResources(address);
    const balances = {};

    for (const token of tokenList) {
      const typeTag = token.type; // e.g., 0x...::coin::SomeCoin
      const store = resources.find(
        (r) => r.type === `0x1::coin::CoinStore<${typeTag}>`
      );
      balances[token.symbol] = store
        ? parseInt(store.data.coin.value, 10) / 10 ** token.decimals
        : 0;
    }

    return balances;
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return {};
  }
}

// Combined function to fetch all balances
export async function fetchBalances(address, tokenList = []) {
  try {
    const aptBalance = await fetchAptosBalance(address);
    const tokenBalances = await fetchTokenBalances(address, tokenList);
    
    return {
      APT: aptBalance,
      ...tokenBalances
    };
  } catch (error) {
    console.error('Error fetching balances:', error);
    return { APT: 0 };
  }
}
