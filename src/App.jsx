import './App.css'
import { useState, useEffect } from 'react';
import GetLensProfile from './components/getLensProfile';
import LoadingSpinner from './components/loadingSpinner';
import lensgarden1 from '/src/images/lensgarden1.jpeg';
import MintNft from './components/mintNft';


function App() {
  const [connecting, setConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileFound, setProfileFound] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Goerli test network
    const goerliChainId = "0x5";
    if (chainId !== goerliChainId) {
      alert("You are not connected to the Goerli Test Network!");
    }

    setConnecting(true);

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setConnecting(false)
    } else {
      console.log("No authorized account found");
      setConnecting(false);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      setConnecting(true);
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setConnecting(false);

    } catch (error) {
      console.log(error);
      setConnecting(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const renderConnected = () => {
    if (connecting) {
      return <LoadingSpinner />
   
    } else {
      if (currentAccount === "")  {
        return (
        <div>
        <button onClick={connectWallet} className="flex items-center justify-center mx-auto	text-white bg-gradient-to-r from-green-600 to-green-300 hover:ring-4 ring-green-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">Connect Wallet</button>
      </div>
        )
        
      
      } else {
        return (
          <GetLensProfile
            currentAccount={currentAccount}
            setProfile={setProfile}
            profile={profile}
            setLoadingProfile={setLoadingProfile}
            loadingProfile={loadingProfile}
            setProfileFound={setProfileFound}
            profileFound={profileFound}

          />
        )
      }
    }
  }

  return (
    <div className="App">
      {renderConnected()}
    </div>
  )
}

export default App
