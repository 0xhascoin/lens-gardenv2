import React, { useState, useEffect } from 'react';
import { getUser } from '../../api/firebase';
import { images } from '../../constants/nftMetadata';

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
        <div className="w-full flex items-center justify-between">

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
        setData(data);
        setUpdatedDB(true);
        console.log(data);

    }

    useEffect(() => {
        calculateStats();
    }, [])

    const renderGarden = () => {
        if (updatedDB) {
            console.log("Data: ", data);
            return (
                <div className='text-center md:flex md:justify-center md:items-center border border-white'>
                    <img src={data.image} alt="" className='h-80 md:h-[100%] md:mb-0 w-80 rounded-lg shadow-xl mb-6 shadow-black/40 cursor-pointer md:mr-6' />
                    <div className="border border-white mb:w-full">
                        <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                            <div className='bg-white w-full h-full rounded-lg pb-4'>
                                <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <h1 className="text-2xl font-bold text-slate-50">{data.name}</h1>

                                </div>
                                <Badge text={`Level: ${LEVEL.level}`} />
                            </div>
                        </div>
                        <div className='bg-emerald-500 border mt-6 border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                            <div className='bg-white w-full h-full rounded-lg pb-4'>
                                <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <h1 className="text-2xl font-bold text-slate-50">Experience to next level</h1>
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
        <div className='m-auto w-11/12 bg-transparent flex justify-center my-10 py-10 border border-white'>
            {renderGarden()}
        </div>
    )
}

export default GardenStats