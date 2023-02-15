import React from 'react';

import logo1 from '../styles/images/logo1.png'
function ImageCard({ imageSrc, imageText }) {
    return (
      <div className="group h-64 w-64 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0">
            <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src={imageSrc} alt="" />
          </div>
          <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">{imageText}</h1>
              <p className="text-lg">Title</p>
              <p className="text-base">Description goes here.</p>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default ImageCard;
  