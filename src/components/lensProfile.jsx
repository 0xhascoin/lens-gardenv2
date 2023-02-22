import React, { useEffect, useState } from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'
import { getUser } from '../../api/firebase';
import { images, names } from '../../constants/nftMetadata';

const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

const Badge = ({ text }) => {
    console.log("Text: ", text)
    return (
        <span className="text-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
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
        <div className="w-full flex items-center justify-between">

            <div class="w-4/5  rounded-full h-2.5 bg-white mr-1">
                <div class="bg-emerald-400 h-2.5 rounded-full" style={{width: `${perc}%`}}></div>
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


        let image1 = images[0]; // < 2
        let image2 = images[1]; // 2 => && < 6
        let image3 = images[2]; // 6 => && < 10
        let image4 = images[3]; // 10 => && < 15
        let image5 = images[4]; // 15 => && < 18
        let image6 = images[5]; // 18 => && < 21
        let image7 = images[6]; // 21 => && < 27
        let image8 = images[7]; // 27 => && < 35
        let image9 = images[8]; // 35 =>


        if (obj.attributes[0].value < 2) {
            obj = { ...obj, image: image1, name: names[0] }
        } else if (obj.attributes[0].value <= 2 || obj.attributes[0].value < 6) {
            obj = { ...obj, image: image2, name: names[1] }
        } else if (obj.attributes[0].value <= 6 || obj.attributes[0].value < 10) {
            obj = { ...obj, image: image3, name: names[2] }
        } else if (obj.attributes[0].value <= 10 || obj.attributes[0].value < 15) {
            obj = { ...obj, image: image4, name: names[3] }
        } else if (obj.attributes[0].value <= 15 || obj.attributes[0].value < 18) {
            obj = { ...obj, image: image5, name: names[4] }
        } else if (obj.attributes[0].value <= 18 || obj.attributes[0].value < 21) {
            obj = { ...obj, image: image6, name: names[5] }
        } else if (obj.attributes[0].value <= 21 || obj.attributes[0].value < 27) {
            obj = { ...obj, image: image7, name: names[6] }
        } else if (obj.attributes[0].value <= 27 || obj.attributes[0].value < 35) {
            obj = { ...obj, image: image8, name: names[7] }
        } else if (obj.attributes[0].value >= 35) {
            obj = { ...obj, image: image9, name: names[8] }
        }


        const data = await getUser(profile.ownedBy, obj);
        setData(data);
        setUpdatedDB(true);

    }

    useEffect(() => {
        calculateStats();
    }, [])

    return (
        <div className="w-full md:w-3/5 p-4">
            <div className="w-full rounded-lg p-2">
                {/* Header */}
                <div className="w-full md:flex p-2 mb-6 md:items-center">
                    {/* Profile Image */}
                    <img
                        className="rounded-lg w-26 h-24 border border-white mr-2"
                        src={`${startUrl}${profile.picture.original.url.slice(7)}`}
                        alt="profile-image"
                    />
                    {/* Names */}
                    <div className="text-left w-full">
                        {/* Lens Name */}
                        <h2 className='text-xl text-white mb-3 bolded'>@{profile.handle}</h2>
                        {/* Address */}
                        <p className='text-sm text-white'>{profile.ownedBy.slice(0, 6)}...{profile.ownedBy.slice(-6)}</p>

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


                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 mb-2 m-auto bg-transparent rounded-t-lg	" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <SlUserFollowing className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Following</h2>
                            <Badge text={profile.stats.totalFollowing} /> <br />
                            <Badge text={`${profile.stats.totalFollowing * 10} XP`} />
                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 rounded-t-lg mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiGroup className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Followers</h2>
                            <Badge text={profile.stats.totalFollowers} /> <br />
                            <Badge text={`${profile.stats.totalFollowers * 50} XP`} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <FiSend className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Posts</h2>
                            <Badge text={profile.stats.totalPosts} /> <br />
                            <Badge text={`${profile.stats.totalPosts * 30} XP`} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg  text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCommentDots className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Comments</h2>
                            <Badge text={profile.stats.totalComments} /> <br />
                            <Badge text={`${profile.stats.totalComments * 20} XP`} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCollection className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Collects</h2>
                            <Badge text={profile.stats.totalCollects} /> <br />
                            <Badge text={`${profile.stats.totalCollects * 20} XP`} />


                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <VscMirror className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Mirrors</h2>
                            <Badge text={profile.stats.totalMirrors} /> <br />
                            <Badge text={`${profile.stats.totalMirrors * 30} XP`} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LensProfile