import React, { useState, useEffect } from 'react';
import { BiCollection, BiCommentDots, BiGroup } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { SlUserFollowing } from 'react-icons/sl';
import { VscMirror } from 'react-icons/vsc';
import { getUser } from '../../api/firebase';
import { images, names } from '../../constants/nftMetadata';

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
    const perc = Math.floor((XP / total) * 100);
    return (
        <div className="w-full flex items-center justify-between pb-2">

            <div class="w-4/5 bg-zinc-800 rounded-full h-2.5 dark:bg-gray-700 mr-4">
                <div class="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${perc}%` }}></div>
            </div>
            <Badge text={`Level ${LEVEL.level + 1}`} />
        </div>
    )
}

const GardenStats = ({ profile }) => {

    const [XP, setXP] = useState(null);
    const [LEVEL, setLEVEL] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [updatedDB, setUpdatedDB] = useState(false);
    const [data, setData] = useState([]);


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

    useEffect(() => {
        calculateStats();
    }, [])



    const renderNFTGarden = () => {
        if (updatedDB) {
            return (
                <div className='w-full h-full md:flex md:justify-between md:items-center bg-slate-800 p-4 shadow-xl  shadow-black/80 rounded-lg'>
                    {/* Points calculation */}
                    <div className="w-full text-center">
                        <h1 className='text-white text-xl mb-4 underline'>Points calculation</h1>
                        <div class="grid grid-cols-2 md:grid-cols-2 gap-2 p-2">
                            <div className="bg-white w-full h-2/3 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <SlUserFollowing className=' text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+10 XP</h2>
                            </div>
                            <div className="bg-white w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiGroup className=' text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+50 XP</h2>
                            </div>
                            <div className="bg-white w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <FiSend className=' text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+30 XP</h2>
                            </div>
                            <div className="bg-white w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiCommentDots className=' text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+20 XP</h2>
                            </div>
                            <div className="bg-white w-full h-2/3  flex justify-between items-center  border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiCollection className=' text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+20 XP</h2>
                            </div>
                            <div className=" bg-white w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <VscMirror className='text-white h-full w-full' />
                                </div>
                                <h2 className='text-sm text-emerald-800 text-center w-1/2'>+30 XP</h2>
                            </div>
                        </div>
                    </div>
                    {/* NFT Image */}
                    <div className="p-2">
                        <img src={data.image} alt="" className='rounded-lg min-h-80 md:h-full m-auto' />
                    </div>
                    {/* NFT Details */}
                    <div className="w-full md:w-4/5 h-full p-2">
                    <div className='mb-3 bg-emerald-500 h-1/2 mt-auto rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4 border border-white'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <h1 className="text-xl font-bold text-slate-50">{data.name}</h1>

                            </div>
                            <Badge text={`Level: ${LEVEL.level}`} />
                        </div>
                    </div>
                    <div className='h-1/2 mt-auto rounded-lg cursor-pointer transition-all hover:shadow-lg text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className=' w-full h-full rounded-lg bg-white border border-white'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <h1 className="text-xl font-bold text-slate-50">Experience to next level</h1>
                            </div>
                            <div className="px-2">

                                <ExpProgress LEVEL={LEVEL} XP={XP} />
                            </div>

                        </div>
                    </div>
                    
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='m-auto w-11/12 bg-transparent flex justify-center my-6 rounded'>

            {renderNFTGarden()}
        </div>
    )
}

export default GardenStats