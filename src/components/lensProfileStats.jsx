import React from 'react'
import { useNavigate } from 'react-router-dom';
import LensChart from './lensChart';
import LensProfile from './lensProfile'
import LoadingSpinner from './loadingSpinner';
import bggarden2 from "../styles/images/bggarden2.jpeg"



const LensProfileStats = ({ profile }) => {
    return (
            <div className='m-auto w-11/12 shadow-xl shadow-black/80 text-center rounded-lg p-6 bg-cover bg-center mt-10' style={{ backgroundImage: `linear-gradient( rgba(0,0,0,.1), rgba(0,0,0,.5) ), url('https://cdn.midjourney.com/3540c85d-5da6-4d20-9594-b1287dce1807/grid_0.png')` }}>
                {/* <h1 className="text-2xl">{profile.handle} Profile Stats</h1> */}

                <div className="bg-slate-50 shadow-xl shadow-black/80 rounded-lg md:flex md:justify-between md:items-start m-auto w-full block">
                    {/* Profile */}
                    <LensProfile profile={profile} />
                    {/* Pie chart */}
                    <LensChart stats={profile.stats} />
                </div>
            </div>
    )
}

export default LensProfileStats