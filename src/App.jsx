// import './App.css'
// import { useState, useEffect } from 'react';
// import GetLensProfile from './components/getLensProfile';
// import LoadingSpinner from './components/loadingSpinner';
// import Header from './components/header';

// function App() {
//   const [connecting, setConnecting] = useState(false);
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [profileFound, setProfileFound] = useState(false);

//   const checkIfWalletIsConnected = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have metamask!");
//       return;
//     } else {
//       console.log("We have the ethereum object", ethereum);
//     }

//     let chainId = await ethereum.request({ method: 'eth_chainId' });
//     console.log("Connected to chain " + chainId);

//     // String, hex code of the chainId of the Goerli test network
//     const goerliChainId = "0x5";
//     if (chainId !== goerliChainId) {
//       alert("You are not connected to the Goerli Test Network!");
//     }

//     setConnecting(true);

//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account:", account);
//       setCurrentAccount(account);
//       setConnecting(false)
//     } else {
//       console.log("No authorized account found");
//       setConnecting(false);
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       const { ethereum } = window;

//       if (!ethereum) {
//         alert("Get MetaMask!");
//         return;
//       }

//       setConnecting(true);
//       const accounts = await ethereum.request({ method: "eth_requestAccounts" });

//       console.log("Connected", accounts[0]);
//       setCurrentAccount(accounts[0]);
//       setConnecting(false);

//     } catch (error) {
//       console.log(error);
//       setConnecting(false);
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnected();
//   }, []);

//   const renderConnected = () => {
//     if (connecting) {
//       return <LoadingSpinner />
//     } else {
//       if (currentAccount === "") {
//         return <button onClick={connectWallet} className="bg-zinc-800	text-white outline-none focus:outline-red-400 transition-all">Connect Wallet</button>
//       } else {
//         return (
//           <GetLensProfile
//             currentAccount={currentAccount}
//             setProfile={setProfile}
//             profile={profile}
//             setLoadingProfile={setLoadingProfile}
//             loadingProfile={loadingProfile}
//             setProfileFound={setProfileFound}
//             profileFound={profileFound}

//           />
//         )
//       }
//     }
//   }

//   return (
//     <div className='App'>
//       <Header />
//       <div className="content">
//         {renderConnected()}
//       </div>
//     </div>
//   )
// }

// export default App
