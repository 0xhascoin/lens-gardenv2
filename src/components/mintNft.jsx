import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { abi } from '../../constants/abi';
import LoadingSpinner from './loadingSpinner';
import { mintedNFT } from '../../api/firebase';

const CONTRACT_ADDRESS = "0xc223b06640073904421854dfe228A629eBd9A443";


const MintNft = ({ address }) => {

    const [loadingMint, setLoadingMint] = useState(false);
    const [minted, setMinted] = useState(false);
    const [mintedUrl, setMintedUrl] = useState(null);

    const askContractToMintNft = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                setLoadingMint(true);
                // console.log("Going to pop wallet now to pay gas...")
                const uri = `https://lg-server.onrender.com/${address}`
                let nftTxn = await connectedContract.makeAnEpicNFT(uri);

                // console.log("Mining...please wait.")
                await nftTxn.wait();

                

                // setLoadingMint(false);
                // console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

            } else {
                // console.log("Ethereum object doesn't exist!");
                setLoadingMint(false);
            }
        } catch (error) {
            // console.log(error);
            setLoadingMint(false);
        }
    }


    const setupEventListener = async () => {
        // Most of this looks the same as our function askContractToMintNft
        try {
            const { ethereum } = window;

            if (ethereum) {
                // Same stuff again
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                // THIS IS THE MAGIC SAUCE.
                // This will essentially "capture" our event when our contract throws it.
                // If you're familiar with webhooks, it's very similar to that!
                connectedContract.on("NewNFTMinted", async (from, tokenId) => {
                    // console.log(from, tokenId.toNumber())
                    setMintedUrl(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
                    await mintedNFT(address);
                    window.location.reload();
                    setMinted(true);
                    setLoadingMint(false);
                });

                // console.log("Setup event listener!")

            } else {
                // console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            // console.log(error)
        }
    }


    useEffect(() => {
        setupEventListener();
    }, [])

    const renderMint = () => {
        if (loadingMint) {
            return (
                <div className="flex justify-center my-3"><LoadingSpinner /></div>
            )
        } else {
            if (!minted) {
                return (
                    <button onClick={askContractToMintNft} className='nft flex rounded-full text-l whitespace-nowrap my-3 flex-wrap border-2 border-emerald-600 min-w-1/6 py-2 px-4 justify-center mx-auto bg-emerald-600 text-white'>Mint an NFT</button>

                )
            }
        }
    }

    return (
        <div className='py-6'>
            <div className="text-center mt-6">
                <h2 className='text-white text-2xl mb-3'>Mint your Lens Garden NFT Here</h2>
            </div>
            {renderMint()}
        </div>
    )
}

export default MintNft