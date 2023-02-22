import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/firebase';
import { images, names } from '../../constants/nftMetadata';

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
        let threshold = 100;
        let experienceToNextLevel = threshold;
        while (experience >= threshold) {
            level += 1;
            threshold *= 1.5;
        }
        experienceToNextLevel = Math.floor(threshold - experience);

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


        let image1 = images[0]; // < 7
        let image2 = images[1]; // 7 => && < 12
        let image3 = images[2]; // 12 => && < 17
        let image4 = images[3]; // 17 => && < 22
        let image5 = images[4]; // 22 => && < 27
        let image6 = images[5]; // 27 => && < 32
        let image7 = images[6]; // 32 => && < 35
        let image8 = images[7]; // 35 => && < 37
        let image9 = images[8]; // 37 =>


        if (obj.attributes[0].value < 7) {
            obj = { ...obj, image: image1, name: names[0] }
        } else if (obj.attributes[0].value <= 7 || obj.attributes[0].value < 12) {
            obj = { ...obj, image: image2, name: names[1] }
        } else if (obj.attributes[0].value <= 12 || obj.attributes[0].value < 17) {
            obj = { ...obj, image: image3, name: names[2] }
        } else if (obj.attributes[0].value <= 17 || obj.attributes[0].value < 22) {
            obj = { ...obj, image: image4, name: names[3] }
        } else if (obj.attributes[0].value <= 22 || obj.attributes[0].value < 27) {
            obj = { ...obj, image: image5, name: names[4] }
        } else if (obj.attributes[0].value <= 27 || obj.attributes[0].value < 32) {
            obj = { ...obj, image: image6, name: names[5] }
        } else if (obj.attributes[0].value <= 32 || obj.attributes[0].value < 35) {
            obj = { ...obj, image: image7, name: names[6] }
        } else if (obj.attributes[0].value <= 35 || obj.attributes[0].value < 37) {
            obj = { ...obj, image: image8, name: names[7] }
        } else if (obj.attributes[0].value >= 37) {
            obj = { ...obj, image: image9, name: names[8] }
        }


        const data = await getUser(profile.ownedBy, obj);
        setData(data);
        setUpdatedDB(true);

    }

    const renderProfileDetails = () => (
        <div className="flex items-center space-x-4 mb-6 justify-center">
            <img className="w-30 h-20" src={`${startUrl}${profile.picture.original.url.slice(7)}`} alt="profile-image" />
            <div className="font-medium dark:text-white">
                <div className='text-left'>{profile.handle}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{profile.ownedBy.slice(0, 7)}...{profile.ownedBy.slice(-5)}</div>
            </div>
        </div>
    );

    const renderProfileStats = () => (
        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Following: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalFollowing}</span>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Followers: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalFollowers}</span>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Posts: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalPosts}</span>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Collects: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalCollects}</span>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Comments: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalComments}</span>
                    </p>
                </li>
                <li className="inline-flex items-center">
                    <p className="inline-flex items-center text-sm font-medium text-zinc-800">
                        Mirrors: <span className="text-red-500 mx-1 text-sm">{profile.stats.totalMirrors}</span>
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
                        <p>Level: {LEVEL.level}</p>
                        <p>XP to level {LEVEL.level + 1}: {LEVEL.experienceToNextLevel}</p>
                        <p>Total XP: {XP}</p>
                        <div className="w-full bg-zinc-800 rounded-full h-2.5  mt-5">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${Math.floor((XP / (LEVEL.experienceToNextLevel + XP)) * 100)}%` }}></div>
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