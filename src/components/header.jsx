import React from 'react'
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header flex justify-between items-center'>
      {/* Branding */}
      <div className="branding">
        {/* Branding Image */}
        {/* Branding Text */}
        <Link className='branding-container flex justify-center items-end'>
          <img 
            src="https://cdn.midjourney.com/9835ff89-03f8-4e98-9b0b-e5abae598694/grid_0.png"
            className='branding-image'
            />
          <p className='branding-text'>Lens Garden</p>
        </Link>
      </div>

      {/* Links & Connect Button */}
      <div className="header-links flex justify-between items-center">
        {/* Links */}
        <div className="nav-links flex justify-center items-center mr-6">
          <Link className='nav-item transition-all'>View Garden</Link>
          <Link className='nav-item transition-all'>Mint NFT</Link>
        </div>
        {/* Connect Button */}
        <div className="nav-button">
          <button className="connect-button">Connect Wallet</button>
        </div>
      </div>
    </div>
  )
}

export default Header

