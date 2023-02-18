import React from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'

const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

const LensProfile = ({ profile }) => {

    console.log(profile);

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
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4">

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <SlUserFollowing className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Following</h2>
                            <p>{profile.stats.totalFollowing}</p>
                        </div>
                    </div>

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <BiGroup className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Followers</h2>
                            <p>{profile.stats.totalFollowers}</p>
                        </div>
                    </div>

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <FiSend className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Posts</h2>
                            <p>{profile.stats.totalPosts}</p>
                        </div>
                    </div>

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <BiCommentDots className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Comments</h2>
                            <p>{profile.stats.totalComments}</p>
                        </div>
                    </div>

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <BiCollection className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Collects</h2>
                            <p>{profile.stats.totalCollects}</p>
                        </div>
                    </div>

                    <div className='p-2 bg-emerald-500 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg border border-black text-center flex justify-center place-items-center bg-cover bg-center' style={{backgroundImage: 'url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                        <div className='bg-white w-full h-full rounded-lg p-2 border border-emerald-900 py-8'>
                            <div className="flex w-1/3 justify-center py-8 mb-2 rounded-full m-auto bg-cover bg-center" style={{backgroundImage: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)'}}>
                                <VscMirror className='h-8 w-8 text-white' />
                            </div>
                            <h2 className='text-xl'>Mirrors</h2>
                            <p>{profile.stats.totalMirrors}</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default LensProfile