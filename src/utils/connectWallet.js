// export const connectMartianWallet = async () => {
//   if (!window.martian) {
//     throw new Error('Martian Wallet not installed.');
//   }

//   if (!window.aptos || window.aptos.name !== 'Petra') {
//   alert('Petra Wallet extension not found. Please install Petra: https://petra.app/');
//   return;
//   }

//   try {
//     const response = await window.martian.connect();
//     return {
//       address: response.address,
//       status: 'connected',
//     };
//   } catch (error) {
//     throw new Error('Failed to connect to Martian Wallet.');
//   }
// };


// // connectMartian.js
// export const connectMartianWallet = async () => {
//   const hasMartian = typeof window !== 'undefined' && window.martian;
//   const hasPetra = typeof window !== 'undefined' && window.aptos && window.aptos.name === 'Petra';

//   if (!hasMartian && !hasPetra) {
//     alert('No compatible Aptos wallet found.\nInstall either:\n🔸 Martian: https://martianwallet.xyz/\n🔹 Petra: https://petra.app/');
//     throw new Error('No wallet extension installed.');
//   }

//   try {
//     if (hasMartian) {
//       const response = await window.martian.connect();
//       return {
//         address: response.address,
//         status: 'connected',
//         wallet: 'Martian',
//       };
//     } else if (hasPetra) {
//       const response = await window.aptos.connect();
//       const account = await window.aptos.account();
//       return {
//         address: account.address,
//         status: 'connected',
//         wallet: 'Petra',
//       };
//     }
//   } catch (error) {
//     throw new Error('Failed to connect to wallet: ' + error.message);
//   }
// };




/**
 * Connect to available Aptos wallets (Martian or Petra)
 * Returns wallet connection details including address and wallet type
 */
// export const connectMartianWallet = async () => {
//   // Check if we're in a browser environment
//   if (typeof window === 'undefined') {
//     throw new Error('Wallet connection only available in browser environment.');
//   }

//   // Check for available wallets
//   const hasMartian = window.martian && typeof window.martian.connect === 'function';
//   const hasPetra = window.aptos && window.aptos.name === 'Petra' && typeof window.aptos.connect === 'function';

//   // If no wallets are available, provide user-friendly guidance
//   if (!hasMartian && !hasPetra) {
//     const message = 'No compatible Aptos wallet found.\n\nPlease install one of the following:\n🔸 Martian Wallet: https://martianwallet.xyz/\n🔹 Petra Wallet: https://petra.app/';
//     alert(message);
//     throw new Error('No wallet extension installed.');
//   }

//   try {
//     // Prioritize Martian wallet if available
//     if (hasMartian) {
//       console.log('Connecting to Martian Wallet...');
//       const response = await window.martian.connect();
      
//       if (!response || !response.address) {
//         throw new Error('Failed to get address from Martian Wallet.');
//       }

//       return {
//         address: response.address,
//         publicKey: response.publicKey || null,
//         status: 'connected',
//         wallet: 'Martian',
//       };
//     } 
//     // Fallback to Petra wallet
//     else if (hasPetra) {
//       console.log('Connecting to Petra Wallet...');
//       await window.aptos.connect();
//       const account = await window.aptos.account();
      
//       if (!account || !account.address) {
//         throw new Error('Failed to get account from Petra Wallet.');
//       }

//       return {
//         address: account.address,
//         publicKey: account.publicKey || null,
//         status: 'connected',
//         wallet: 'Petra',
//       };
//     }
//   } catch (error) {
//     console.error('Wallet connection error:', error);
    
//     // Provide more specific error messages
//     if (error.message.includes('User rejected')) {
//       throw new Error('Wallet connection was rejected by user.');
//     } else if (error.message.includes('Already pending')) {
//       throw new Error('Wallet connection request is already pending. Please check your wallet.');
//     } else {
//       throw new Error(`Failed to connect to wallet: ${error.message}`);
//     }
//   }
// };

