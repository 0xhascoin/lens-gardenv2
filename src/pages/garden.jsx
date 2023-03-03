
import React from "react";
import Header from "../components/header";
import bggarden2 from "../styles/images/bggarden2.jpeg"
import ProfileDetails from '../components/profileDetails';
import PointsCalculation from '../components/pointsCalculation';
import Points from '../components/points';
import followings from '../styles/images/stats/followings.png';
import followers from '../styles/images/stats/followers.png';
import posts from '../styles/images/stats/posts.png';
import comments from '../styles/images/stats/comments.png';
import collects from '../styles/images/stats/collects.png';
import mirrors from '../styles/images/stats/mirrors.png';

import { useState, useEffect } from 'react';
import { client, myStats } from '../../api/lensApi';
import LensProfileStats from '../components/lensProfileStats';
import Footer from '../components/footer';
import GardenStats from '../components/gardenStats';
import { useNavigate } from 'react-router-dom';
import MintNft from "../components/mintNft";
import { checkIfUserExists } from "../../api/firebase";



const Loading = () => (
  <div className="h-screen w-full flex justify-center place-items-center	">

    <div role="status">
      <svg aria-hidden="true" className="w-16 h-16 mr-2 text-zinc-800 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>

)

const Garden = () => {

  const [connecting, setConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileFound, setProfileFound] = useState(false);
  const [minted, setMinted] = useState(false);

  const navigate = useNavigate();

  const checkIfMinted = () => {
    const alreadyMinted = localStorage.getItem('minted');

    if (alreadyMinted === null) {
      console.log("Not Minted.");
      setMinted(false);
      return
    }

    if (alreadyMinted === 'true') {
      console.log("Minted.");
      setMinted(true);
    }
  }


  const fetchLensProfile = async (address) => {
    try {
      setLoadingProfile(true);
      // console.log("Loading Profile....")
      const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
      // console.log("Data: ", items[0]);
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        setProfile(items[0]);
        // await setupProfileInDB(items[0].ownedBy, items[0]);
        // console.log("Found Profile.")
        setProfileFound(true);
      }
      setLoadingProfile(false);
      // console.log("Finished Loading Profile....")

    } catch (error) {
      console.log(error);
      setProfileFound(false);
      setLoadingProfile(false);
    }
  };

  const setupProfileInDB = async (address, obj) => {
    // console.log("Address: ", address);
    // console.log("obj: ", obj);
    // await checkIfUserExists(address, obj);
    // console.log("User in db: ", user);
    // setProfile(user);
  }


  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      // console.log("Make sure you have metamask!");
      return;
    } else {
      // console.log("We have the ethereum object", ethereum);
    }

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    // console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Goerli test network
    const goerliChainId = "0x5";
    if (chainId !== goerliChainId) {
      alert("You are not connected to the Goerli Test Network!");
      navigate("/");
    }

    setConnecting(true);

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      // console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      await fetchLensProfile(account);
      setConnecting(false)
    } else {
      // console.log("No authorized account found");
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

      // console.log("Connected", accounts[0]);
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
    checkIfMinted()
  }, []);

  const renderConnected = () => {
    if (currentAccount === '') {
      if (connecting) {
        return <Loading />
      } else {
        navigate("/");
      }
    } else {
      return <>{renderPage()}</>;
    }
  };

  const renderPage = () => {
    if (loadingProfile) {
      return <Loading />;
    } else {
      if (!profileFound) {
        navigate("/");
      } else {
        return (

          <>
            <Header
              connectWallet={connectWallet}
              connecting={connecting}
              currentAccount={currentAccount}
              loadingProfile={loadingProfile}
              profileFound={profileFound}
              profile={profile}
            />
            {!minted && (
              <MintNft address={profile.ownedBy} />
            )}

            <LensProfileStats
              profile={profile}
            />
            
              <GardenStats
                profile={profile}
              />

            <Footer />

          </>
        );
      }
    }
  };

  return (
    <div className="font relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/3439d6e8-9981-42a7-964f-a9e8ce18af84/grid_0.png)' }}>
      {renderConnected()}
    </div>
  );
};

export default Garden;
