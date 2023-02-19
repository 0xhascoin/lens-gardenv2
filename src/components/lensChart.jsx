import React from 'react'
import { Chart } from "react-google-charts";
import { SlUserFollowing } from 'react-icons/sl'
import { BiGroup, BiCommentDots, BiCollection } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { VscMirror } from 'react-icons/vsc'

export const data = [
  ["Stat", "Total"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

export const options = {
  title: "Total Lens Stats",
  pieHole: 0.5,
  is3D: false,
};

const LensChart = ({ stats }) => {

  const statsData = [
    ["Stat Name", "Stat Total"],
    ["Following", stats.totalFollowing],
    ["Followers", stats.totalFollowers],
    ["Posts", stats.totalPosts],
    ["Comments", stats.totalComments],
    ["Collects", stats.totalCollects],
    ["Mirrors", stats.totalMirrors],
  ]
  console.log("Stats: ", stats);
  return (
    <div className="w-full md:w-1/2 h-full">
      <div className="flex justify-center p-1">
        <Chart
          chartType="PieChart"
          width="100%"
          height="500px"
          data={statsData}
          options={options}
        />
      </div>
      <h2 className="text-xl text-center text-emerald-600 mb-4 mt-4">Points Calculation</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">

        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <SlUserFollowing className='h-6 w-6 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+10 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiGroup className='h-8 w-8 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+50 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <FiSend className='h-8 w-8 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCommentDots className='h-8 w-8 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCollection className='h-8 w-8 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center rounded-lg border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <VscMirror className='h-8 w-8 text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div>

      </div>
    </div>
  )
}

export default LensChart