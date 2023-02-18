import React from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'

const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

const LensProfile = ({ profile }) => {

    console.log(profile);

    return (
        <div className="border border-black w-full p-4">
            <div className="border border-black w-full rounded-lg p-2">
                {/* Header */}
                <div className="border border-black w-full flex p-2 mb-6">
                    {/* Profile Image */}
                    <img
                        className="rounded-lg w-26 h-24 border border-white mr-2"
                        src={`${startUrl}${profile.picture.original.url.slice(7)}`}
                        alt="profile-image"
                    />
                    {/* Names */}
                    <div className="border border-red-500 text-left">
                        {/* Lens Name */}
                        <h2 className='text-xl mb-3 bolded'>{profile.handle}</h2>
                        {/* Address */}
                        <p className='text-sm'>{profile.ownedBy.slice(0, 6)}...{profile.ownedBy.slice(-6)}</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 border border-red-600">
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <SlUserFollowing className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Following</h2>
                        <p>{profile.stats.totalFollowing}</p>
                    </div>
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <BiGroup className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Followers</h2>
                        <p>{profile.stats.totalFollowers}</p>
                    </div>
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <FiSend className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Posts</h2>
                        <p>{profile.stats.totalPosts}</p>
                    </div>
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <BiCommentDots className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Comments</h2>
                        <p>{profile.stats.totalComments}</p>
                    </div>
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <BiCollection className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Collects</h2>
                        <p>{profile.stats.totalCollects}</p>
                    </div>
                    <div className='border border-black text-center p-4'>
                        <div className="flex justify-center mb-2">
                            <VscMirror className='h-20 w-20' />
                        </div>
                        <h2 className='text-xl'>Mirrors</h2>
                        <p>{profile.stats.totalMirrors}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LensProfile