// /**
//  * Connect specifically to Martian Wallet
//  */
// export const connectMartianOnly = async () => {
//   if (typeof window === 'undefined' || !window.martian) {
//     throw new Error('Martian Wallet not installed. Please install from: https://martianwallet.xyz/');
//   }

//   try {
//     const response = await window.martian.connect();
//     return {
//       address: response.address,
//       publicKey: response.publicKey || null,
//       status: 'connected',
//       wallet: 'Martian',
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Martian Wallet: ${error.message}`);
//   }
// };

// /**
//  * Connect specifically to Petra Wallet
//  */
// export const connectPetraOnly = async () => {
//   if (typeof window === 'undefined' || !window.aptos || window.aptos.name !== 'Petra') {
//     throw new Error('Petra Wallet not installed. Please install from: https://petra.app/');
//   }

//   try {
//     await window.aptos.connect();
//     const account = await window.aptos.account();
//     return {
//       address: account.address,
//       publicKey: account.publicKey || null,
//       status: 'connected',
//       wallet: 'Petra',
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Petra Wallet: ${error.message}`);
//   }
// };

// /**
//  * Check which wallets are available
//  */
// export const getAvailableWallets = () => {
//   if (typeof window === 'undefined') {
//     return [];
//   }

//   const wallets = [];
  
//   if (window.martian) {
//     wallets.push('Martian');
//   }
  
//   if (window.aptos && window.aptos.name === 'Petra') {
//     wallets.push('Petra');
//   }
  
//   return wallets;
// };

// /**
//  * Disconnect from connected wallet
//  */
// export const disconnectWallet = async (walletType) => {
//   try {
//     if (walletType === 'Martian' && window.martian && window.martian.disconnect) {
//       await window.martian.disconnect();
//     } else if (walletType === 'Petra' && window.aptos && window.aptos.disconnect) {
//       await window.aptos.disconnect();
//     }
    
//     return { status: 'disconnected' };
//   } catch (error) {
//     console.error('Error disconnecting wallet:', error);
//     throw new Error(`Failed to disconnect from ${walletType}: ${error.message}`);
//   }
// };




// export const connectWallet = async () => {
//   if (typeof window === 'undefined') {
//     throw new Error('Wallet connection only available in browser environment.');
//   }

//   const hasMartian = window.martian && typeof window.martian.connect === 'function';
//   const hasPetra = window.aptos && window.aptos.name === 'Petra' && typeof window.aptos.connect === 'function';
//   const hasFewcha = window.fewcha && typeof window.fewcha.connect === 'function';
//   const hasRise = window.rise && typeof window.rise.connect === 'function';

//   if (!hasMartian && !hasPetra && !hasFewcha && !hasRise) {
//     const message =
//       'No compatible Aptos wallet found.\n\nPlease install one of the following:\n🔸 Martian Wallet: https://martianwallet.xyz/\n🔹 Petra Wallet: https://petra.app/\n🟣 Fewcha Wallet: https://fewcha.app/\n🟢 Rise Wallet: https://risewallet.io/';
//     alert(message);
//     throw new Error('No wallet extension installed.');
//   }

//   try {
//     if (hasMartian) {
//       console.log('Connecting to Martian Wallet...');
//       const response = await window.martian.connect();
//       if (!response || !response.address) throw new Error('Failed to get address from Martian Wallet.');
//       return { address: response.address, publicKey: response.publicKey || null, status: 'connected', wallet: 'Martian', provider: window.martian };
//     }

//     if (hasPetra) {
//       console.log('Connecting to Petra Wallet...');
//       await window.aptos.connect();
//       const account = await window.aptos.account();
//       if (!account || !account.address) throw new Error('Failed to get account from Petra Wallet.');
//       return { address: account.address, publicKey: account.publicKey || null, status: 'connected', wallet: 'Petra', provider: window.aptos };
//     }

//     if (hasFewcha) {
//       console.log('Connecting to Fewcha Wallet...');
//       const response = await window.fewcha.connect();
//       if (!response || !response.address) throw new Error('Failed to get address from Fewcha Wallet.');
//       return { address: response.address, publicKey: response.publicKey || null, status: 'connected', wallet: 'Fewcha', provider: window.fewcha };
//     }

