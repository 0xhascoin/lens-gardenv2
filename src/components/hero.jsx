import React from 'react'
import '../styles/hero.css'

const Hero = () => {

  return (
    <div className='hero flex justify-center place-items-center'>
      <div className='text-center font-bold text-white text-3xl'>
        <h2 className=' mb-3 font-serif text-slate-100 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black'>Welcome to Lens Garden</h2>
        <p className='text-lg font-sans font-light text-slate-50'>Lens Garden is the first NFT collection on Lens.</p>
        <p className='text-lg font-sans font-light text-slate-50'>Your NFT is connected to your activity on the Lens Protocol ecosystem.</p>
        <p className='text-lg font-sans font-light text-slate-50'>Level up your NFT by using the protocol.</p>
      </div>
    </div>



  )
}

export default Hero