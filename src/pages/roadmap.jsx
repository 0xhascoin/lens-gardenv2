import React from 'react'
import Team from '../components/team'
import rmhor from '../styles/images/rmhor.jpeg';
import rmver from "../styles/images/rmver.jpeg"

import { useState, useEffect } from 'react';
import { client, myStats } from '../../api/lensApi';
import { checkIfUserExists } from '../../api/firebase';
import Header from '../components/header';
import Footer from '../components/footer';

const Roadmap = () => {
    const [connecting, setConnecting] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileFound, setProfileFound] = useState(false);

    const fetchLensProfile = async (address) => {
        try {
            setLoadingProfile(true);
            // console.log("Loading Profile....")
            const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
            // console.log("Data: ", items[0]);
            if (items[0] == undefined) {
                setProfileFound(false);
            } else {
                // setProfile(items[0]);
                await setupProfileInDB(items[0].ownedBy, items[0]);
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
        const user = await checkIfUserExists(address, obj);
        // console.log("User in db: ", user);
        setProfile(user);
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
    }, []);
    return (
        <div className="font relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/3439d6e8-9981-42a7-964f-a9e8ce18af84/grid_0.png)' }}>
            {/* Header */}
            <Header
                connectWallet={connectWallet}
                connecting={connecting}
                currentAccount={currentAccount}
                loadingProfile={loadingProfile}
                profileFound={profileFound}
                profile={profile}
            />

            {/* About the project */}

            {/* About the team */}
           <div className='flex sm:w-3/4 w-full justify-center items-center mx-auto'>
                <img src={rmhor} className="dont-displaysm border-2 border-white rounded-lg mt-2" />
                <img src={rmver} className="dont-displaymd border-2 border-white rounded-lg mt-2" />
           </div>

          
            <Team />
         

            {/* Roadmap */}
<Footer />
            {/* Footer */}
            
        </div>
    )
}

export default Roadmap