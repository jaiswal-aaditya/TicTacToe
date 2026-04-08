import { useState } from 'react';
import squareImg from '../assets/img/square.webp';
import circleImg from '../assets/img/circle.webp';

const Cell = ({ value, onClick, disabled, isCurrentPlayerX }) => {
    const [hasImageError, setHasImageError] = useState(false);

    return (
        <button
            className={` w-full p-0 aspect-square bg-[#054347bf] border rounded-lg flex items-center text-xl font-semibold transition-all duration-200 ease-in-out
        ${hasImageError ? 'overflow-hidden' : 'overflow-visible'}
        
        ${disabled
            ? value
                ? // disabled + filled
                ` cursor-default contrast-75 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#ffffff0b_2px,#ffffff0b_4px)] hover:opacity-75
                    ${value === 'X' ? 'border-[#00f7ff]/60 md:shadow-[0_0_8px_rgba(0,247,255,0.2),inset_0_1px_2px_rgba(255,255,255,0.12)] text-[#ff866a]' : 'border-[#ff00ff]/70 md:shadow-[0_0_8px_rgba(255,0,255,0.3),inset_0_1px_2px_rgba(255,255,255,0.12)] text-[#f342f3]'} `  
                : // disabled + empty
                ` cursor-not-allowed border-white/25 bg-white/2 shadow-[inset_0_1.4px_0_0_#ffffff33] md:shadow-[inset_0_2px_2px_rgba(255,255,255,0.2)] active:animate-shake`

            : value
                ? // active + filled
                ` cursor-default hover:brightness-110
                    ${value === 'X' ? 'border-[#00f7ff]/60 md:shadow-[0_0_10px_rgba(0,247,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.15)] text-[#ff3a3a]' : 'border-[#ff00ff]/70 md:shadow-[0_0_10px_rgba(255,0,255,0.35),inset_0_1px_2px_rgba(255,255,255,0.15)] text-[#f924ce]'} `
                : // active + empty
                ` cursor-pointer border-[#b67600] shadow-[inset_0_2px_4px_0_#ffffff26] md:shadow-[inset_0_3px_6px_rgba(255,255,255,0.15),0_5px_23px_rgba(0,255,255,0.08)] hover:-translate-y-0.5 hover:scale-110 hover:animate-soft-pulse active:animate-ping
                    ${isCurrentPlayerX ? 'hover:bg-[#00595c] hover:border-[#00f7ff]/70 hover:shadow-[0_0_15px_rgba(0,247,255,0.45)]' : 'hover:bg-[#6a0074] hover:border-[#ff00ff]/70 hover:shadow-[0_0_15px_rgba(210,0,230,0.65)]'} `
        }`
                    }

            onClick={onClick}
            disabled={disabled || value !== null}>
            {value === 'X' && <img src={squareImg} className="w-full -translate-y-px drop-shadow-[0_0_8px_#00f7ff] brightness-105 saturate-150 hue-rotate-205 select-none pointer-events-none" alt="X"
            onError={() => setHasImageError(true) }
            onLoad={() =>  setHasImageError(false) } />}

            {value === 'O' && <img src={circleImg} className="w-full -translate-y-px drop-shadow-[0_0_8px_#ff00ff] select-none pointer-events-none" alt="O"  
            onError={() => setHasImageError(true) }
            onLoad={() =>  setHasImageError(false) } />}
        </button>
    );
};

export default Cell;