import { useState } from 'react';
import MiniBoard from './MiniBoard';

const UltimateBoard = () => {
    const [boards, setBoards] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [activeBoard, setActiveBoard] = useState(null);
    const [xIsNext, setXIsNext] = useState(true);

    const [boardWinners, setBoardWinners] = useState(Array(9).fill(null));
    const [ultimateWinner, setUltimateWinner] = useState(null);

    const checkWin = (miniBoard) => {
        const wins = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7], 
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];
        for (let i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i];
            if (miniBoard[a] && miniBoard[a] === miniBoard[b] && miniBoard[a] === miniBoard[c]) {
                return miniBoard[a];
            }
        }
        return null;
    };
    
    const handleCellClick = (boardIdx, cellIdx) => {
        if (ultimateWinner) return; 
        if (boardWinners[boardIdx]) return; 
        if (boards[boardIdx][cellIdx]) return;

        // Update the specific cell
        const newBoards = [...boards];  
        newBoards[boardIdx] = [...newBoards[boardIdx]];
        newBoards[boardIdx][cellIdx] = xIsNext ? 'X' : 'O';
        setBoards(newBoards);

        // Check if this move won the MiniBoard
        const smallBoardWinner = checkWin(newBoards[boardIdx]);
        let newBoardWinners = [...boardWinners];
        if (smallBoardWinner) {
            newBoardWinners[boardIdx] = smallBoardWinner;
            setBoardWinners(newBoardWinners);

            // Check if winning this MiniBoard won the Ultimate Game
            const globalWinner = checkWin(newBoardWinners);
            if (globalWinner) {
                setUltimateWinner(globalWinner);
                setActiveBoard(null);
                return;
            }
        }

        // Determine where the next player must go
        const isTargetBoardWon = newBoardWinners[cellIdx] !== null;
        const isTargetBoardFull = newBoards[cellIdx].every(cell => cell !== null);
        if (isTargetBoardWon || isTargetBoardFull) {
            setActiveBoard(null);
        } else {
            setActiveBoard(cellIdx); 
        }

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
                    isActive={!ultimateWinner && (activeBoard === null || activeBoard === i)}
                    isCurrentPlayerX={xIsNext}
                    winner={boardWinners[i]} />                
            ))}

        </div>
    );
};

export default UltimateBoard;