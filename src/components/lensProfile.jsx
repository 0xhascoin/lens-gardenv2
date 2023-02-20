import React, { useEffect, useState } from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'
import { getUser } from '../../api/firebase';
import { images } from '../../constants/nftMetadata';

const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

const Badge = ({ text }) => {
    console.log("Text: ", text)
    return (
        <span className="text-center mr-auto bg-green-100 ml-12 text-green-800 text-xs font-medium rounded dark:bg-gray-700 dark:text-green-400">
            {text}
        </span>
    )
}


const ExpProgress = ({ LEVEL, XP }) => {
    console.log("LEVEL: ", LEVEL)
    console.log("XP: ", XP)
    const total = LEVEL.experienceToNextLevel + XP;
    const perc = Math.floor((XP/total) * 100);
    return (
        <div className="flex w-full justify-center items-center">

            <div className=" w-28 bg-zinc-800 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-emerald-400 h-2.5 rounded-full" style={{width: `${perc}%`}}></div>
            </div>
            <Badge text={`Level ${LEVEL.level + 1}`} />
        </div>
    )
}


const LensProfile = ({ profile }) => {

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
        console.log("Started Calc")
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
            obj = { ...obj, image: images[0] }
        } else if (obj.attributes[0].value > 5 && obj.attributes[0].value < 11) {
            obj = { ...obj, image: images[1] }
        } else if (obj.attributes[0].value >= 11 && obj.attributes[0].value <= 15) {
            obj = { ...obj, image: images[2] }
        }

        const data = await getUser(profile.ownedBy, obj);
        setUpdatedDB(true);
        console.log(data);

    }

    useEffect(() => {
        calculateStats();
    }, [])

    return (
        <div className="w-full h-full md:w-1/2 ">
            <div className="w-full rounded-lg h-full">
                {/* Header */}
                <div className="w-full h-60 grid grid-rows-2 items-center  justify-center md:grid md:items-center">
                    {/* Profile Image */}
                    <img
                        className="rounded w-22 h-24"
                        src={`${startUrl}${profile.picture.original.url.slice(7)}`}
                        alt="profile-image"
                    />
                    {/* Names */}
                    <div className="">
                        {/* Lens Name */}
                        <div className='w-1/3 text-xl ml-14 font-semibold'>
                        <h2 className='mx-auto'>@{profile.handle}</h2>
                        </div>
                        {/* Address */}
                        <div className='w-1/3 flex text-xl font-semibold bolded ml-9'>
                        <h2 className='mx-auto'>{profile.ownedBy.slice(0, 6)}...{profile.ownedBy.slice(-6)}</h2>
                        </div>
                        {loadingStats ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {LEVEL !== null && XP !== null && (
                                    <ExpProgress LEVEL={LEVEL} XP={XP} />
                                )}
                            </>
                        )}
                    </div>
                </div>
<div className='h-20'><h2>empty div</h2></div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6">

                    <div className='bg-emerald-500 border border-gray-900 rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 mb-2 m-auto bg-transparent rounded-t-lg	" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <SlUserFollowing className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Following</h2>
                            <div className=''>
                            <Badge text={profile.stats.totalFollowing}  />
                            </div>
                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 rounded-t-lg mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiGroup className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Followers</h2>
                            <Badge text={profile.stats.totalFollowers} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <FiSend className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Posts</h2>
                            <Badge text={profile.stats.totalPosts} />
                        </div>
                    </div>
                                              
                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCommentDots className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Comments</h2>
                            <Badge text={profile.stats.totalComments} />
                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCollection className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Collects</h2>
                            <Badge text={profile.stats.totalCollects} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <VscMirror className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Mirrors</h2>
                            <Badge text={profile.stats.totalMirrors} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LensProfile