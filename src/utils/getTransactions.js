import axios from 'axios';

export const fetchTransactionHistory = async (address) => {
  const url = `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/transactions`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error('Transaction fetch error:', err);
    return [];
  }
};

