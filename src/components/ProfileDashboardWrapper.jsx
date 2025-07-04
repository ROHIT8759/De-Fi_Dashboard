import React, { useEffect, useState } from 'react';
import ProfileDashboard from './ProfileDashboard';

const walletAddress = 'cc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec';
const APTOS_NODE_URL = 'https://fullnode.testnet.aptoslabs.com';

const ProfileDashboardWrapper = () => {
  const [aptosBalance, setAptosBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const res = await fetch(`${APTOS_NODE_URL}/v1/accounts/${walletAddress}/resources`);
      const data = await res.json();
      const aptosCoin = data.find(d => d.type.includes('AptosCoin'));
      const balance = parseInt(aptosCoin.data.coin.value) / 1e8;
      setAptosBalance(balance);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const mockConnectedWallet = {
    provider: {
      signAndSubmitTransaction: async (payload) => {
        alert('Simulated transaction:\n' + JSON.stringify(payload, null, 2));
        return { hash: 'simulated_hash' };
      }
    }
  };

  return (
    <ProfileDashboard
      walletAddress={walletAddress}
      aptosBalance={aptosBalance}
      connectedWallet={mockConnectedWallet}
    />
  );
};

export default ProfileDashboardWrapper;
