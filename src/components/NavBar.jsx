// // src/components/NavBar.jsx
// import React from 'react';

// function NavBar({ walletAddress, onConnect, profileTab, setProfileTab }) {
//   return (
//     <nav className="flex justify-between items-center mb-6 border-b pb-4">
//       <h1 className="text-3xl font-bold">🪙 DeFi Dashboard</h1>
//       <div className="flex gap-2">
//         <button
//           onClick={onConnect}
//           className="px-4 py-2 bg-green-600 text-white rounded shadow"
//         >
//           {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
//         </button>
//         <button
//           onClick={() => setProfileTab(!profileTab)}
//           className="px-4 py-2 bg-gray-700 text-white rounded shadow"
//         >
//           {profileTab ? '🏠 Home' : '📂 Profile'}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;



// import React from 'react';
// import { connectPetraWallet } from '../utils/aptosClient';

// function NavBar({ walletAddress, onConnect, profileTab, setProfileTab, setWalletAddress }) {
//   // Handler for Petra Wallet
//   const handleConnectPetra = async () => {
//     try {
//       const { address } = await connectPetraWallet();
//       setWalletAddress(address);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <nav className="flex justify-between items-center mb-6 border-b pb-4">
//       <h1 className="text-3xl font-bold">🪙 DeFi Dashboard</h1>
//       <div className="flex gap-2">
//         <button
//           onClick={onConnect}
//           className="px-4 py-2 bg-green-600 text-white rounded shadow"
//         >
//           {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Martian'}
//         </button>
//         <button
//           onClick={handleConnectPetra}
//           className="px-4 py-2 bg-blue-600 text-white rounded shadow"
//         >
//           Connect Petra
//         </button>
//         <button
//           onClick={() => setProfileTab(!profileTab)}
//           className="px-4 py-2 bg-gray-700 text-white rounded shadow"
//         >
//           {profileTab ? '🏠 Home' : '📂 Profile'}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;



// import React, { useState, useEffect } from 'react';
// import { connectWallet, getAvailableWallets, disconnectWallet } from '../utils/connectWallet';

// function NavBar({ walletAddress, onConnect, profileTab, setProfileTab, setWalletAddress }) {
//   const [connectedWallet, setConnectedWallet] = useState(null);
//   const [availableWallets, setAvailableWallets] = useState([]);
//   const [showWalletDropdown, setShowWalletDropdown] = useState(false);

//   // Check available wallets on component mount
//   useEffect(() => {
//     const wallets = getAvailableWallets();
//     setAvailableWallets(wallets);
//   }, []);

//   // Auto-connect to any available wallet
//   const handleConnectAuto = async () => {
//     try {
//       const wallet = await connectWallet();
//       setWalletAddress(wallet.address);
//       setConnectedWallet(wallet);
//       setShowWalletDropdown(false);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Disconnect wallet
//   const handleDisconnect = async () => {
//     try {
//       if (connectedWallet) {
//         await disconnectWallet(connectedWallet.wallet);
//         setWalletAddress(null);
//         setConnectedWallet(null);
//       }
//     } catch (err) {
//       console.error('Disconnect error:', err);
//       // Force disconnect even if API call fails
//       setWalletAddress(null);
//       setConnectedWallet(null);
//     }
//   };

//   // Toggle wallet dropdown
//   const toggleWalletDropdown = () => {
//     setShowWalletDropdown(!showWalletDropdown);
//   };

//   return (
//     <nav className="flex justify-between items-center mb-6 border-b pb-4">
//       <h1 className="text-3xl font-bold">💳 ELEGENT Card</h1>
      
//       <div className="flex gap-2 items-center">
//         {/* Wallet Connection Section */}
//         <div className="relative">
//           {walletAddress ? (
//             <div className="flex items-center gap-2">
//               {/* Connected Wallet Display */}
//               <div className="flex items-center gap-2 px-3 py-2 bg-green-100 border border-green-300 rounded-lg">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-sm text-green-700 font-medium">
//                   {connectedWallet?.wallet || 'Connected'}
//                 </span>
//                 <span className="text-sm text-gray-600">
//                   {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
//                 </span>
//               </div>
              
//               {/* Disconnect Button */}
//               <button
//                 onClick={handleDisconnect}
//                 className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
//               >
//                 Disconnect
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               {/* Auto Connect Button */}
//               <button
//                 onClick={handleConnectAuto}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Connect Wallet
//               </button>
              
//               {/* Wallet Selection Dropdown */}
//               {availableWallets.length > 1 && (
//                 <div className="relative">
//                   <button
//                     onClick={toggleWalletDropdown}
//                     className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                   >
//                     ⚙️
//                   </button>
                  
//                   {showWalletDropdown && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       <div className="py-1">
//                         <div className="px-3 py-2 text-sm text-gray-500 border-b">
//                           Available Wallets:
//                         </div>
//                         {availableWallets.map((wallet) => (
//                           <div
//                             key={wallet}
//                             className="px-3 py-2 text-sm text-gray-700 flex items-center gap-2"
//                           >
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             {wallet}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Profile Toggle Button */}
//         <button
//           onClick={() => setProfileTab(!profileTab)}
//           className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           {profileTab ? '🏠 Home' : '📂 Profile'}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;











