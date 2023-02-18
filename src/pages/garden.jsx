import '../styles/garden.css'
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


const Garden = () => {

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
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bggarden2})` }}>
      <Header
        connectWallet={connectWallet}
        connecting={connecting}
        currentAccount={currentAccount}
        loadingProfile={loadingProfile}
        profileFound={profileFound}
        profile={profile}
      />

      <LensProfileStats
        connectWallet={connectWallet}
        connecting={connecting}
        currentAccount={currentAccount}
        loadingProfile={loadingProfile}
        profileFound={profileFound}
        profile={profile}
      />





      {/* <div className="relative">

        <div className="fixed bottom-0 left-0 right-0 text-center">
          <Points imageSrc={posts} imageTitle={"30 XP"} />
          <Points imageSrc={comments} imageTitle={"20 XP"} />
        </div>
        <div className="fixed bottom-0 left-0 text-center">
          <Points imageSrc={followings} imageTitle={"10 XP"} />
          <Points imageSrc={followers} imageTitle={"50 XP"} />
        </div>
        <div className="fixed bottom-0 right-0 text-center">
          <Points imageSrc={collects} imageTitle={"20 XP"} />
          <Points imageSrc={mirrors} imageTitle={"30 XP"} />
        </div>
      </div> */}
    </div>
  );
};

export default Garden;
