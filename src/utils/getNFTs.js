import axios from 'axios';

export const fetchNFTs = async (address) => {
  const url = `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`;
  try {
    const res = await axios.get(url);
    return res.data.filter(r => r.type.includes('TokenStore'));
  } catch (err) {
    console.error('NFT fetch error:', err);
    return [];
  }
};