import React, { useState, useEffect } from "react";
import {
  connectWallet,
  getAvailableWallets,
  disconnectWallet,
} from "../utils/connectWallet";

function NavBar({
  walletAddress,
  profileTab,
  setProfileTab,
  setWalletAddress,
}) {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check available wallets on component mount
  useEffect(() => {
    const checkWallets = () => {
      const wallets = getAvailableWallets();
      setAvailableWallets(wallets);
      console.log("Available wallets detected:", wallets);
    };

    checkWallets();

    // Re-check wallets every 2 seconds in case user installs a wallet
    const interval = setInterval(checkWallets, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-connect to any available wallet
  const handleConnectAuto = async () => {
    if (availableWallets.length === 0) {
      alert(
        "No Aptos wallets detected.\n\nPlease install one of the following:\n🔸 Martian: https://martianwallet.xyz/\n🔹 Petra: https://petra.app/\n🟣 Fewcha: https://fewcha.app/\n🟢 Rise: https://risewallet.io/"
      );
      return;
    }

    setIsLoading(true);
    try {
      const wallet = await connectWallet();
      setWalletAddress(wallet.address);
      setConnectedWallet(wallet);
      setShowWalletDropdown(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const handleDisconnect = async () => {
    try {
      if (connectedWallet) {
        await disconnectWallet(connectedWallet.wallet);
        setWalletAddress(null);
        setConnectedWallet(null);
      }
    } catch (err) {
      console.error("Disconnect error:", err);
      // Force disconnect even if API call fails
      setWalletAddress(null);
      setConnectedWallet(null);
    }
  };

  // Toggle wallet dropdown
  const toggleWalletDropdown = () => {
    setShowWalletDropdown(!showWalletDropdown);
  };

  // Get wallet icon
  const getWalletIcon = (walletName) => {
    const icons = {
      Martian: "🔸",
      Petra: "🔹",
      Fewcha: "🟣",
      Rise: "🟢",
    };
    return icons[walletName] || "💼";
  };

  return (
    <nav className="flex justify-between items-center mb-6 border-b pb-4">
      <h1 className="text-3xl font-bold">💳 ELEGENT Card</h1>

      <div className="flex gap-2 items-center">
        {/* Wallet Detection Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
          <span className="text-xs text-gray-600">Wallets:</span>
          {availableWallets.length > 0 ? (
            <div className="flex gap-1">
              {availableWallets.map((wallet) => (
                <span
                  key={wallet}
                  className="text-xs"
                  title={`${wallet} detected`}
                >
                  {getWalletIcon(wallet)}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-red-500">None detected</span>
          )}
        </div>

        {/* Wallet Connection Section */}
        <div className="relative">
          {walletAddress ? (
            <div className="flex items-center gap-2">
              {/* Connected Wallet Display */}
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 border border-green-300 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  {getWalletIcon(connectedWallet?.wallet)}{" "}
                  {connectedWallet?.wallet || "Connected"}
                </span>
                <span className="text-sm text-gray-600">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
              </div>

              {/* Disconnect Button */}
              <button
                onClick={handleDisconnect}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Auto Connect Button */}
              <button
                onClick={handleConnectAuto}
                disabled={isLoading}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  availableWallets.length > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </button>

              {/* Wallet Selection Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleWalletDropdown}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="View available wallets"
                >
                  ⚙️
                </button>

                {showWalletDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b">
                        Wallet Detection Status
                      </div>

                      {availableWallets.length > 0 ? (
                        <>
                          <div className="px-3 py-2 text-xs text-green-600 bg-green-50">
                            ✅ {availableWallets.length} wallet(s) detected:
                          </div>
                          {availableWallets.map((wallet) => (
                            <div
                              key={wallet}
                              className="px-3 py-2 text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-50"
                            >
                              <span className="text-lg">
                                {getWalletIcon(wallet)}
                              </span>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {wallet} Wallet
                                </div>
                                <div className="text-xs text-green-600">
                                  Ready to connect
                                </div>
                              </div>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div className="px-3 py-2 text-xs text-red-600 bg-red-50">
                            ❌ No wallets detected
                          </div>
                          <div className="px-3 py-2 text-xs text-gray-500">
                            Install a compatible wallet:
                          </div>
                          {["Martian", "Petra", "Fewcha", "Rise"].map(
                            (wallet) => (
                              <div
                                key={wallet}
                                className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2"
                              >
                                <span className="text-lg opacity-50">
                                  {getWalletIcon(wallet)}
                                </span>
                                <div className="flex-1">
                                  <div>{wallet} Wallet</div>
                                  <div className="text-xs">Not installed</div>
                                </div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                              </div>
                            )
                          )}
                          <div className="px-3 py-2 border-t">
                            <button
                              onClick={() =>
                                window.open(
                                  "https://aptos.dev/integration/wallet-adapter-concept/",
                                  "_blank"
                                )
                              }
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              View installation guide →
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Toggle Button */}
        <button
          onClick={() => setProfileTab(!profileTab)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {profileTab ? "🏠 Home" : "📂 Profile"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
