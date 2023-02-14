import React from 'react'
import '../styles/hero.css'

// Components
import LoadingSpinner from './loadingSpinner';



const startUrl = "https://lens.infura-ipfs.io/ipfs/";

const Hero = ({ loadingProfile, profileFound, profile, connecting, connectWallet, currentAccount }) => {

  const renderConnected = () => {
    if (connecting) {
      return (
        <div className="flex justify-center my-3"><LoadingSpinner /></div>
      )
    } else {
      if (currentAccount === "") {
        return <button onClick={connectWallet} className="hero-button">Connect Wallet</button>
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
    <div className='hero'>
      {/* Container */}
      <div className="hero-container">
        {/* Title */}
        <h3 className="hero-title">
          Welcome to Lens Garden
        </h3>
        {/* Description */}
        <p className="hero-description">
          Lens Garden is the first NFT collection on Lens. <br />
          Your NFT is connected to your activity on the Lens Protocol ecosystem. <br />
          Level up your NFT by using the protocol.
        </p>
        {/* Button */}
        {renderConnected()}
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