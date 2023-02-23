import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { abi } from '../../constants/abi';
import LoadingSpinner from './loadingSpinner';

const CONTRACT_ADDRESS = "0x7c96FA931896815DCC2e62AeE79216d7762B3175";


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
                console.log("Going to pop wallet now to pay gas...")
                const uri = `https://lg-server.onrender.com/${address}`
                let nftTxn = await connectedContract.makeAnEpicNFT(uri);

                console.log("Mining...please wait.")
                await nftTxn.wait();

                

                // setLoadingMint(false);
                console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

            } else {
                console.log("Ethereum object doesn't exist!");
                setLoadingMint(false);
            }
        } catch (error) {
            console.log(error);
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
                connectedContract.on("NewNFTMinted", (from, tokenId) => {
                    console.log(from, tokenId.toNumber())
                    setMintedUrl(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
                    setMinted(true);
                    setLoadingMint(false);
                });

                console.log("Setup event listener!")

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
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
            if (minted) {
                return (
                    <>
                        <div className='my-3'>
                            <a href={mintedUrl}>{mintedUrl}</a>
                            <p className="text-green-400">NFT Minted Succesfully</p>
                        </div>

                        <button onClick={askContractToMintNft} className='my-3 bg-zinc-800 text-white focus:outline-red-400 transition-all'>Mint an NFT</button>
                    </>
                )
            } else {
                return (
                    <button onClick={askContractToMintNft} className='my-3 bg-zinc-800 text-white focus:outline-red-400 transition-all'>Mint an NFT</button>
                )
            }
        }
    }

    return (
        <div>
            {renderMint()}
        </div>
    )
}

export default MintNft