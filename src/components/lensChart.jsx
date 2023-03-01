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
   
    fontSize:20,
    color: '#ffffff'
  },
  legend: {
    textStyle: {
      fontSize: 10,
     
      color: '#ffffff'
    }
  },
  backgroundColor: "#1e293b",
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
  
  // console.log("Stats: ", stats);
  return (
    <div className="w-full sm:w-1/2 mt-2 sm:mt-0 border-white bg-slate-800 border-2 sm:ml-2 rounded-lg ">
      <div className='font pt-5 sm:pt-14 sm:text-2xl text-lg px-2 sm:px-0 relative text-white'>The following statistics and XP calculations apply to Tier 1.</div>
      <div className="sm:w-3/4 w-10/12 flex mx-auto border-2  sm:mt-4 mt-6 border-green-500"></div>
      <div className="chart font-semibold sm:pt-4 w-full mx-auto p-2 rounded-lg ">
        <Chart
        
          chartType="PieChart"
          width="100%"
          height="500px"
          data={statsData}
          options={options}
        />
      </div>
     
    </div>
  )
}

export default LensChart