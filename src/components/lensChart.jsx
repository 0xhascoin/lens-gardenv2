import React from 'react'
import { Chart } from "react-google-charts";

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
      Lens Chart
      <div className="flex justify-center p-1">
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