import { useState } from 'react';
import MiniBoard from './MiniBoard';

const UltimateBoard = () => {
    const [boards, setBoards] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [activeBoard, setActiveBoard] = useState(null);
    const [xIsNext, setXIsNext] = useState(true);

    const [boardWinners, setBoardWinners] = useState(Array(9).fill(null));
    const [ultimateWinner, setUltimateWinner] = useState(null);
    const [ultimateWinningLine, setUltimateWinningLine] = useState(null);
    const [showWinLine, setShowWinLine] = useState(false);

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

                return {
                    winner: miniBoard[a],
                    line: [a,b,c]
                };
            }
        }
        return {
            winner: null,
            line: null
        };
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
        const result = checkWin(newBoards[boardIdx]);
        let newBoardWinners = [...boardWinners];
        if (result.winner) {
            newBoardWinners[boardIdx] = result.winner;
            setBoardWinners(newBoardWinners);

            // Check if winning this MiniBoard won the Ultimate Game
            const globalResult = checkWin(newBoardWinners);
            if (globalResult.winner) {
                setUltimateWinner(globalResult.winner);
                setUltimateWinningLine(globalResult.line);
                setTimeout(() => {
                    setShowWinLine(true);
                }, 10);
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

            {/* Ultimate win line */}
            {ultimateWinner && (
                <div
                    className={`
                        absolute z-50 bg-gray-300 rounded-full
                        shadow-[0_0_20px_white]
                        animate-pulse
                        origin-center
                        transition-transform duration-700
                        pointer-events-none
                    `}
                    style={{
                        width:
                            ultimateWinningLine.join('') === '012' ||
                            ultimateWinningLine.join('') === '345' ||
                            ultimateWinningLine.join('') === '678'
                                ? '90%'

                                :ultimateWinningLine.join('') === '048' ||
                                 ultimateWinningLine.join('') === '246'
                                    ? '120%'

                                    : '6px',

                        height:
                            ultimateWinningLine.join('') === '036' ||
                            ultimateWinningLine.join('') === '147' ||
                            ultimateWinningLine.join('') === '258'
                                ? '90%'

                                : '6px',

                        top:
                            ultimateWinningLine.join('') === '012'
                                ? '16.5%'
                                : ultimateWinningLine.join('') === '345'
                                    ? '50%'
                                    : ultimateWinningLine.join('') === '678'
                                        ? '83.5%'
                                        : '50%',

                        left:
                            ultimateWinningLine.join('') === '036'
                                ? '16.5%'
                                : ultimateWinningLine.join('') === '147'
                                    ? '50%'
                                    : ultimateWinningLine.join('') === '258'
                                        ? '83.5%'
                                        : '50%',

                        transform:`
                            translate(-50%, -50%)
                        
                            ${ultimateWinningLine.join('') === '048'
                                ? 'rotate(45deg)'
                                : ultimateWinningLine.join('') === '246'
                                    ? 'rotate(-45deg)'
                                    : ''
                            }

                            ${
                            ultimateWinningLine.join('') === '036' ||
                            ultimateWinningLine.join('') === '147' ||
                            ultimateWinningLine.join('') === '258'
                                ? `scaleY(${showWinLine ? 1 : 0})`
                                : ultimateWinningLine.join('') === '048' ||
                                  ultimateWinningLine.join('') === '246'
                                    ? `scale(${showWinLine ? 1 : 0})`
                                    : `scaleX(${showWinLine ? 1 : 0})`
                            }
                        `
                    }}
                />
            )}
            {boards.map((miniBoardCells, i) => (
                <MiniBoard
                    key={i}
                    boardIndex={i}
                    cells={miniBoardCells}
                    onCellClick={handleCellClick}
                    isActive={!ultimateWinner && (activeBoard === null || activeBoard === i)}
                    isCurrentPlayerX={xIsNext}
                    winner={boardWinners[i]}
                    winLine={ultimateWinningLine} />                
            ))}

        </div>
    );
};

export default UltimateBoard;