//     if (hasRise) {
//       console.log('Connecting to Rise Wallet...');
//       const response = await window.rise.connect();
//       if (!response || !response.address) throw new Error('Failed to get address from Rise Wallet.');
//       return { address: response.address, publicKey: response.publicKey || null, status: 'connected', wallet: 'Rise', provider: window.rise };
//     }
//   } catch (error) {
//     console.error('Wallet connection error:', error);
//     if (error.message.includes('User rejected')) {
//       throw new Error('Wallet connection was rejected by user.');
//     } else if (error.message.includes('Already pending')) {
//       throw new Error('Wallet connection request is already pending. Please check your wallet.');
//     } else {
//       throw new Error(`Failed to connect to wallet: ${error.message}`);
//     }
//   }
// };

// export const connectMartianOnly = async () => {
//   if (typeof window === 'undefined' || !window.martian) {
//     throw new Error('Martian Wallet not installed. Please install from: https://martianwallet.xyz/');
//   }

//   try {
//     const response = await window.martian.connect();
//     return {
//       address: response.address,
//       publicKey: response.publicKey || null,
//       status: 'connected',
//       wallet: 'Martian',
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Martian Wallet: ${error.message}`);
//   }
// };

// export const connectPetraOnly = async () => {
//   if (typeof window === 'undefined' || !window.aptos || window.aptos.name !== 'Petra') {
//     throw new Error('Petra Wallet not installed. Please install from: https://petra.app/');
//   }

//   try {
//     await window.aptos.connect();
//     const account = await window.aptos.account();
//     return {
//       address: account.address,
//       publicKey: account.publicKey || null,
//       status: 'connected',
//       wallet: 'Petra',
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Petra Wallet: ${error.message}`);
//   }
// };

// export const getAvailableWallets = () => {
//   if (typeof window === 'undefined') return [];

//   const wallets = [];
//   if (window.martian) wallets.push('Martian');
//   if (window.aptos && window.aptos.name === 'Petra') wallets.push('Petra');
//   if (window.fewcha) wallets.push('Fewcha');
//   if (window.rise) wallets.push('Rise');
//   return wallets;
// };

// export const disconnectWallet = async (walletType) => {
//   try {
//     if (walletType === 'Martian' && window.martian?.disconnect) {
//       await window.martian.disconnect();
//     } else if (walletType === 'Petra' && window.aptos?.disconnect) {
//       await window.aptos.disconnect();
//     } else if (walletType === 'Fewcha' && window.fewcha?.disconnect) {
//       await window.fewcha.disconnect();
//     } else if (walletType === 'Rise' && window.rise?.disconnect) {
//       await window.rise.disconnect();
//     }

//     return { status: 'disconnected' };
//   } catch (error) {
//     console.error('Error disconnecting wallet:', error);
//     throw new Error(`Failed to disconnect from ${walletType}: ${error.message}`);
//   }
// };





// /**
//  * Multi-wallet connector for Aptos ecosystem
//  * Supports: Martian, Petra, Fewcha, and Rise wallets
//  */

// /**
//  * Connect to any available Aptos wallet (auto-detect and prioritize)
//  * Priority order: Martian > Petra > Fewcha > Rise
//  */
// export const connectWallet = async () => {
//   if (typeof window === 'undefined') {
//     throw new Error('Wallet connection only available in browser environment.');
//   }

//   // Check for available wallets
//   const hasMartian = window.martian && typeof window.martian.connect === 'function';
//   const hasPetra = window.aptos && window.aptos.name === 'Petra' && typeof window.aptos.connect === 'function';
//   const hasFewcha = window.fewcha && typeof window.fewcha.connect === 'function';
//   const hasRise = window.rise && typeof window.rise.connect === 'function';

