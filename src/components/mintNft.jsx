import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { abi } from '../../constants/abi';
import LoadingSpinner from './loadingSpinner';
import { mintNFT } from '../../api/firebase';
// import { mintedNFT } from '../../api/firebase';

const CONTRACT_ADDRESS = "0x0AF125138Bfaf8202D6F4335eABa1aA9b7cF0dFE";


const MintNft = ({ address, setMinted }) => {

    const [loadingMint, setLoadingMint] = useState(false);
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
                const uri = `https://lens-garden-api.hasanelmi.repl.co/api/address/${address}`
                let nftTxn = await connectedContract.makeAnEpicNFT(uri);

                // console.log("Mining...please wait.")
                await nftTxn.wait();
                                
                console.log("Minted.")
                await mintNFT(address);
                setMinted(true);




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
                //                 connectedContract.on("NewNFTMinted", async (from, tokenId) => {
                //                     // console.log(from, tokenId.toNumber())
                //                     setMintedUrl(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
                //                     setMinted(true);
                //                     setLoadingMint(false);
                //                 });

                // console.log("Setup event listener!")

            } else {
                // console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            // console.log(error)
        }
    }



    const renderMint = () => {
        if (loadingMint) {
            return (
                <div className="flex justify-center my-3"><LoadingSpinner /></div>
            )
        } else {
            return (
                <button onClick={askContractToMintNft} className='font flex rounded-full text-lg whitespace-nowrap my-3 flex-wrap w-1/2 sm:w-1/6 py-2 px-4 justify-center mx-auto text-white focus:ring-4 focus:outline-none focus:ring-green-500 bg-gradient-to-r from-green-400 to-green-700  hover:bg-green-500'>Mint NFT</button>

            )
        }
    }

    return (
        <div className='py-6'>
            <div className="text-center mt-6">
                <h2 className='font text-white text-2xl mb-3'>Mint your Lens Garden NFT here</h2>
            </div>
            {renderMint()}
        </div>
    )
}

export default MintNft
