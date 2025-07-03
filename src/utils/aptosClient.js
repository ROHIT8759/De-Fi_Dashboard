// import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';

// // Aptos network configurations
// const NETWORK_CONFIG = {
//   mainnet: {
//     nodeUrl: 'https://fullnode.mainnet.aptoslabs.com/v1',
//     faucetUrl: null, // No faucet on mainnet
//   },
//   testnet: {
//     nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
//     faucetUrl: 'https://faucet.testnet.aptoslabs.com',
//   },
//   devnet: {
//     nodeUrl: 'https://fullnode.devnet.aptoslabs.com/v1',
//     faucetUrl: 'https://faucet.devnet.aptoslabs.com',
//   }
// };

// // Current network (change as needed)
// const CURRENT_NETWORK = 'mainnet'; // or 'testnet', 'devnet'

// class AptosClientWrapper {
//   constructor(network = CURRENT_NETWORK) {
//     this.network = network;
//     this.config = NETWORK_CONFIG[network];

//     // Initialize clients
//     this.client = new AptosClient(this.config.nodeUrl);
//     this.coinClient = new CoinClient(this.client);
//     this.tokenClient = new TokenClient(this.client);

//     // Initialize faucet client only for testnets
//     if (this.config.faucetUrl) {
//       this.faucetClient = new FaucetClient(this.config.nodeUrl, this.config.faucetUrl);
//     }
//   }

//   // Get account resources
//   async getAccountResources(address) {
//     try {
//       return await this.client.getAccountResources(address);
//     } catch (error) {
//       console.error('Error fetching account resources:', error);
//       throw new Error(`Failed to fetch account resources: ${error.message}`);
//     }
//   }

//   // Get account balance (APT)
//   async getAccountBalance(address) {
//     try {
//       const resources = await this.getAccountResources(address);
//       const coinStore = resources.find(
//         (resource) => resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
//       );

//       if (coinStore) {
//         return parseInt(coinStore.data.coin.value) / 1e8; // Convert from Octas to APT
//       }
//       return 0;
//     } catch (error) {
//       console.error('Error fetching account balance:', error);
//       return 0;
//     }
//   }

//   // Get custom coin balance
//   async getCustomCoinBalance(address, coinType) {
//     try {
//       return await this.coinClient.checkBalance(address, { structTag: coinType });
//     } catch (error) {
//       console.error('Error fetching custom coin balance:', error);
//       return 0;
//     }
//   }

//   // Get account transactions
//   async getAccountTransactions(address, options = {}) {
//     try {
//       const { start = 0, limit = 25 } = options;
//       return await this.client.getAccountTransactions(address, { start, limit });
//     } catch (error) {
//       console.error('Error fetching account transactions:', error);
//       throw new Error(`Failed to fetch transactions: ${error.message}`);
//     }
//   }

//   // Submit transaction
//   async submitTransaction(signedTxn) {
//     try {
//       const pendingTxn = await this.client.submitTransaction(signedTxn);
//       const txnResult = await this.client.waitForTransactionWithResult(pendingTxn.hash);
//       return txnResult;
//     } catch (error) {
//       console.error('Error submitting transaction:', error);
//       throw new Error(`Transaction failed: ${error.message}`);
//     }
//   }

//   // Generate transaction payload for loan operations
//   generateLoanBorrowPayload(amount, loanDurationDays = 7) {
//     return {
//       type: 'entry_function_payload',
//       function: '0x1::elegent_loans::borrow', // Replace with your actual module address
//       type_arguments: [],
//       arguments: [amount.toString(), loanDurationDays.toString()]
//     };
//   }

//   // Generate transaction payload for loan repayment
//   generateLoanRepayPayload(loanId, amount) {
//     return {
//       type: 'entry_function_payload',
//       function: '0x1::elegent_loans::repay', // Replace with your actual module address
//       type_arguments: [],
//       arguments: [loanId.toString(), amount.toString()]
//     };
//   }

