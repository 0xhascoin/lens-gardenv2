import React from 'react'
import { useNavigate } from 'react-router-dom';
import LensChart from './lensChart';
import LensProfile from './lensProfile'
import LoadingSpinner from './loadingSpinner';
import bggarden2 from "../styles/images/bggarden2.jpeg"
import Points from './points';


const LensProfileStats = ({ profile }) => {
    return (
            <div className='w-full m-auto w-11/12 text-center rounded-lg bg-cover bg-center mt-10'>
                {/* <h1 className="text-2xl">{profile.handle} Profile Stats</h1> */}

                <div className="grid-cols-2 bg-transparent rounded-lg sm:flex sm:justify-between sm:items-start h-full w-full">
                    {/* Profile */}
                    <LensProfile profile={profile} />
                    {/* Pie chart */}
                    
                    <LensChart stats={profile.stats} />
                    
                </div>
            </div>
    )
}

export default LensProfileStats