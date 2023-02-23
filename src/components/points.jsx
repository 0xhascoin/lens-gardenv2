import React from 'react';
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'

const Points = () => {
  return (
    <div className='bg-slate-800 rounded '>
      <h2 className="text-2xl text-center text-emerald-600 mb-4 mt-6">Points Calculation</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 ">
        <div className="w-full h-2/3 flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <SlUserFollowing className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+10 XP</h2>
        </div>
        <div className="w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiGroup className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+50 XP</h2>
        </div>
        <div className="w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <FiSend className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div>
        <div className="w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCommentDots className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full h-2/3  flex justify-between items-center  border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCollection className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full h-2/3  flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <VscMirror className='text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div> 
        </div>
        </div>
        );
}

export default Points;




