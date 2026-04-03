import { useState } from 'react';
import MiniBoard from './MiniBoard';

const UltimateBoard = () => {
    const [boards, setBoards] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [activeBoard, setActiveBoard] = useState(null);
    const [xIsNext, setXIsNext] = useState(true);

    const handleCellClick = (boardIdx, cellIdx) => {
        const newBoards = [...boards];  
        newBoards[boardIdx] = [...newBoards[boardIdx]];
        newBoards[boardIdx][cellIdx] = xIsNext ? 'X' : 'O';
        setBoards(newBoards);
        setActiveBoard(cellIdx);
        setXIsNext(!xIsNext);
    };

    return (
        <div className="relative grid grid-cols-3 gap-3 p-1.5 max-w-md mx-auto">

                    {/* Vertical Lines */}
            <div className="absolute w-1 rounded-full inset-y-0 left-1/3 -translate-x-1/2 bg-slate-800/90 shadow-[0_0_10px_rgba(57,255,20,0.4),0_0_3px_rgba(57,255,20,0.5)]" />
            <div className="absolute w-1 rounded-full inset-y-0 left-2/3 -translate-x-1/2 bg-slate-800/90 shadow-[0_0_10px_rgba(57,255,20,0.4),0_0_3px_rgba(57,255,20,0.5)]" />

                    {/* Horizontal Lines */}
            <div className="absolute h-1 rounded-full inset-x-0 top-1/3 -translate-y-1/2  bg-slate-800/90 shadow-[0_0_10px_rgba(57,255,20,0.4),0_0_3px_rgba(57,255,20,0.5)]" />
            <div className="absolute h-1 rounded-full inset-x-0 top-2/3 -translate-y-1/2 bg-slate-800/90 shadow-[0_0_10px_rgba(57,255,20,0.4),0_0_3px_rgba(57,255,20,0.5)]" />

            {boards.map((miniBoardCells, i) => (
                <MiniBoard
                    key={i}
                    boardIndex={i}
                    cells={miniBoardCells}
                    onCellClick={handleCellClick}
                    isActive={activeBoard === null || activeBoard === i}
                    isCurrentPlayerX={xIsNext} />                
            ))}

        </div>
    );
};

export default UltimateBoard;