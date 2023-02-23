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
    color: '#388E3C'
  },
  legend: {
    textStyle: {
      fontSize: 14,
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
  
  console.log("Stats: ", stats);
  return (
    <div className="w-full md:w-1/2 bg-transparent">
      <div className="font-semibold w-full flex justify-end mx-auto mt-22">
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