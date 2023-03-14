import React from 'react'
import '../styles/hero.css'
import { BsGlobe } from 'react-icons/bs'


const Hero = () => {

  return (
    <div className='hero flex justify-center place-items-center p-2 sm:p-4 mt-1 sm:mt-2'>
      
      <div className='text-center font-bold text-white'>
        <h2 className='font writer writer-text mb-3 text-white text-xl sm:text-5xl'>Welcome to Lens Garden!</h2>
        <p className='font sm:text-2xl text-white text-sm'>Lens Garden is the first NFT collection on Lens.</p>
        <p className='font sm:text-2xl text-white text-sm'>Your NFT is connected to your activity on the Lens Protocol ecosystem.</p>
        <p className='font sm:text-2xl text-white text-sm'>Level up your NFT by using the protocol.</p>
        
  
      
            <div className="card-seperator border-2 rounded-lg mt-4 border-green-500"></div>
      </div>
      
    </div>



  )
}

export default Hero