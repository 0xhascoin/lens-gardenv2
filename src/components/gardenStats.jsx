import React, { useState, useEffect } from 'react';
import { BiCollection, BiCommentDots, BiGroup } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { SlUserFollowing } from 'react-icons/sl';
import { VscMirror } from 'react-icons/vsc';
import { getUser } from '../../api/firebase';
import { images, names, nftData } from '../../constants/nftMetadata';
import '../styles/card.css'

const Badge = ({ text }) => {
    // console.log("Text: ", text)
    return (
        <span className="text-center border-white border text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-white hover:text-green-500 hover:border-green-500">
            {text}
        </span>
    )
}




const NextExpProgress = ({ unlocksAtLevel, xpNeededToUnlock, myTotalXp }) => {
    // console.log(unlocksAtLevel, xpNeededToUnlock, myTotalXp)

    // const total = LEVEL.experienceToNextLevel + XP;
    const perc = Math.floor((myTotalXp / xpNeededToUnlock) * 100);
    return (
        <div className="flex items-end sm:pt-4 justify-between">
            
            <div className="w-4/5 bg-zinc-800 rounded-full h-2.5 dark:bg-gray-700 mr-2 ml-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${perc}%` }} ></div>
            </div>
            <div className='grid'>
                <Badge text={`Level ${unlocksAtLevel}`} />
            </div>
        </div>
    )
}

