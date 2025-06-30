export const connectMartianWallet = async () => {
  if (!window.martian) {
    throw new Error('Martian Wallet not installed.');
  }

  try {
    const response = await window.martian.connect();
    return {
      address: response.address,
      status: 'connected',
    };
  } catch (error) {
    throw new Error('Failed to connect to Martian Wallet.');
  }
};