//   // Generate transaction payload for TrustScore NFT operations
//   generateTrustScoreUpdatePayload(newScore, action) {
//     return {
//       type: 'entry_function_payload',
//       function: '0x1::trust_score_nft::update_score', // Replace with your actual module address
//       type_arguments: [],
//       arguments: [newScore.toString(), action]
//     };
//   }

//   // Get TrustScore NFT data
//   async getTrustScoreNFT(address) {
//     try {
//       const resources = await this.getAccountResources(address);
//       const trustScoreResource = resources.find(
//         (resource) => resource.type.includes('trust_score_nft::TrustScore')
//       );

//       if (trustScoreResource) {
//         return {
//           score: parseInt(trustScoreResource.data.score),
//           level: parseInt(trustScoreResource.data.level),
//           totalLoans: parseInt(trustScoreResource.data.total_loans),
//           successfulRepayments: parseInt(trustScoreResource.data.successful_repayments),
//           lastUpdated: parseInt(trustScoreResource.data.last_updated)
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching TrustScore NFT:', error);
//       return null;
//     }
//   }

//   // Get active loans for an address
//   async getActiveLoans(address) {
//     try {
//       const resources = await this.getAccountResources(address);
//       const loanResources = resources.filter(
//         (resource) => resource.type.includes('elegent_loans::Loan')
//       );

//       return loanResources.map(loan => ({
//         id: loan.data.id,
//         amount: parseInt(loan.data.amount) / 1e8,
//         dueDate: parseInt(loan.data.due_date),
//         status: loan.data.status,
//         borrowedAt: parseInt(loan.data.borrowed_at)
//       }));
//     } catch (error) {
//       console.error('Error fetching active loans:', error);
//       return [];
//     }
//   }

//   // Fund account from faucet (testnet/devnet only)
//   async fundAccount(address, amount = 100000000) { // 1 APT = 100000000 Octas
//     if (!this.faucetClient) {
//       throw new Error('Faucet not available on mainnet');
//     }

//     try {
//       const txns = await this.faucetClient.fundAccount(address, amount);
//       console.log('Faucet funding successful:', txns);
//       return txns;
//     } catch (error) {
//       console.error('Error funding account:', error);
//       throw new Error(`Faucet funding failed: ${error.message}`);
//     }
//   }

//   // Get network info
//   getNetworkInfo() {
//     return {
//       network: this.network,
//       nodeUrl: this.config.nodeUrl,
//       faucetUrl: this.config.faucetUrl,
//       hasFaucet: !!this.config.faucetUrl
//     };
//   }

//   // Utility: Convert APT to Octas
//   aptToOctas(apt) {
//     return Math.floor(apt * 1e8);
//   }

//   // Utility: Convert Octas to APT
//   octasToApt(octas) {
//     return octas / 1e8;
//   }

//   // Check if address is valid
//   isValidAddress(address) {
//     try {
//       // Basic validation - Aptos addresses should be 64 characters (32 bytes) when prefixed with 0x
//       return /^0x[a-fA-F0-9]{64}$/.test(address) || /^0x[a-fA-F0-9]{1,64}$/.test(address);
//     } catch (error) {
//       return false;
//     }
//   }

//   // Get transaction by hash
//   async getTransactionByHash(txnHash) {
//     try {
//       return await this.client.getTransactionByHash(txnHash);
//     } catch (error) {
//       console.error('Error fetching transaction:', error);
//       throw new Error(`Failed to fetch transaction: ${error.message}`);
//     }
//   }
// }

// /**
//  * Connect to Petra Wallet and return the user's address and public key.
//  * Throws an error if Petra is not installed or connection fails.
//  */
// export async function connectPetraWallet() {
//   if (!window.aptos || window.aptos.name !== 'Petra') {
//     throw new Error('Petra Wallet extension not found. Please install Petra.');
//   }
//   try {
//     await window.aptos.connect();
//     const account = await window.aptos.account();
//     return {
//       address: account.address,
//       publicKey: account.publicKey,
//     };
//   } catch (error) {
//     console.error('Error connecting to Petra Wallet:', error);
//     throw new Error('Failed to connect to Petra Wallet');
//   }
// }

