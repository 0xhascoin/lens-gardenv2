import '../styles/home.css'
import { useState, useEffect } from 'react';
import { client, myStats } from '../../api/lensApi';
import { checkIfUserExists } from '../../api/firebase';

import ProfileDetails from '../components/profileDetails';
// Components
import Header from '../components/header'
import Hero from '../components/hero'
import NftDetails from '../components/nftDetails'
import ImageCard from '../components/ImageCard';
import Footer from '../components/footer';
import PointsCalculation from '../components/pointsCalculation';
import Team from '../components/team';


const Home = () => {

  const [connecting, setConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileFound, setProfileFound] = useState(false);

  const fetchLensProfile = async (address) => {
    try {
      // Start Loading Profile from Lens API
      setLoadingProfile(true);
      console.log("Loading Profile....");

      // Destructure the object
      const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();

      // Profile not found / doesn't exist
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        // Profile found
        setProfile(items[0]);
        console.log("Profile: ", items[0])

        // Add the profile to the firebase DB
        await setupProfileInDB(items[0].ownedBy, items[0]);
        console.log("Found Profile.");
        setProfileFound(true);
      }

      // Finished Loading Profile
      setLoadingProfile(false);
      console.log("Finished Loading Profile....");

    } catch (error) {
      console.log(error);
      setProfileFound(false);
      setLoadingProfile(false);
    }
  };

  // Setup the profile in the firebase DB
  const setupProfileInDB = async (address, obj) => {
    await checkIfUserExists(address, obj);
  }


  // Check if the wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    // Metamask is not installed
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    // Get the current collected chain
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Goerli test network
    const goerliChainId = "0x5";
    const mumbaiChainId = "0x13881";

    // Not connected to goerli, redirect to home page
    if (chainId !== mumbaiChainId) {
      alert("You are not connected to the Mumbai Test Network!");
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: mumbaiChainId }], // chainId must be in hexadecimal numbers
      });
    } else {
      // alert("Connected to mumbai")
    }

    setConnecting(true);

    const accounts = await ethereum.request({ method: 'eth_accounts' });


    if (accounts.length !== 0) {
      const account = accounts[0]; // Get the first connected account
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      // Fetch the lens profile connected to that account
      await fetchLensProfile(account);
    } else {
      console.log("No authorized account found");
    }

    // Finished connecting
    setConnecting(false);
  };

  // Connect the wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      // Metamask not installed.
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

       // Get the current collected chain
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);
      
      const goerliChainId = "0x5";
      const mumbaiChainId = "0x13881";

      // Not connected to goerli, redirect to home page
      if (chainId !== mumbaiChainId) {
        alert("You are not connected to the Mumbai Test Network!");
        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: mumbaiChainId }], // chainId must be in hexadecimal numbers
        });
      } else {
        // alert("Connected to mumbai")
      }

      setConnecting(true);

      // Request the account of in the Metamask
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      await fetchLensProfile(accounts[0]);
    } catch (error) {
      console.log(error);
    }

    // Finished connecting.
    setConnecting(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="home">
      <Header
        connectWallet={connectWallet}
        connecting={connecting}
        currentAccount={currentAccount}
        loadingProfile={loadingProfile}
        profileFound={profileFound}
        profile={profile}
      />
      <Hero />
      <NftDetails />
      <div className="mb-20"></div>
      <Footer />
    </div>
  )
}

export default Home
