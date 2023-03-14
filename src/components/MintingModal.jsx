import { nftData } from '../../constants/nftMetadata';
import { useState } from 'react';

import LoadingSpinner from './loadingSpinner';
import { mintLevelNFT } from '../../api/firebase';

const Tabs = ({ setTab, tab }) => {
    const styles = {
        selected: 'inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group',
        notSelected: 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group',
        selectedIcon: 'w-5 h-5 mr-2 text-blue-600 dark:text-blue-500',
        notSelectedIcon: 'w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300',
    }
    return (
        <div class="border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li class="mr-2">
                    <a href="#" onClick={() => setTab(0)} className={tab === 0 ? styles.selected : styles.notSelected} aria-current="page">
                        <svg aria-hidden="true" className={tab === 0 ? styles.selectedIcon : styles.notSelectedIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Available NFTs
                    </a>
                </li>
                <li class="mr-2" onClick={() => setTab(1)}>
                    <a href="#" className={tab === 1 ? styles.selected : styles.notSelected}>
                        <svg aria-hidden="true" className={tab === 1 ? styles.selectedIcon : styles.notSelectedIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Minted NFTs
                    </a>
                </li>
            </ul>
        </div>
    )
}

const Item = ({ imgUrl, tab, nft, address }) => {
    console.log("ITEM NFT: ", nft.index);
    const [loadingMint, setLoadingMint] = useState(false);

    const renderMint = () => {
        if (loadingMint) {
            return (
                <LoadingSpinner />
            )
        } else {
            return (
                <button onClick={mintLevelNft} type="button" className="text-white p-1 px-4 text-xs bg-emerald-400 rounded-lg">Mint</button>

            )
        }
    }

    const mintLevelNft = async () => {
        setLoadingMint(true);
        console.log("mintLevelNft", address)
        await mintLevelNFT(address, nft.index)
    };

    // const mintSetup = async () => {
    //     try {
    //         const { ethereum } = window;

    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(ethereum);
    //             const signer = provider.getSigner();
    //             const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    //             setLoadingMint(true);
    //             // console.log("Going to pop wallet now to pay gas...")
    //             const uri = `https://lens-garden-api.hasanelmi.repl.co/api/nft/${nft.index+1}`
    //             let nftTxn = await connectedContract.mintLevelNFT(uri, nft.index+1);

    //             // console.log("Mining...please wait.")
    //             await nftTxn.wait();
                                
    //             console.log("Minted.")
    //             await mintNFT(address, nft.index);
    //             setMinted(true);




    //             // setLoadingMint(false);
    //             // console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

    //         } else {
    //             // console.log("Ethereum object doesn't exist!");
    //             setLoadingMint(false);
    //         }
    //     } catch (error) {
    //         // console.log(error);
    //         setLoadingMint(false);
    //     }
    // }

    return (
        <div>
            <div className="border border-red-500 flex justify-center">
                <img src={imgUrl} className="h-30 rounded-lg" />
            </div>
            <div className="border border-red-500 p-2 flex justify-center">
                {tab == 0 && (
                    <>{renderMint()}</>
                )}
                {tab == 1 && (

                    <button type="button" className="text-white p-1 px-4 text-xs bg-blue-400 rounded-lg">Opensea</button>
                )}

            </div>
        </div>
    )
}

const AvailableNFTsTab = ({ level, mintedLevels, address }) => {
    let minted = mintedLevels;
    let availableNfts = [];

    for (let i = 0; i < minted.length; i++) {
        if (!minted[i]) {
            availableNfts.push(nftData[i])
        }

    }
    availableNfts = availableNfts.filter(nft => nft.unlocksAtLevel <= level)
    return (
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-1 border border-white">
            {availableNfts.map((nft) => (
                <Item imgUrl={nft.imageUrl} tab={0} nft={nft} address={address} />
            ))}

        </div>
    )
}
const MintedNFTsTab = ({ level, mintedLevels }) => {
    let minted = mintedLevels;
    let availableNfts = [];
    for (let i = 0; i < minted.length; i++) {
        if (minted[i]) {
            availableNfts.push(nftData[i])
        }

    }


    availableNfts = availableNfts.filter(nft => nft.unlocksAtLevel <= level)
    return (
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-1 border border-white">
            {availableNfts.map((nft) => (
                <Item imgUrl={nft.imageUrl} tab={1} nft={nft} />
            ))}

        </div>
    )
}

export default function MintingModal({ setShowModal, profile, level, mintedLevels }) {
    const [tab, setTab] = useState(0);

    console.log("Addres: ", profile.ownedBy)

    return (
        <div tabIndex="-1" aria-hidden="true" className="border border-red-700 fixed top-0 left-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-black bg-opacity-70">
            <div className="relative w-full h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                        <Tabs tab={tab} setTab={setTab} />
                        <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only" >Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {tab === 0 && (
                            <AvailableNFTsTab level={level} mintedLevels={mintedLevels} address={profile.ownedBy} />
                        )}
                        {tab === 1 && (
                            <MintedNFTsTab level={level} mintedLevels={mintedLevels} />
                        )}
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}