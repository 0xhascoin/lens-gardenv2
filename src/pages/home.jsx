import React from 'react'
import '../styles/home.css'

// Components
import Header from '../components/header'
import Hero from '../components/hero'
import NftDetails from '../components/nftDetails'

const Home = () => {
  return (
    <div className='home'>
      <div className="main">
        <Header />
        <Hero />
      </div>
      <div className="nft-details-bg">
        <NftDetails />
      </div>
    </div>
  )
}

export default Home