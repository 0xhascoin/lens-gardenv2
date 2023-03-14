import React from 'react'
import { useNavigate } from 'react-router-dom';
import LensChart from './lensChart';
import LensProfile from './lensProfile'
import LoadingSpinner from './loadingSpinner';
import bggarden2 from "../styles/images/bggarden2.jpeg"
import Points from './points';


const LensProfileStats = ({ profile, mintedLevels }) => {
    return (
            <div className='w-full mx-auto text-center rounded-lg bg-cover bg-center mt-10 sm:pr-2 sm:pl-2 px-2'>
                {/* <h1 className="text-2xl">{profile.handle} Profile Stats</h1> */}

                <div className="grid-cols-2 bg-transparent rounded-lg sm:flex sm:justify-between w-full">
                    {/* Profile */}
                    <LensProfile profile={profile} mintedLevels={mintedLevels} />
                    {/* Pie chart */}
                    
                    <LensChart stats={profile.stats} />
                    
                </div>
            </div>
    )
}

export default LensProfileStats