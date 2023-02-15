import React from 'react'
import '../styles/hero.css'

// Components
import LoadingSpinner from './loadingSpinner';



const startUrl = "https://lens.infura-ipfs.io/ipfs/";

const Hero = ({ loadingProfile, profileFound, profile, connecting, connectWallet, currentAccount }) => {

  const renderConnected = () => {
    if (connecting) {
      return (
        <div className="flex justify-center my-3 bg-red-900"><LoadingSpinner /></div>
      )
    } else {
      if (currentAccount === "") {
        return <button onClick={connectWallet} className="bg-green-100 hero-button">Connect Wallet</button>
      } else {
        return (
          <>
            {renderProfile()}
          </>
        )
      }
    }
  }

  const renderProfile = () => {
    if (loadingProfile) {
      return (
        <div className="flex justify-center my-3"><LoadingSpinner /></div>
      )
    } else {
      if (!profileFound) {
        return <p className='hero-button'>No Lens Profile Found</p>
      } else {
        return (
          <button className='hero-button'>
            Mint NFT
          </button>
        )
      }
    }
  };

  return (
    <div>
   <div className='relative font-bold text-white items-center text-3xl justify-between mx-auto' style={{flexDirection: "row"}}>
  <p>Welcome to Lens Garden</p>
  <p className='text-lg'>Lens Garden is the first NFT collection on Lens.</p>
  <p className='text-lg'>Your NFT is connected to your activity on the Lens Protocol ecosystem.</p>
  <p className='text-lg'>Level up your NFT by using the protocol.</p>
</div>
</div>


  
  )
}

export default Hero

// .hero
// .hero .hero-container
// .hero .hero-container .hero-title
// .hero .hero-container .hero-description
// .hero .hero-container .hero-button