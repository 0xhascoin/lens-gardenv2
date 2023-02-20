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
  is3D: true,
  titleTextStyle: {
    fontSize: 20,
    color: '#388E3C'
  },
  legend: {
    textStyle: {
      fontSize: 14
    }
  },
  colors: ['#9f19d7', '#388E3C', '#e5de00', '#3b82f6', '#df2c14', '#df2c14', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']
    
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
    <div className="w-full md:w-1/2">
      <div className="font-semibold flex justify-center p-1">
        <Chart
          chartType="PieChart"
          width="100%"
          height="500px"
          data={statsData}
          options={options}
        />
      </div>
      <div className=''>
      <h2 className="text-xl text-center text-emerald-600 mb-4 mt-4">Points Calculation</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">

        <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <SlUserFollowing className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+10 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiGroup className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+50 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <FiSend className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCommentDots className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center  border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <BiCollection className=' text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+20 XP</h2>
        </div>
        <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-lg">
          <div className="h-full w-1/2 rounded-l-lg p-4 md:p-2 bg-cover bg-center" style={{ background: 'linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url(https://cdn.midjourney.com/791cbcd1-0b9d-4ba9-bdaa-c3606a59d90e/grid_0.png)' }}>
            <VscMirror className='text-white h-full w-full' />
          </div>
          <h2 className='text-lg text-emerald-800 text-center w-1/2'>+30 XP</h2>
        </div>

      </div>
      <div className=''><p>hi</p></div>
    </div>
  )
}

export default LensChart