const GardenStats = ({ profile }) => {

    const [XP, setXP] = useState(null);
    const [LEVEL, setLEVEL] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [updatedDB, setUpdatedDB] = useState(false);
    const [data, setData] = useState([]);
    const [nextNFT, setNextNFT] = useState({});

    // console.log("Profile: ", profile)


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
            setNextNFT(nftData[1]);
        } else if (obj.attributes[0].value <= 7 || obj.attributes[0].value < 12) {
            obj = { ...obj, image: image2, name: names[1] }
            setNextNFT(nftData[2]);
        } else if (obj.attributes[0].value <= 12 || obj.attributes[0].value < 17) {
            obj = { ...obj, image: image3, name: names[2] }
            setNextNFT(nftData[3]);
        } else if (obj.attributes[0].value <= 17 || obj.attributes[0].value < 22) {
            obj = { ...obj, image: image4, name: names[3] }
            setNextNFT(nftData[4]);
        } else if (obj.attributes[0].value <= 22 || obj.attributes[0].value < 27) {
            obj = { ...obj, image: image5, name: names[4] }
            setNextNFT(nftData[5]);
        } else if (obj.attributes[0].value <= 27 || obj.attributes[0].value < 32) {
            obj = { ...obj, image: image6, name: names[5] }
            setNextNFT(nftData[6]);
        } else if (obj.attributes[0].value <= 32 || obj.attributes[0].value < 35) {
            obj = { ...obj, image: image7, name: names[6] }
            setNextNFT(nftData[7]);
        } else if (obj.attributes[0].value <= 35 || obj.attributes[0].value < 37) {
            obj = { ...obj, image: image8, name: names[7] }
            setNextNFT(nftData[8]);
        } else if (obj.attributes[0].value >= 37) {
            obj = { ...obj, image: image9, name: names[8] }
            setNextNFT(nftData[8]);
        }


        // const data = await getUser(profile.ownedBy, obj);
        setData(obj);
        setUpdatedDB(true);

    }

    useEffect(() => {
        calculateStats();
    }, [])



    const renderNFTGarden = () => {
        if (updatedDB) {
            return (

                <div className='sm:pl-2 sm:pr-2 px-2 sm:flex-nowrap sm:inline-flex sm:gap-x-4 mt-2 sm:mt-4 gap-y-4 grid grid-cols-1 sm:w-full sm:justify-between rounded-lg bg-transparent'>
                    {/* Points calculation */}
                   
                    {/* NFT Image */}
                    <div className="p-1 sm:p-0 rounded-lg border-2 border-white bg-slate-800 grid grid-cols-1">

                        <div className="sm:h-full p-2 mx-auto items-center justify-center rounded-lg">
                            <div className='text-center text-white underline mx-auto text-xl hover:text-green-500'><p>{data.name}</p></div>
                            <div className="cursor-pointer flex mt-2 mb-2 justify-center items-center mx-auto nft rounded-lg">
                                <img src={data.image} className="border border-white rounded-lg sm:w-9/12" alt="" aria-hidden="true" />
                            </div>
                            <div className="mb-4 sm:mb-6 sm:mt-6 mx-auto items-center justify-center flex">

                                <Badge text={`Level: ${LEVEL.level}`} />



                                <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect fill="none" /><circle cx="128" cy="144" r="20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="164" x2="128" y2="180" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M92,88V52a36,36,0,0,1,71.8-4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
                            </div>

                            <div className="font grid grid-cols-1 sm:mb-4 mb-2 text-white mx-auto items-center justify-center">
                                <p className='sm:text-lg text-sm text-center lg:text-2xl hover:text-green-500'>
                                    Our Equilibrium collection
                                </p>
                               <p className='sm:text-lg text-sm text-center hover:text-green-500 lg:text-2xl'>promotes balance and calm.</p>

                            </div>
                            <div className="flex mx-auto justify-center pt-2">
                                
                                    <span>
                                        <a href="https://lenster.xyz/?text=🎉🌿Just minted my Lens Garden NFT! Proud to be part of this innovative project. Join our Discord community: https://discord.gg/ERAZrPnW 🎉🌿&url=https://mycoolapp.xyz&via=lensgardennft built by: @aliii @hascoin&hashtags=lensgarden,lens,web3,nft,lensgardennft" target="_blank" className='cursor-pointer'>
                                            <svg width="30" height="30" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_874_1376)"><path d="M0.64209 78.8548V61.9927H2.66547V77.0243H11.4687V78.8548H0.64209Z" fill="#ABFE2C"></path><path d="M13.5249 78.8548V61.9927H23.9075V63.8232H15.5483V69.4639H22.3226V71.2944H15.5483V77.028H24.0276V78.8585L13.5249 78.8548Z" fill="#ABFE2C"></path><path d="M26.0015 78.8548V61.9927H30.2921L36.1693 77.5793H36.8462V61.9927H38.8478V78.8548H34.5554L28.7017 63.2482H28.0012V78.8566L26.0015 78.8548Z" fill="#ABFE2C"></path><path d="M47.408 79.1912C46.2825 79.2101 45.1659 78.9886 44.1328 78.5416C43.1948 78.1295 42.4019 77.4456 41.8565 76.5783C41.3033 75.7025 41.0261 74.6065 41.0249 73.2903V72.7845H43.0265V73.2903C43.0265 74.6878 43.4359 75.7273 44.2547 76.4091C45.0735 77.0908 46.1246 77.4347 47.408 77.4408C48.7242 77.4408 49.7274 77.1436 50.4176 76.5492C50.7485 76.2785 51.0137 75.9362 51.1934 75.5483C51.373 75.1603 51.4624 74.7367 51.4548 74.3093C51.4838 73.7707 51.3163 73.2399 50.9835 72.8154C50.6255 72.4113 50.1755 72.0993 49.6716 71.9056C49.0335 71.6481 48.3757 71.4424 47.7046 71.2906L46.4527 70.9776C45.5566 70.7512 44.685 70.4367 43.8507 70.0387C43.1466 69.7117 42.5373 69.2107 42.0803 68.583C41.6545 67.9765 41.4416 67.2014 41.4416 66.2576C41.4196 65.385 41.6682 64.527 42.153 63.8011C42.653 63.0892 43.3481 62.5369 44.1546 62.2108C45.0987 61.828 46.1111 61.6423 47.1296 61.6649C48.1831 61.6481 49.2287 61.8488 50.2011 62.2545C51.0608 62.6144 51.8005 63.2114 52.3337 63.9758C52.8565 64.74 53.1173 65.6996 53.1161 66.8544V67.8661H51.1145V66.8544C51.1145 66.0356 50.9423 65.3775 50.5978 64.8802C50.246 64.3765 49.7508 63.9904 49.1767 63.772C48.5197 63.5199 47.8205 63.3964 47.1169 63.4081C46.0094 63.4081 45.1178 63.6507 44.4421 64.1359C43.7664 64.6212 43.4292 65.3156 43.4304 66.2194C43.4067 66.7361 43.5594 67.2456 43.8635 67.6641C44.1908 68.0656 44.6138 68.3784 45.0935 68.5739C45.7076 68.8351 46.344 69.0403 46.995 69.1871L48.2487 69.5019C49.157 69.6866 50.0415 69.9735 50.8853 70.3571C51.6205 70.6829 52.2623 71.1878 52.7522 71.8255C53.218 72.4442 53.4509 73.2515 53.4509 74.2474C53.4716 75.1697 53.2115 76.0766 52.7049 76.8476C52.1788 77.609 51.4484 78.2063 50.5978 78.5708C49.5907 79.002 48.5033 79.2135 47.408 79.1912Z" fill="#ABFE2C"></path><path d="M27.065 39.9117C26.5301 39.9117 13.8348 39.8007 4.12361 30.0859C3.918 29.8821 3.71784 29.6747 3.52133 29.4673C1.48703 27.3238 0.522643 24.7727 0.726437 22.0925C0.908396 19.727 2.00015 17.4361 3.79245 15.6384C5.58474 13.8406 7.88289 12.7525 10.2465 12.5724C12.723 12.3904 15.0903 13.1947 17.1301 14.9233C17.3502 12.2594 18.4493 10.0104 20.3344 8.39458C22.1339 6.84974 24.5194 6 27.0668 6C29.6143 6 31.9998 6.84974 33.7993 8.39458C35.6826 10.0122 36.7835 12.2594 37.0036 14.9233C39.0434 13.1947 41.4107 12.3758 43.8871 12.5724C46.2526 12.7543 48.5435 13.8461 50.3394 15.6384C52.1353 17.4307 53.2271 19.7288 53.4054 22.0925C53.611 24.7727 52.6448 27.3238 50.6123 29.4709C50.4158 29.6783 50.2157 29.8858 50.0101 30.0896C40.2971 39.8007 27.6018 39.9117 27.065 39.9117ZM10.9489 14.5612C8.7472 14.5612 6.68014 15.5856 5.20991 17.054C2.56786 19.6979 1.36693 24.2796 4.977 28.0953C5.16139 28.2906 5.34941 28.4841 5.54108 28.6757C14.6718 37.8046 26.9449 37.9102 27.0668 37.9102C27.1888 37.9102 39.4874 37.7828 48.5944 28.6757C48.7873 28.4829 48.9753 28.2894 49.1585 28.0953C52.7686 24.2742 51.5676 19.6979 48.9256 17.054C46.2835 14.4101 41.7 13.2092 37.8788 16.8211C37.6835 17.0043 37.4901 17.1923 37.2984 17.3852C37.151 17.5326 37.0073 17.6836 36.8653 17.8346L34.9675 19.8471L35.0421 17.0849C35.0421 16.8739 35.0548 16.6646 35.0548 16.4517C35.0548 16.1788 35.0548 15.9059 35.0439 15.642C34.8984 10.3925 30.8097 7.99973 27.0705 7.99973C23.3312 7.99973 19.2462 10.3907 19.0988 15.642C19.0988 15.9095 19.0879 16.1879 19.0879 16.4517C19.0879 16.6592 19.0879 16.863 19.0988 17.0686L19.1735 19.8471L17.2738 17.8455C17.1301 17.6927 16.9845 17.5398 16.8353 17.3888C16.6424 17.1959 16.4489 17.0079 16.2548 16.8247C14.5535 15.2108 12.7066 14.5612 10.9489 14.5612Z" fill="#ABFE2C"></path><path d="M25.7818 29.3107H24.3261C24.3261 27.1435 22.2154 25.3785 19.6243 25.3785C17.0332 25.3785 14.9225 27.1435 14.9225 29.3107H13.4668C13.4668 26.3393 16.2289 23.9229 19.6243 23.9229C23.0196 23.9229 25.7818 26.3393 25.7818 29.3107Z" fill="#ABFE2C"></path><path d="M40.5821 29.2507H39.1264C39.1264 27.0836 37.0175 25.3204 34.4246 25.3204C31.8317 25.3204 29.7228 27.0836 29.7228 29.2507H28.2671C28.2671 26.2812 31.0292 23.8647 34.4246 23.8647C37.8199 23.8647 40.5821 26.2812 40.5821 29.2507Z" fill="#ABFE2C"></path><path d="M21.2999 29.3415C22.4566 29.3415 23.3943 28.4039 23.3943 27.2472C23.3943 26.0905 22.4566 25.1528 21.2999 25.1528C20.1432 25.1528 19.2056 26.0905 19.2056 27.2472C19.2056 28.4039 20.1432 29.3415 21.2999 29.3415Z" fill="#ABFE2C"></path><path d="M36.0026 29.3415C37.1592 29.3415 38.0969 28.4039 38.0969 27.2472C38.0969 26.0905 37.1592 25.1528 36.0026 25.1528C34.8459 25.1528 33.9082 26.0905 33.9082 27.2472C33.9082 28.4039 34.8459 29.3415 36.0026 29.3415Z" fill="#ABFE2C"></path><path d="M27.0593 34.662C25.3435 34.662 23.7531 33.7795 23.0107 32.4148L24.2845 31.7197C24.7776 32.6295 25.8639 33.2063 27.0557 33.2063C28.2475 33.2063 29.3356 32.6222 29.8269 31.7197L31.1006 32.4148C30.3655 33.7795 28.7807 34.662 27.0593 34.662Z" fill="#ABFE2C"></path><path d="M53.1464 54.8398C49.4988 56.5478 45.3872 56.9958 41.4573 56.1135C38.2045 55.3923 35.2183 53.7757 32.8361 51.4463C34.3442 52.0713 35.9619 52.3892 37.5943 52.3816C40.417 52.3822 43.1698 51.5046 45.4714 49.8705L44.3032 48.2438C41.1535 50.511 36.821 51.0569 33.402 49.5121C30.0285 47.9927 28.1252 44.7411 28.0033 40.3322V38.9111H26.0017V39.1622V40.3213C25.8853 44.7356 23.9783 47.9909 20.6012 49.5121C17.1822 51.0533 12.8425 50.5147 9.70002 48.2384L8.53366 49.8651C10.8337 51.4998 13.5852 52.3786 16.407 52.3797C18.0395 52.3877 19.6572 52.0698 21.1653 51.4445C18.7838 53.7738 15.7981 55.3905 12.5459 56.1117C8.61601 56.9941 4.50437 56.5461 0.856807 54.838L0.00341797 56.6485C2.68216 57.9059 5.60544 58.5564 8.56459 58.5536C10.0514 58.5541 11.5337 58.39 12.9844 58.0641C17.4358 57.0759 21.4123 54.5879 24.2476 51.0169L24.2604 51.0005C24.9257 50.1277 25.5098 49.1958 26.0054 48.2165V58.5172H28.0069V48.2311C28.5018 49.2055 29.084 50.1331 29.7465 51.0023L29.7592 51.0187C32.5942 54.5892 36.57 57.0772 41.0206 58.066C42.4713 58.3918 43.9536 58.556 45.4404 58.5554C48.4002 58.5582 51.324 57.9077 54.0034 56.6503L53.1464 54.8398Z" fill="#ABFE2C"></path></g><defs><clipPath id="clip0_874_1376"><rect width="54" height="73.193" fill="white" transform="translate(0 6)"></rect></clipPath></defs></svg>
                                        </a>
                                    </span>
                                    <div className='flex'>
                                    <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=🎉🌿Just minted my Lens Garden NFT! Proud to be part of this innovative project. Join our Discord community: https://discord.gg/ERAZrPnW. 🎉🌿&url=https://mycoolapp.xyz&via=LensGardenNFT built by: @0xHascoin @AZahredeen&hashtags=lensgarden,lens,web3,nft" target="_blank">

                                            <svg viewBox="0 0 24 24" width="30" height="36" aria-hidden="true" className=' fill-white'><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                                        </a>
                                    </div>
                                
                            </div>
                            <div className="control4 border-2 rounded-lg sm:mt-20 sm:w-3/4 sm:mx-auto border-green-500"></div>

                        </div>
                    </div>


                    {/* NFT Details */}
                    
                    <div className="p-1 sm:p-0 rounded-lg border-2 border-white bg-slate-800 grid grid-cols-1">

                            <div className="sm:h-full p-2 mx-auto items-center justify-center rounded-lg">
                                <div className='text-center text-white underline mx-auto text-xl hover:text-green-500'><p>{nextNFT.name}</p></div>
                                <div className="cursor-pointer flex mt-2 mb-2 justify-center items-center mx-auto nft rounded-lg">
                                    <img src={nextNFT.imageUrl} className="rounded-lg sm:w-9/12 border-white border" alt="" aria-hidden="true" />
                                </div>
                                <div className="sm:text-lg sm:pt-3 sm:mb-6 text-sm text-white w-1/2 mx-auto items-center justify-center flex">
                                    <p>Locked
                                    </p>

                                    <svg className='h-6 w-6 ml-2 mb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect fill="none" /><circle cx="128" cy="140" r="20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="160" x2="128" y2="184" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M92,88V52a36,36,0,0,1,72,0V88" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
                                </div>
                                <div className="font grid grid-cols-1 justify-center mx-auto items-center">
                                    <p className='control6 sm:text-lg flex justify-center text-center text-sm lg:text-2xl text-white hover:text-green-500'> Experience to unlock:</p>
                                        
                                         <h1 className='cursor-pointer sm:text-2xl text-sm text-white flex justify-center hover:text-green-500 '>{XP} / {nextNFT.xpNeededtoUnlock}</h1>
                                   
                                    </div>
                                   
                                   <div></div>
                                      
                                
                               
                                
                            </div>
                            <div className='pb-2 sm:pb-2 sm:grid sm:grid-cols-1'>
                                        <NextExpProgress unlocksAtLevel={nextNFT.unlocksAtLevel} xpNeededToUnlock={nextNFT.xpNeededtoUnlock} myTotalXp={XP} />
                                        </div>
                        </div>


         <div className="p-1 sm:p-0 rounded-lg border-2 border-white bg-slate-800 grid grid-cols-1">
            <div className="sm:h-full p-2 mx-auto items-center justify-center rounded-lg">
                <div className='text-center text-white underline mx-auto text-xl hover:text-green-500'><p>Tier: #1 NFT</p></div>
                    <div className="cursor-pointer flex mt-2 mb-2 justify-center items-center mx-auto nft rounded-lg">
                        <img src={data.image} className="rounded-lg sm:w-9/12 border-white border" alt="" aria-hidden="true" />
                    </div>
                    <div className="sm:text-lg sm:pt-3 sm:mb-6 text-sm text-white w-1/2 mx-auto items-center justify-center flex">
                                    <p>Locked
                                    </p>

                                    <svg className='h-6 w-6 ml-2 mb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect fill="none" /><circle cx="128" cy="140" r="20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="160" x2="128" y2="184" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M92,88V52a36,36,0,0,1,72,0V88" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
                        </div>
                        <div className="font flex mb-2 text-white mx-auto items-center justify-center">
                        <p className='sm:text-lg text-sm text-center lg:text-2xl hover:text-green-500 sm:mb-4'>
                       Finish all Levels to mint Tier #1 NFT.
                        </p>
                    </div>
                        
                   
            </div>
            
         </div>

                    
                </div>

            )
        }
    }

    return (
        <>
        <div className='mx-auto items-center w-full bg-transparent flex justify-center mb-4 rounded'>
            {renderNFTGarden()}
        </div>
        <div className='sm:pl-2 sm:pr-2 px-2'>
    <div className='w-full text-white mb-4 border-2 border-white rounded-lg'>
        <div className="rounded-lg w-full bg-[#14243d] text-center pb-2">
                    <div className=' font pt-5 sm:text-2xl text-lg px-2 sm:px-0 relative text-white'>Points Calculation.
                    <div className="sm:w-2/3 w-2/3 flex mx-auto border-2 rounded-lg sm:mt-2 mt-2 border-green-500"></div>
                    </div>
                    
                        <div className="grid grid-cols-2 mt-2 sm:justify-items-center sm:grid-cols-3 w-full sm:mt-3 gap-2 p-2">
                            <div className="nft sm:h-24 bg-white sm:w-2/3 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <SlUserFollowing className='text-white h-8 w-8 mx-auto mt-5 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+10 XP</h2>
                            </div>
                            <div className="nft bg-white sm:w-2/3 sm:h-24 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiGroup className=' text-white h-8 w-8 mx-auto mt-2 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+50 XP</h2>
                            </div>
                            <div className="nft bg-white sm:w-2/3 sm:h-24 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <FiSend className=' text-white h-8 w-8 mx-auto mt-2 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+30 XP</h2>
                            </div>
                            <div className="nft bg-white sm:w-2/3 sm:h-24 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiCommentDots className=' text-white h-8 w-8 mx-auto mt-2 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+20 XP</h2>
                            </div>
                            <div className="nft bg-white w-full sm:w-2/3 sm:h-24 flex justify-between items-center  border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <BiCollection className=' text-white h-8 w-8 mx-auto mt-2 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+20 XP</h2>
                            </div>
                            <div className="nft bg-white w-full flex sm:w-2/3 sm:h-24 justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
                                <div className="h-full w-1/2 rounded-l-lg p-4 sm:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                    <VscMirror className='text-white h-8 w-8 mx-auto mt-2 sm:h-14 sm:w-14 sm:mt-3 sm:mx-auto' />
                                </div>
                                <h2 className='sm:text-xl text-lg text-gray-800 text-center w-1/2'>+30 XP</h2>
                            </div>
                        </div>
                    </div>
        </div>
        </div>
</>
    )
}

export default GardenStats