//   if (!hasMartian && !hasPetra && !hasFewcha && !hasRise) {
//     const message =
//       'No compatible Aptos wallet found.\n\nPlease install one of the following:\n🔸 Martian Wallet: https://martianwallet.xyz/\n🔹 Petra Wallet: https://petra.app/\n🟣 Fewcha Wallet: https://fewcha.app/\n🟢 Rise Wallet: https://risewallet.io/';
//     alert(message);
//     throw new Error('No wallet extension installed.');
//   }

//   try {
//     // Priority 1: Martian Wallet
//     if (hasMartian) {
//       console.log('Connecting to Martian Wallet...');
//       const response = await window.martian.connect();
//       if (!response || !response.address) {
//         throw new Error('Failed to get address from Martian Wallet.');
//       }
//       return {
//         address: response.address,
//         publicKey: response.publicKey || null,
//         status: 'connected',
//         wallet: 'Martian',
//         provider: window.martian
//       };
//     }

//     // Priority 2: Petra Wallet
//     if (hasPetra) {
//       console.log('Connecting to Petra Wallet...');
//       await window.aptos.connect();
//       const account = await window.aptos.account();
//       if (!account || !account.address) {
//         throw new Error('Failed to get account from Petra Wallet.');
//       }
//       return {
//         address: account.address,
//         publicKey: account.publicKey || null,
//         status: 'connected',
//         wallet: 'Petra',
//         provider: window.aptos
//       };
//     }

//     // Priority 3: Fewcha Wallet
//     if (hasFewcha) {
//       console.log('Connecting to Fewcha Wallet...');
//       const response = await window.fewcha.connect();
//       if (!response || !response.address) {
//         throw new Error('Failed to get address from Fewcha Wallet.');
//       }
//       return {
//         address: response.address,
//         publicKey: response.publicKey || null,
//         status: 'connected',
//         wallet: 'Fewcha',
//         provider: window.fewcha
//       };
//     }

//     // Priority 4: Rise Wallet
//     if (hasRise) {
//       console.log('Connecting to Rise Wallet...');
//       const response = await window.rise.connect();
//       if (!response || !response.address) {
//         throw new Error('Failed to get address from Rise Wallet.');
//       }
//       return {
//         address: response.address,
//         publicKey: response.publicKey || null,
//         status: 'connected',
//         wallet: 'Rise',
//         provider: window.rise
//       };
//     }
//   } catch (error) {
//     console.error('Wallet connection error:', error);
    
//     // Handle specific error types
//     if (error.message.includes('User rejected')) {
//       throw new Error('Wallet connection was rejected by user.');
//     } else if (error.message.includes('Already pending')) {
//       throw new Error('Wallet connection request is already pending. Please check your wallet.');
//     } else {
//       throw new Error(`Failed to connect to wallet: ${error.message}`);
//     }
//   }
// };

// /**
//  * Connect specifically to Martian Wallet
//  */
// export const connectMartianOnly = async () => {
//   if (typeof window === 'undefined' || !window.martian) {
//     throw new Error('Martian Wallet not installed. Please install from: https://martianwallet.xyz/');
//   }

//   try {
//     const response = await window.martian.connect();
//     if (!response || !response.address) {
//       throw new Error('Failed to get address from Martian Wallet.');
//     }
//     return {
//       address: response.address,
//       publicKey: response.publicKey || null,
//       status: 'connected',
//       wallet: 'Martian',
//       provider: window.martian
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Martian Wallet: ${error.message}`);
//   }
// };

// /**
//  * Connect specifically to Petra Wallet
//  */
// export const connectPetraOnly = async () => {
//   if (typeof window === 'undefined' || !window.aptos || window.aptos.name !== 'Petra') {
//     throw new Error('Petra Wallet not installed. Please install from: https://petra.app/');
//   }

//   try {
//     await window.aptos.connect();
//     const account = await window.aptos.account();
//     if (!account || !account.address) {
//       throw new Error('Failed to get account from Petra Wallet.');
//     }
//     return {
//       address: account.address,
//       publicKey: account.publicKey || null,
//       status: 'connected',
//       wallet: 'Petra',
//       provider: window.aptos
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Petra Wallet: ${error.message}`);
//   }
// };

