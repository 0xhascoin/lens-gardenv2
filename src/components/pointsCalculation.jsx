import React from 'react'
import '../styles/points.css'

const Points = ({ title, xp, percentage }) => {
    let perc = Math.floor((xp / 50) * 100);
    return (
        <div className='w-full mb-5 point-card p-3 rounded-lg shadow-xl shadow-black/40'>
            <div className="bg-zinc-900 flex justify-between items-center w-full p-4 py-6 rounded-lg">
                <h2 className='mr-10 text-lg w-1/5 text-gray-50'>{title}</h2>
                <div class="w-1/2 h-8 bg-zinc-700 rounded-lg mr-10">
                    <div class="h-8 bg-gradient-to-r from-cyan-500 rounded-lg" style={{ width: `${perc}%` }}></div>
                </div>
                <h2 className='bold text-lg text-gray-50'>{xp} XP</h2>
            </div>
        </div>
    )
}

// Following - 10
// Followers - 50
// Posts - 30
// Collects - 20
// Mirrors - 30
// Comments - 20

const PointsCalculation = () => {
    return (
        <div className='points'>
            <h1 className='mb-10 bg-white p-4'>Points Calculation</h1>
            <div className="flex justify-center items-center">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 p-3 w-full">
                    <Points title={'Following'} xp={10} />
                    <Points title={'Followers'} xp={50} />
                    <Points title={'Posts'} xp={30} />
                    <Points title={'Comments'} xp={20} />
                    <Points title={'Collects'} xp={20} />
                    <Points title={'Mirrors'} xp={30} />
                </div>
            </div>
        </div>
    )
}

export default PointsCalculation