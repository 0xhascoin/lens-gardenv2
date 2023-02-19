import React from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'

const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

const Badge = ({text}) => {
    console.log("Text: ", text)
    return (
    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
        {text}
    </span>
    )
}



const LensProfile = ({ profile }) => {

    console.log(profile.stats.totalMirrors);

    return (
        <div className="w-full md:w-1/2 p-4">
            <div className="w-full rounded-lg p-2">
                {/* Header */}
                <div className="w-full flex p-2 mb-6">
                    {/* Profile Image */}
                    <img
                        className="rounded-lg w-26 h-24 border border-white mr-2"
                        src={`${startUrl}${profile.picture.original.url.slice(7)}`}
                        alt="profile-image"
                    />
                    {/* Names */}
                    <div className="text-left">
                        {/* Lens Name */}
                        <h2 className='text-xl mb-3 bolded'>{profile.handle}</h2>
                        {/* Address */}
                        <p className='text-sm'>{profile.ownedBy.slice(0, 6)}...{profile.ownedBy.slice(-6)}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 mb-2 m-auto bg-transparent rounded-t-lg	" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <SlUserFollowing className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Following</h2>
                            <Badge text={profile.stats.totalFollowing} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center py-8 rounded-t-lg mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiGroup className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Followers</h2>
                            <Badge text={profile.stats.totalFollowers} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <FiSend className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Posts</h2>
                            <Badge text={profile.stats.totalPosts} />
                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCommentDots className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Comments</h2>
                            <Badge text={profile.stats.totalComments} />
                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                        <div className='bg-white w-full h-full rounded-lg pb-4'>
                            <div className="flex w-full justify-center rounded-t-lg	py-8 mb-2 m-auto bg-transparent" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
                                <BiCollection className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-lg text-zinc-800 mb-2'>Collects</h2>
                            <Badge text={profile.stats.totalCollects} />

                        </div>
                    </div>

                    <div className='bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{ backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
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