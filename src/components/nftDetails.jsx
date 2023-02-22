import React from 'react'
// import '../styles/nftDetails.css'
import Tree from '../styles/images/Tree.jpg';
import ImageCard from './ImageCard';

const NftDetails = () => {
    return (
        <div className="nfts flex justify-center ">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-3">
           <ImageCard imageSrc={'https://cdn.midjourney.com/a89f296d-cfd2-4991-b2a1-17cf4ee45fe5/grid_0.png'} imageTitle={"Lens Garden NFT #1: Seed"} imageText={"Unlocks at level 0"} imageDesc={"0 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/e8da90a1-f4e6-469b-897c-6ed7fb6dbc93/grid_0.png'} imageTitle={"Lens Garden NFT #2: Seedling"} imageText={"Unlocks at level 2"} imageDesc={"2,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/1c2ee78c-0806-457e-9799-ff68cdcdad8b/grid_0.png'} imageTitle={"Lens Garden NFT #3: Sprout"} imageText={"Unlocks at level 6"} imageDesc={"17,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/780ec8a1-f3a1-40bc-863f-5ef7a781e9a0/grid_0.png'} imageTitle={"Lens Garden NFT #4: Plant"} imageText={"Unlocks at level 10"} imageDesc={"257,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/b1249663-32b5-4dac-b891-49ccf378fe50/grid_0.png'} imageTitle={"Lens Garden NFT #5: Bush"} imageText={"Unlocks at level 15"} imageDesc={"8,193,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/39731e06-e97b-4802-91da-139ae32bea1d/grid_0.png'} imageTitle={"Lens Garden NFT #6: Baby tree"} imageText={"Unlocks at level 18"} imageDesc={"65,537,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/2283b9ff-4273-4c2d-9291-f12138bee07a/grid_0.png'} imageTitle={"Lens Garden NFT #7: Baby Oak"} imageText={"Unlocks at level 21"} imageDesc={"524,289,000 XP points needed to unlock this"} />
           <ImageCard imageSrc={'https://cdn.midjourney.com/d980f8b4-c4e8-4e7e-84d9-7d5006a320d5/grid_0.png'} imageTitle={"Lens Garden NFT #8: Oak"} imageText={"Unlocks at level 27"} imageDesc={"33,554,433,000 XP points needed to unlock this"} />
           <ImageCard imageSrc={'https://cdn.midjourney.com/b5ae6e99-e7c5-4705-ae4d-9c89303aa386/grid_0.png'} imageTitle={"Lens Garden NFT #9: Grandpa Oak"} imageText={"Unlocks at level 35"} imageDesc={"8,589,934,593,000 XP points needed to unlock this"} />
         </div>
       </div>
    )
}

export default NftDetails