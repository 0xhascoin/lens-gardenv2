import React from 'react'
import '../styles/hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      {/* Container */}
      <div className="hero-container">
        {/* Title */}
        <h3 className="hero-title">
          Title goes here
        </h3>
        {/* Description */}
        <p className="hero-description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Dolor error beatae quos nisi impedit repudiandae perspiciatis 
          delectus fugiat eaque esse.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Dolor error beatae quos nisi impedit repudiandae perspiciatis 
          delectus fugiat eaque esse.
        </p>
        {/* Button */}
        <button className="hero-button">
          Connect wallet
        </button>
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