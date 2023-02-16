import '../styles/home.css'
import { useState, useEffect } from 'react';
import { client, myStats } from '../../api/lensApi';

import ProfileDetails from '../components/profileDetails';
// Components
import Header from '../components/header'
import Hero from '../components/hero'
import NftDetails from '../components/nftDetails'
import bggarden from '../styles/images/bggarden.png';
import ImageCard from '../components/ImageCard';
import Tree from '../styles/images/Tree.jpg';


const Home = () => {

  const [connecting, setConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileFound, setProfileFound] = useState(false);

  const fetchLensProfile = async (address) => {
    try {
      setLoadingProfile(true);
      console.log("Loading Profile....")
      const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
      console.log("Data: ", items[0]);
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        setProfile(items[0]);
        setProfileFound(true);
        console.log("Found Profile.")
      }
      setLoadingProfile(false);
      console.log("Finished Loading Profile....")

    } catch (error) {
      console.log(error);
      setProfileFound(false);
      setLoadingProfile(false);
    }
  };


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
      await fetchLensProfile(account);
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
      await fetchLensProfile(accounts[0]);
      setConnecting(false);

    } catch (error) {
      console.log(error);
      setConnecting(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="home">

      {/* <div className="w-full max-h-screen ">
        <img src={garden} className="w-full  bg-no-repeat bg-cover bg-center h-screen sm:h-auto md:h-screen" />
        </div> */}



      <Header
        connectWallet={connectWallet}
        connecting={connecting}
        currentAccount={currentAccount}
        loadingProfile={loadingProfile}
        profileFound={profileFound}
        profile={profile}
      />
      <Hero />
      {/* <div className='bg-black py-6 nfts'>
          <h1 className='text-white text-center mb-10 text-3xl'>NFTs</h1>
          <div className='flex justify-between m-auto mb-10 border border-white' >
            <ImageCard className="" imageSrc={logo1} imageText="1" />
            <ImageCard className="" imageSrc={logo1} imageText="2" />
            <ImageCard className="" imageSrc={logo1} imageText="3" />
          </div>
        </div> */}
      <div className="nfts flex justify-center">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-3">
          <ImageCard imageSrc={'https://cdn.midjourney.com/029fea47-52b8-448e-9533-e6ad9b850e7f/grid_0.png'} imageTitle={"One"} imageText={"Body"} imageDesc={"Description"}/>
          <ImageCard imageSrc={'https://cdn.midjourney.com/a99a2afd-2c68-46b2-b0fc-60252eb5d408/grid_0.png'}/>
          <ImageCard imageSrc={'https://cdn.midjourney.com/feac2f1f-422d-44b4-97c7-b16a2b2707ca/grid_0.png'}/>
          <ImageCard imageSrc={'https://cdn.midjourney.com/262dd3af-4b2e-47f7-afdb-41b683a366c2/grid_0.png'}/>
          <ImageCard imageSrc={'https://cdn.midjourney.com/b4fa6557-3bb7-492d-8667-86d21494bee1/grid_0.png'}/>
          <ImageCard imageSrc={Tree} />
        </div>
      </div>
    </div>
  )
}

export default Home