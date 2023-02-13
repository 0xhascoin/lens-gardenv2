import React from 'react'
import '../styles/nftDetails.css'

const NftDetails = () => {
    return (
        <div className='details'>

            {/* Section title */}
            <h2 className="details-title">
                NFTs
            </h2>

            {/* NFTs Row */}
            <div className="details-row">
                <div className="details-col">
                    {/* NFT Details */}
                    <div className="nft-details right">
                        {/* Name */}
                        <h4 className="name">Lens Garden NFT #1: Seed</h4>
                        {/* Level */}
                        <p className="level">Unlocks at level 0</p>
                        {/* Experience */}
                        <p className="exp">0 XP points needed to unlock this</p>
                    </div>
                    {/* NFT Image */}
                    <div className="image">
                        <img src="https://cdn.midjourney.com/029fea47-52b8-448e-9533-e6ad9b850e7f/grid_0.png" alt="" />
                    </div>

                </div>
                <div className="details-col">
                    <div className="image">
                        <img src="https://cdn.midjourney.com/a99a2afd-2c68-46b2-b0fc-60252eb5d408/grid_0.png" alt="" />
                    </div>
                    <div className="nft-details">
                        <h4 className="name">Lens Garden NFT #2: Sprout</h4>
                        <p className="level">Unlocks at level 6</p>
                        <p className="exp">20,000 XP points needed to unlock this</p>
                    </div>
                </div>
            </div>

            <div className="spacing"></div>


            {/* NFTs Row */}
            <div className="details-row">
                <div className="details-col">
                    {/* NFT Details */}
                    <div className="nft-details right">
                        {/* Name */}
                        <h4 className="name">Lens Garden NFT #3: Plant</h4>
                        {/* Level */}
                        <p className="level">Unlocks at level 12</p>
                        {/* Experience */}
                        <p className="exp">80,000 XP points needed to unlock this</p>
                    </div>
                    {/* NFT Image */}
                    <div className="image">
                        <img src="https://cdn.midjourney.com/feac2f1f-422d-44b4-97c7-b16a2b2707ca/grid_0.png" alt="" />
                    </div>
                </div>

                <div className="details-col">
                    <div className="image">
                        <img src="https://cdn.midjourney.com/262dd3af-4b2e-47f7-afdb-41b683a366c2/grid_0.png" alt="" />
                    </div>
                    <div className="nft-details">
                        <h4 className="name">Lens Garden NFT #4: Charm</h4>
                        <p className="level">Unlocks at level 20</p>
                        <p className="exp">120,000 XP points needed to unlock this</p>
                    </div>
                </div>
            </div>

        <div className="spacing"></div>

            {/* NFTs Row */}
            <div className="details-row">
                <div className="details-col">
                    {/* NFT Details */}
                    <div className="nft-details right">
                        {/* Name */}
                        <h4 className="name">Lens Garden NFT #5: Baby Tree</h4>
                        {/* Level */}
                        <p className="level">Unlocks at level 40</p>
                        {/* Experience */}
                        <p className="exp">250,000 XP points needed to unlock this</p>
                    </div>
                    {/* NFT Image */}
                    <div className="image">
                        <img src="https://cdn.midjourney.com/b4fa6557-3bb7-492d-8667-86d21494bee1/grid_0.png" alt="" />
                    </div>
                </div>

                <div className="details-col">
                    <div className="image">
                        <img src="https://cdn.midjourney.com/d2be44b5-e727-47e4-be21-77088a55631b/grid_0.png" alt="" />
                    </div>
                    <div className="nft-details">
                        <h4 className="name">Lens Garden NFT #6: Charm</h4>
                        <p className="level">Unlocks at level 60</p>
                        <p className="exp">480,000 XP points needed to unlock this</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default NftDetails