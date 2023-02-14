import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/firebase';
import { images } from '../../constants/nftMetadata';

import LoadingSpinner from './loadingSpinner';
import MintNft from './mintNft';


const startUrl = "https://lens.infura-ipfs.io/ipfs/";


const ProfileDetails = ({ profile }) => {
    const [XP, setXP] = useState(null);
    const [LEVEL, setLEVEL] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [updatedDB, setUpdatedDB] = useState(false);


    const calculateExperience = (following, followers, posts, collects, mirrors, comments) => {
        // Following, Followers, Posts, Collects, Mirrors, Comments
        return (following * 10) + (followers * 50) + (posts * 30) + (collects * 20) + (mirrors * 30) + (comments * 20);
    }

    const calculateLevel = (experience) => {
        let level = 1;
        let threshold = 1000;
        let experienceToNextLevel = threshold;
        while (experience >= threshold) {
            level += 1;
            threshold *= 2;
        }
        experienceToNextLevel = threshold - experience;

        return { level, experienceToNextLevel };
    }

    const calculateStats = async () => {
        setLoadingStats(true);
        const { totalFollowing, totalFollowers, totalPosts, totalCollects, totalMirrors, totalComments } = profile.stats;
        const exp = calculateExperience(totalFollowing, totalFollowers, totalPosts, totalCollects, totalMirrors, totalComments);
        const level = calculateLevel(exp);
        setXP(exp);
        setLEVEL(level);
        setLoadingStats(false);

        // profile.ownedBy, profile, level
        // let obj = {...profile, NFT: { xp: exp, ...level, name: "Lens Garden NFT"}};
        let obj = {
            ...profile,
            attributes: [
                {
                    trait_type: "Level",
                    value: level.level.toString()
                },
                {
                    trait_type: "Experience to Next Level",
                    value: level.experienceToNextLevel.toString()
                },
                {
                    trait_type: "Total XP",
                    value: exp.toString()
                }
            ],
            name: "Lens Garden NFT",
            description: "Lens Garden NFT is a dynamic NFT collection that reflects your usage of the Lens Protocol in your NFT."
        }
        if (obj.attributes[0].value <= 5) { 
            obj = {...obj, image: images[0]}
        } else if (obj.attributes[0].value > 5 && obj.attributes[0].value < 11) {
            obj = {...obj, image: images[1]}
        } else if (obj.attributes[0].value >= 11 && obj.attributes[0].value <= 15) {
            obj = {...obj, image: images[2]}
        }

        const data = await getUser(profile.ownedBy, obj);
        setUpdatedDB(true);
        console.log(data);

    }

    const renderProfileDetails = () => (
        <div className="flex items-center space-x-4 mb-6 justify-center">
            <img className=" w-36 h-36 ring-8 ring-green-600 rounded" src={`${startUrl}${profile.picture.original.url.slice(7)}`} alt="profile-image" />
            <div className="font-bold text-black">
                <div className=' text-black text-bold text-lg'><span className='from-green-500 bg-gradient-to-r  to-green-200 bg-clip-text text-transparent'>@{profile.handle}</span></div>
                <div className="text-lg text-bold black"><span className='from-green-600 bg-gradient-to-r  to-green-200 bg-clip-text text-transparent'>{profile.ownedBy.slice(0, 7)}...{profile.ownedBy.slice(-5)}</span></div>
            </div>
        </div>
    );

    const renderProfileStats = () => (
        <nav className="from-green-600 bg-gradient-to-r to-green-300 flex px-5 py-3 text-white border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Following: <span className="text-black mx-1 text-sm">{profile.stats.totalFollowing}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Followers: <span className="text-black mx-1 text-sm">{profile.stats.totalFollowers}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Posts: <span className="text-black mx-1 text-sm">{profile.stats.totalPosts}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                    </p>
          

                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Collects: <span className="text-black mx-1 text-sm">{profile.stats.totalCollects}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 h-4 text-red-700 sm:w-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Comments: <span className="text-black mx-1 text-sm">{profile.stats.totalComments}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-bold text-zinc-800">
                        Mirrors: <span className="text-black mx-1 text-sm">{profile.stats.totalMirrors}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 h-4 text-purple-500 sm:w-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    </p>
                </li>
            </ol>
        </nav>
    );


    const renderExperience = () => {
        if (loadingStats) {
            return (
                <div className="flex justify-center my-3"><LoadingSpinner /></div>
            )
        } else {
            if (LEVEL !== null && XP !== null) {
                return (
                    <>
                        <p><span className='from-green-600 bg-gradient-to-r  to-green-200 bg-clip-text text-transparent text-bold text-xl'>Level:  {LEVEL.level} </span></p>
                        <p><span className='from-green-600 bg-gradient-to-r  to-green-200 bg-clip-text text-transparent text-bold text-xl'>XP to level {LEVEL.level + 1}:  {LEVEL.experienceToNextLevel} </span></p>
                        <p><span className='from-green-600 bg-gradient-to-r  to-green-200 bg-clip-text text-transparent text-bold text-xl'>Total XP: {XP} </span></p>
                        <div className="w-full bg-zinc-800 rounded-full h-2.5  mt-5">
                            <div className="bg-gradient-to-r from-green-600 to-green-300 h-2.5 rounded-full" style={{ width: `${Math.floor((XP / (LEVEL.experienceToNextLevel + XP)) * 100)}%` }}></div>
                        </div>
                    </>
                )
            }
        }
    }

    const renderMint = () => {
        if (updatedDB) {
            return (
                <MintNft address={profile.ownedBy}/>
            )
        }
    }

    useEffect(() => {
        calculateStats();
    }, [])



    return (
        <div>
            {renderProfileDetails()}
            {renderProfileStats()}
            {renderExperience()}
            {renderMint()}
        </div>
    )
}

export default ProfileDetails