// /**
//  * Connect specifically to Fewcha Wallet
//  */
// export const connectFewchaOnly = async () => {
//   if (typeof window === 'undefined' || !window.fewcha) {
//     throw new Error('Fewcha Wallet not installed. Please install from: https://fewcha.app/');
//   }

//   try {
//     const response = await window.fewcha.connect();
//     if (!response || !response.address) {
//       throw new Error('Failed to get address from Fewcha Wallet.');
//     }
//     return {
//       address: response.address,
//       publicKey: response.publicKey || null,
//       status: 'connected',
//       wallet: 'Fewcha',
//       provider: window.fewcha
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Fewcha Wallet: ${error.message}`);
//   }
// };

// /**
//  * Connect specifically to Rise Wallet
//  */
// export const connectRiseOnly = async () => {
//   if (typeof window === 'undefined' || !window.rise) {
//     throw new Error('Rise Wallet not installed. Please install from: https://risewallet.io/');
//   }

//   try {
//     const response = await window.rise.connect();
//     if (!response || !response.address) {
//       throw new Error('Failed to get address from Rise Wallet.');
//     }
//     return {
//       address: response.address,
//       publicKey: response.publicKey || null,
//       status: 'connected',
//       wallet: 'Rise',
//       provider: window.rise
//     };
//   } catch (error) {
//     throw new Error(`Failed to connect to Rise Wallet: ${error.message}`);
//   }
// };

// /**
//  * Check which wallets are available in the browser
//  */
// export const getAvailableWallets = () => {
//   if (typeof window === 'undefined') {
//     return [];
//   }

//   const wallets = [];
  
//   if (window.martian) wallets.push('Martian');
//   if (window.aptos && window.aptos.name === 'Petra') wallets.push('Petra');
//   if (window.fewcha) wallets.push('Fewcha');
//   if (window.rise) wallets.push('Rise');
  
//   return wallets;
// };

// /**
//  * Disconnect from the specified wallet
//  */
// export const disconnectWallet = async (walletType) => {
//   if (typeof window === 'undefined') {
//     throw new Error('Wallet disconnection only available in browser environment.');
//   }

//   try {
//     switch (walletType) {
//       case 'Martian':
//         if (window.martian?.disconnect) {
//           await window.martian.disconnect();
//         }
//         break;
//       case 'Petra':
//         if (window.aptos?.disconnect) {
//           await window.aptos.disconnect();
//         }
//         break;
//       case 'Fewcha':
//         if (window.fewcha?.disconnect) {
//           await window.fewcha.disconnect();
//         }
//         break;
//       case 'Rise':
//         if (window.rise?.disconnect) {
//           await window.rise.disconnect();
//         }
//         break;
//       default:
//         throw new Error(`Unknown wallet type: ${walletType}`);
//     }

//     return { status: 'disconnected', wallet: walletType };
//   } catch (error) {
//     console.error('Error disconnecting wallet:', error);
//     throw new Error(`Failed to disconnect from ${walletType}: ${error.message}`);
//   }
// };

// /**
//  * Check if a specific wallet is connected
//  */
// export const isWalletConnected = async (walletType) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }

//   try {
//     switch (walletType) {
//       case 'Martian':
//         return window.martian && await window.martian.isConnected();
//       case 'Petra':
//         return window.aptos && await window.aptos.isConnected();
//       case 'Fewcha':
//         return window.fewcha && await window.fewcha.isConnected();
//       case 'Rise':
//         return window.rise && await window.rise.isConnected();
//       default:
//         return false;
//     }
//   } catch (error) {
//     console.error('Error checking wallet connection:', error);
//     return false;
//   }
// };

// // Legacy support - alias for backward compatibility
// export const connectMartianWallet = connectWallet;






/**
 * Enhanced Aptos Wallet Connection Utility
 * Supports: Martian, Petra, Fewcha, Rise wallets
 */

// Wallet configuration
const WALLET_CONFIG = {
  Martian: {
    name: 'Martian',
    downloadUrl: 'https://martianwallet.xyz/',
    windowKey: 'martian',
    icon: '🔸'
  },
  Petra: {
    name: 'Petra',
    downloadUrl: 'https://petra.app/',
    windowKey: 'aptos',
    icon: '🔹',
    nameCheck: 'Petra'
  },
  Fewcha: {
    name: 'Fewcha',
    downloadUrl: 'https://fewcha.app/',
    windowKey: 'fewcha',
    icon: '🟣'
  },
  Rise: {
    name: 'Rise',
    downloadUrl: 'https://risewallet.io/',
    windowKey: 'rise',
    icon: '🟢'
  }
};

// Custom error classes for better error handling
class WalletError extends Error {
  constructor(message, code, wallet = null) {
    super(message);
    this.name = 'WalletError';
    this.code = code;
    this.wallet = wallet;
  }
}

// Error codes
const ERROR_CODES = {
  NO_WALLET: 'NO_WALLET',
  USER_REJECTED: 'USER_REJECTED',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  ALREADY_PENDING: 'ALREADY_PENDING',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_WALLET: 'UNKNOWN_WALLET'
};

/**
 * Check if we're in a browser environment
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * Check if a specific wallet is available
 */
const isWalletAvailable = (walletName) => {
  if (!isBrowser()) return false;
  
  const config = WALLET_CONFIG[walletName];
  if (!config) return false;
  
  const walletObj = window[config.windowKey];
  if (!walletObj) return false;
  
  // Special check for Petra
  if (walletName === 'Petra') {
    return walletObj.name === 'Petra' && typeof walletObj.connect === 'function';
  }
  
  return typeof walletObj.connect === 'function';
};

/**
 * Get all available wallets
 */
export const getAvailableWallets = () => {
  if (!isBrowser()) return [];
  
  return Object.keys(WALLET_CONFIG).filter(isWalletAvailable);
};

/**
 * Format wallet installation message
 */
const getInstallationMessage = () => {
  const walletList = Object.values(WALLET_CONFIG)
    .map(config => `${config.icon} ${config.name}: ${config.downloadUrl}`)
    .join('\n');
  
  return `No compatible Aptos wallet found.\n\nPlease install one of the following:\n${walletList}`;
};

/**
 * Connect to a specific wallet
 */
const connectToWallet = async (walletName) => {
  if (!isBrowser()) {
    throw new WalletError(
      'Wallet connection only available in browser environment.',
      ERROR_CODES.NO_WALLET
    );
  }

  const config = WALLET_CONFIG[walletName];
  if (!config) {
    throw new WalletError(
      `Unknown wallet: ${walletName}`,
      ERROR_CODES.UNKNOWN_WALLET
    );
  }

  if (!isWalletAvailable(walletName)) {
    throw new WalletError(
      `${walletName} Wallet not installed. Please install from: ${config.downloadUrl}`,
      ERROR_CODES.NO_WALLET,
      walletName
    );
  }

  try {
    console.log(`Connecting to ${walletName} Wallet...`);
    
    const walletObj = window[config.windowKey];
    let response, account;

    switch (walletName) {
      case 'Petra':
        await walletObj.connect();
        account = await walletObj.account();
        if (!account?.address) {
          throw new Error('Failed to get account from Petra Wallet.');
        }
        response = account;
        break;
      
      default:
        response = await walletObj.connect();
        if (!response?.address) {
          throw new Error(`Failed to get address from ${walletName} Wallet.`);
        }
        break;
    }

    return {
      address: response.address,
      publicKey: response.publicKey || null,
      status: 'connected',
      wallet: walletName,
      provider: walletObj
    };

  } catch (error) {
    console.error(`${walletName} connection error:`, error);
    
    // Handle specific error types
    if (error.message.includes('User rejected') || error.message.includes('rejected')) {
      throw new WalletError(
        'Wallet connection was rejected by user.',
        ERROR_CODES.USER_REJECTED,
        walletName
      );
    } else if (error.message.includes('Already pending')) {
      throw new WalletError(
        'Wallet connection request is already pending. Please check your wallet.',
        ERROR_CODES.ALREADY_PENDING,
        walletName
      );
    } else {
      throw new WalletError(
        `Failed to connect to ${walletName}: ${error.message}`,
        ERROR_CODES.CONNECTION_FAILED,
        walletName
      );
    }
  }
};

/**
 * Main connect function with priority-based wallet selection
 */
export const connectWallet = async (preferredWallet = null) => {
  if (!isBrowser()) {
    throw new WalletError(
      'Wallet connection only available in browser environment.',
      ERROR_CODES.NO_WALLET
    );
  }

  const availableWallets = getAvailableWallets();
  
  if (availableWallets.length === 0) {
    const message = getInstallationMessage();
    alert(message);
    throw new WalletError(
      'No wallet extension installed.',
      ERROR_CODES.NO_WALLET
    );
  }

  // If preferred wallet is specified and available, use it
  if (preferredWallet && availableWallets.includes(preferredWallet)) {
    return await connectToWallet(preferredWallet);
  }

  // Default priority order
  const priorityOrder = ['Martian', 'Petra', 'Fewcha', 'Rise'];
  
  for (const walletName of priorityOrder) {
    if (availableWallets.includes(walletName)) {
      return await connectToWallet(walletName);
    }
  }

  throw new WalletError(
    'No compatible wallet found.',
    ERROR_CODES.NO_WALLET
  );
};

/**
 * Connect to specific wallets
 */
export const connectMartianOnly = () => connectToWallet('Martian');
export const connectPetraOnly = () => connectToWallet('Petra');
export const connectFewchaOnly = () => connectToWallet('Fewcha');
export const connectRiseOnly = () => connectToWallet('Rise');

/**
 * Disconnect from the specified wallet
 */
export const disconnectWallet = async (walletType) => {
  if (!isBrowser()) {
    throw new WalletError(
      'Wallet disconnection only available in browser environment.',
      ERROR_CODES.NO_WALLET
    );
  }

  const config = WALLET_CONFIG[walletType];
  if (!config) {
    throw new WalletError(
      `Unknown wallet type: ${walletType}`,
      ERROR_CODES.UNKNOWN_WALLET
    );
  }

  try {
    const walletObj = window[config.windowKey];
    if (walletObj?.disconnect) {
      await walletObj.disconnect();
    }

    return { status: 'disconnected', wallet: walletType };
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    throw new WalletError(
      `Failed to disconnect from ${walletType}: ${error.message}`,
      ERROR_CODES.CONNECTION_FAILED,
      walletType
    );
  }
};

/**
 * Check if a specific wallet is connected
 */
export const isWalletConnected = async (walletType) => {
  if (!isBrowser()) return false;

  const config = WALLET_CONFIG[walletType];
  if (!config) return false;

  try {
    const walletObj = window[config.windowKey];
    return walletObj && await walletObj.isConnected();
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
};

/**
 * Get wallet connection status for all available wallets
 */
export const getAllWalletStatuses = async () => {
  const availableWallets = getAvailableWallets();
  const statuses = {};

  for (const walletName of availableWallets) {
    statuses[walletName] = await isWalletConnected(walletName);
  }

  return statuses;
};

/**
 * Auto-reconnect to previously connected wallet
 */
export const autoReconnect = async () => {
  const availableWallets = getAvailableWallets();
  
  for (const walletName of availableWallets) {
    if (await isWalletConnected(walletName)) {
      try {
        return await connectToWallet(walletName);
      } catch (error) {
        console.warn(`Auto-reconnect failed for ${walletName}:`, error);
      }
    }
  }
  
  return null;
};

// Legacy support - alias for backward compatibility
export const connectMartianWallet = connectWallet;

// Export error classes and codes for consumer use
export { WalletError, ERROR_CODES };