import React, { useRef } from 'react';
// import flipSound from '../styles/sounds/flipsound.mp3';

function ImageCard({ imageSrc, imageText, imageTitle, imageDesc, width, height }) {
  const audioRef = useRef(null);

  const playFlipSound = () => {
    // audioRef.current.play();
  };

  return (
    <div className="font group w-[300px] h-[300px] m-auto rounded-lg cursor-pointer"  style={{ width: `${width}px`, height: `${height}px` }}>
      <div
        className="w-full h-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative"
        
      >
        <div className="absolute inset-0" >
          <img
           
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
            src={imageSrc}
            alt=""
            onMouseMove={playFlipSound}
          />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]" >
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{imageTitle}</h1>
            <p className="text-lg">{imageText}</p>
            <p className="text-base">{imageDesc}</p>
          </div>
        </div>
        {/* <audio ref={audioRef} src={flipSound} /> */}
      </div>
    </div>
  );
}

export default ImageCard;