// // Example: Add more wallet connectors as needed
// // export async function connectMartianWallet() { ... }

// // Create and export the default instance
// const aptosClient = new AptosClientWrapper();

// export default aptosClient;

// // Also export the class for custom instances
// export { AptosClientWrapper };

// // Export network configurations for reference
// export { NETWORK_CONFIG };





import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';

// Aptos network configurations
const NETWORK_CONFIG = {
  mainnet: {
    nodeUrl: 'https://fullnode.mainnet.aptoslabs.com/v1',
    faucetUrl: null, // No faucet on mainnet
  },
  testnet: {
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
    faucetUrl: 'https://faucet.testnet.aptoslabs.com',
  },
  devnet: {
    nodeUrl: 'https://fullnode.devnet.aptoslabs.com/v1',
    faucetUrl: 'https://faucet.devnet.aptoslabs.com',
  }
};

// Current network (change as needed)
const CURRENT_NETWORK = 'testnet'; // Changed to testnet for development

// Module addresses (replace with your actual deployed addresses)
const MODULE_ADDRESSES = {
  ELEGENT_LOANS: '0x1::elegent_loans',
  TRUST_SCORE_NFT: '0x1::trust_score_nft',
  FAUCET: '0x1::elegent_faucet',
  MARKETPLACE: '0x1::elegent_marketplace'
};

class AptosClientWrapper {
  constructor(network = CURRENT_NETWORK) {
    this.network = network;
    this.config = NETWORK_CONFIG[network];
    
    // Initialize clients
    this.client = new AptosClient(this.config.nodeUrl);
    this.coinClient = new CoinClient(this.client);
    this.tokenClient = new TokenClient(this.client);
    
    // Initialize faucet client only for testnets
    if (this.config.faucetUrl) {
      this.faucetClient = new FaucetClient(this.config.nodeUrl, this.config.faucetUrl);
    }
  }

  // Network management
  switchNetwork(network) {
    if (!NETWORK_CONFIG[network]) {
      throw new Error(`Unsupported network: ${network}`);
    }
    
    this.network = network;
    this.config = NETWORK_CONFIG[network];
    this.client = new AptosClient(this.config.nodeUrl);
    this.coinClient = new CoinClient(this.client);
    this.tokenClient = new TokenClient(this.client);
    
    // Reinitialize faucet client if available
    if (this.config.faucetUrl) {
      this.faucetClient = new FaucetClient(this.config.nodeUrl, this.config.faucetUrl);
    } else {
      this.faucetClient = null;
    }
    
    console.log(`Switched to ${network} network`);
  }

  // Get account resources
  async getAccountResources(address) {
    try {
      this.validateAddress(address);
      return await this.client.getAccountResources(address);
    } catch (error) {
      console.error('Error fetching account resources:', error);
      throw new Error(`Failed to fetch account resources: ${error.message}`);
    }
  }

  // Get account balance (APT)
  async getAccountBalance(address) {
    try {
      this.validateAddress(address);
      const resources = await this.getAccountResources(address);
      const coinStore = resources.find(
        (resource) => resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
      );
      
      if (coinStore) {
        return parseInt(coinStore.data.coin.value) / 1e8; // Convert from Octas to APT
      }
      return 0;
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return 0;
    }
  }

  // Get custom coin balance
  async getCustomCoinBalance(address, coinType) {
    try {
      this.validateAddress(address);
      return await this.coinClient.checkBalance(address, { structTag: coinType });
    } catch (error) {
      console.error('Error fetching custom coin balance:', error);
      return 0;
    }
  }

