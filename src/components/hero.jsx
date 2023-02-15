import React from 'react'
import '../styles/hero.css'

const Hero = () => {

  return (
    <div className='hero flex justify-center place-items-center'>
      <div className='border border-black text-center font-bold text-white text-3xl'>
        <h2 className='text-3xl mb-2'>Welcome to Lens Garden</h2>
        <p className='text-lg'>Lens Garden is the first NFT collection on Lens.</p>
        <p className='text-lg'>Your NFT is connected to your activity on the Lens Protocol ecosystem.</p>
        <p className='text-lg'>Level up your NFT by using the protocol.</p>
      </div>
    </div>



  )
}

export default Hero