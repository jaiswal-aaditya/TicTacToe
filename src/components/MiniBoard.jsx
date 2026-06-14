import { useState, useEffect } from 'react';
import Cell from './Cell';
import squareImg from '../assets/img/square.webp';
import circleImg from '../assets/img/circle.webp';

const MiniBoard = ({ cells, boardIndex, onCellClick, isActive, isCurrentPlayerX, winner, miniBoardWinLine, winLine }) => {
    const [flipped, setFlipped] = useState(false);
    const line = miniBoardWinLine?.join('');
    const handleFlip = () => {
        if (winner) setFlipped(prev => !prev);
    };

    useEffect(() => {
        if (!winner) return;
        const timer = setTimeout(() => {
            setFlipped(true);
        }, 400);

        return () => clearTimeout(timer);
    }, [winner]);

    return (
        <div onClick={handleFlip}
            className="perspective-1000 cursor-pointer">
            <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
                    ${flipped ? 'rotate-y-180' : ''}`}>

                {/* FRONT SIDE (board) */}
                <div className="backface-hidden">
                    <div className={` relative grid grid-cols-3 gap-1 p-2 border-2 rounded-xl transition-all
                        ${  winner==='X'
                                ?'border-cyan-500/70 bg-cyan-800/30 shadow-[0_0_18px_rgba(34,211,238,0.55)] select-none pointer-events-none'
                            : winner==='O'
                                ? 'border-pink-500/70 bg-pink-900/30 shadow-[0_0_22px_rgba(236,72,153,0.55)] select-none pointer-events-none '
                            : winner === 'D'
                                ? 'border-gray-400 bg-gray-950/60 select-none pointer-events-none'
                            : isActive
                                ? 'border-[#bb57fed7] bg-purple-900/30  scale-[1.03] z-10 md:animate-border-pulse ' 
                            : ''
                        } `}>
                        
                        {cells.map((cellValue, cellIndex) => (
                            <Cell
                                key={cellIndex}
                                value={cellValue}
                                onClick={() => onCellClick(boardIndex, cellIndex)}
                                disabled={!isActive || winner}
                                isCurrentPlayerX={isCurrentPlayerX}
                            />
                        ))}

                        {/* MiniBoard win line logic */}
                        {winner && miniBoardWinLine && (
                            <div
                                className={`
                                    absolute z-20 rounded-full pointer-events-none origin-center animate-pulse
                                    ${winner === 'X' 
                                        ? 'bg-cyan-400 shadow-[0_0_12px_#00f7ff]' 
                                        : 'bg-pink-400 shadow-[0_0_12px_#ff00ff]'
                                    }`}
                                style={{
                                    width:
                                        line === '012' ||
                                        line === '345' ||
                                        line === '678'
                                            ? '90%'
                                            : line === '048' ||
                                              line === '246'
                                                ? '120%'
                                                : '3px',

                                    height:
                                        line === '036' ||
                                        line === '147' ||
                                        line === '258'
                                            ? '90%'
                                            : '3px',

                                    top:
                                        line === '012'
                                            ? '19%'
                                            : line === '345'
                                                ? '50%'
                                                : line === '678'
                                                    ? '80%'
                                                    : '50%',

                                    left:
                                        line === '036'
                                            ? '19%'
                                            : line === '147'
                                                ? '50%'
                                                : line === '258'
                                                    ? '80%'
                                                    : '50%',

                                    transform: `
                                        translate(-50%, -50%)
                                        ${line === '048'
                                            ? 'rotate(45deg)'
                                            : line === '246'
                                                ? 'rotate(-45deg)'
                                                : ''
                                        }
                                    `
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* BACK SIDE (winner) */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                    {winner && (
                        <div
                            className={`h-full w-full rounded-lg flex items-center justify-center
                            ${
                                winLine?.includes(boardIndex)
                                ? winner === 'X'
                                    ? 'bg-[#009fa4] hover:bg-[#00c0c6] '
                                    : 'bg-[#bd009a] hover:bg-[#e600bb]'
                                : ''
                            }`}>
                            {winner === 'X' && (
                                <img
                                src={squareImg}
                                className="w-full brightness-105 saturate-200 hue-rotate-205 text-[#ff5e5e] text-2xl! md:text-4xl! select-none pointer-events-none "
                                alt="X won"
                                />
                            )}
                            {winner === 'O' && (
                                <img
                                src={circleImg}
                                className="w-full text-[#f924ce] text-2xl! md:text-4xl! select-none pointer-events-none"
                                alt="O won"
                                />
                            )}
                            {winner === 'D' && (
                                <div className="flex w-full h-full">

                                    {/* Left Half (Square Image) */}
                                    <div className="w-1/2 h-full overflow-hidden relative">
                                        <img
                                            src={squareImg}
                                            className="brightness-105 saturate-200 hue-rotate-205 text-[#b2b2b2] text-2xl! md:text-4xl! absolute top-0 left-0 w-[200%] h-full object-cover select-none pointer-events-none"
                                            alt="Draw"
                                        />
                                    </div>

                                    {/* Right Half (Circle Image) */}
                                    <div className="w-1/2 h-full overflow-hidden relative">
                                        <img
                                            src={circleImg}
                                            className="text-2xl! md:text-4xl! absolute top-0 -left-full w-[200%] h-full object-cover select-none pointer-events-none"
                                            alt="Draw"
                                        />
                                    </div>

                                </div>
                            )}
                        </div>
                        )}
                </div>
            </div>
        </div>       
    );
};

export default MiniBoard;