  // Get account transactions
  async getAccountTransactions(address, options = {}) {
    try {
      this.validateAddress(address);
      const { start = 0, limit = 25 } = options;
      return await this.client.getAccountTransactions(address, { start, limit });
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  }

  // Submit transaction with better error handling
  async submitTransaction(signedTxn) {
    try {
      const pendingTxn = await this.client.submitTransaction(signedTxn);
      console.log('Transaction submitted:', pendingTxn.hash);
      
      const txnResult = await this.client.waitForTransactionWithResult(pendingTxn.hash);
      console.log('Transaction completed:', txnResult);
      
      return txnResult;
    } catch (error) {
      console.error('Error submitting transaction:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }

  // Estimate gas for transaction
  async estimateGas(payload, senderAddress) {
    try {
      this.validateAddress(senderAddress);
      const simulation = await this.client.simulateTransaction(senderAddress, payload);
      return {
        gasUsed: parseInt(simulation[0].gas_used),
        gasUnitPrice: parseInt(simulation[0].gas_unit_price),
        success: simulation[0].success
      };
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw new Error(`Gas estimation failed: ${error.message}`);
    }
  }

  // ELEGENT_CARD SPECIFIC METHODS

  // Generate transaction payload for loan operations
  generateLoanBorrowPayload(amount, loanDurationDays = 7) {
    return {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESSES.ELEGENT_LOANS}::borrow`,
      type_arguments: [],
      arguments: [this.aptToOctas(amount).toString(), loanDurationDays.toString()]
    };
  }

  // Generate transaction payload for loan repayment
  generateLoanRepayPayload(loanId, amount) {
    return {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESSES.ELEGENT_LOANS}::repay`,
      type_arguments: [],
      arguments: [loanId.toString(), this.aptToOctas(amount).toString()]
    };
  }

  // Generate transaction payload for TrustScore NFT operations
  generateTrustScoreUpdatePayload(newScore, action) {
    return {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESSES.TRUST_SCORE_NFT}::update_score`,
      type_arguments: [],
      arguments: [newScore.toString(), action]
    };
  }

  // Generate faucet claim payload for new users
  generateFaucetClaimPayload() {
    return {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESSES.FAUCET}::claim_starter_tokens`,
      type_arguments: [],
      arguments: []
    };
  }

  // Get TrustScore NFT data
  async getTrustScoreNFT(address) {
    try {
      this.validateAddress(address);
      const resources = await this.getAccountResources(address);
      const trustScoreResource = resources.find(
        (resource) => resource.type.includes('trust_score_nft::TrustScore')
      );
      
      if (trustScoreResource) {
        const data = trustScoreResource.data;
        return {
          score: parseInt(data.score),
          level: parseInt(data.level),
          totalLoans: parseInt(data.total_loans),
          successfulRepayments: parseInt(data.successful_repayments),
          defaultedLoans: parseInt(data.defaulted_loans || 0),
          lastUpdated: parseInt(data.last_updated),
          borrowLimit: this.calculateBorrowLimit(parseInt(data.score)),
          repaymentWindow: this.calculateRepaymentWindow(parseInt(data.score))
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching TrustScore NFT:', error);
      return null;
    }
  }

  // Calculate borrow limit based on TrustScore
  calculateBorrowLimit(score) {
    if (score < 31) return 0;
    if (score <= 60) return 25;
    if (score <= 85) return 50;
    return 100;
  }

  // Calculate repayment window based on TrustScore
  calculateRepaymentWindow(score) {
    if (score < 31) return 0;
    if (score <= 60) return 7;
    if (score <= 85) return 10;
    return 15;
  }

  // Get active loans for an address
  async getActiveLoans(address) {
    try {
      this.validateAddress(address);
      const resources = await this.getAccountResources(address);
      const loanResources = resources.filter(
        (resource) => resource.type.includes('elegent_loans::Loan')
      );
      
      return loanResources.map(loan => ({
        id: loan.data.id,
        amount: this.octasToApt(parseInt(loan.data.amount)),
        dueDate: parseInt(loan.data.due_date),
        status: loan.data.status,
        borrowedAt: parseInt(loan.data.borrowed_at),
        isOverdue: Date.now() > parseInt(loan.data.due_date) * 1000
      }));
    } catch (error) {
      console.error('Error fetching active loans:', error);
      return [];
    }
  }

  // Get loan history for an address
  async getLoanHistory(address, options = {}) {
    try {
      this.validateAddress(address);
      const { limit = 50 } = options;
      const transactions = await this.getAccountTransactions(address, { limit });
      
      // Filter loan-related transactions
      const loanTransactions = transactions.filter(tx => 
        tx.payload && 
        (tx.payload.function?.includes('elegent_loans::borrow') || 
         tx.payload.function?.includes('elegent_loans::repay'))
      );
      
      return loanTransactions.map(tx => ({
        hash: tx.hash,
        type: tx.payload.function.includes('borrow') ? 'borrow' : 'repay',
        timestamp: parseInt(tx.timestamp),
        success: tx.success,
        amount: tx.payload.arguments?.[0] ? this.octasToApt(parseInt(tx.payload.arguments[0])) : 0
      }));
    } catch (error) {
      console.error('Error fetching loan history:', error);
      return [];
    }
  }

  // Fund account from faucet (testnet/devnet only)
  async fundAccount(address, amount = 100000000) { // 1 APT = 100000000 Octas
    if (!this.faucetClient) {
      throw new Error('Faucet not available on mainnet');
    }
    
    try {
      this.validateAddress(address);
      const txns = await this.faucetClient.fundAccount(address, amount);
      console.log('Faucet funding successful:', txns);
      return txns;
    } catch (error) {
      console.error('Error funding account:', error);
      throw new Error(`Faucet funding failed: ${error.message}`);
    }
  }

  // Get network info
  getNetworkInfo() {
    return {
      network: this.network,
      nodeUrl: this.config.nodeUrl,
      faucetUrl: this.config.faucetUrl,
      hasFaucet: !!this.config.faucetUrl,
      moduleAddresses: MODULE_ADDRESSES
    };
  }

  // Utility: Convert APT to Octas
  aptToOctas(apt) {
    return Math.floor(parseFloat(apt) * 1e8);
  }

  // Utility: Convert Octas to APT
  octasToApt(octas) {
    return parseFloat(octas) / 1e8;
  }

  // Validate address format
  validateAddress(address) {
    if (!this.isValidAddress(address)) {
      throw new Error(`Invalid Aptos address format: ${address}`);
    }
  }

  // Check if address is valid
  isValidAddress(address) {
    try {
      // Basic validation - Aptos addresses should be 64 characters (32 bytes) when prefixed with 0x
      return /^0x[a-fA-F0-9]{64}$/.test(address) || /^0x[a-fA-F0-9]{1,64}$/.test(address);
    } catch (error) {
      return false;
    }
  }

  // Get transaction by hash
  async getTransactionByHash(txnHash) {
    try {
      return await this.client.getTransactionByHash(txnHash);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw new Error(`Failed to fetch transaction: ${error.message}`);
    }
  }

  // Check if account exists
  async accountExists(address) {
    try {
      this.validateAddress(address);
      await this.client.getAccount(address);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get account info
  async getAccountInfo(address) {
    try {
      this.validateAddress(address);
      const account = await this.client.getAccount(address);
      return {
        sequenceNumber: account.sequence_number,
        authenticationKey: account.authentication_key
      };
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw new Error(`Failed to fetch account info: ${error.message}`);
    }
  }
}

// Create and export the default instance
const aptosClient = new AptosClientWrapper();

export default aptosClient;

// Also export the class for custom instances
export { AptosClientWrapper };

// Export network configurations for reference
export { NETWORK_CONFIG, MODULE_ADDRESSES };