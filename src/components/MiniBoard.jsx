import Cell from './Cell';
import squareImg from '../assets/img/square.webp';
import circleImg from '../assets/img/circle.webp';

const MiniBoard = ({ cells, boardIndex, onCellClick, isActive, isCurrentPlayerX, winner }) => {
    if (winner) {
        return (
            <div className="flex items-center justify-center p-2">
                 {winner === 'X' && <img src={squareImg} className="w-full saturate-200 hue-rotate-205 select-none pointer-events-none" alt="X won" />}
                 {winner === 'O' && <img src={circleImg} className="w-full select-none pointer-events-none" alt="O won" />}
            </div>
        );
    }
    return (
        <div className={` grid grid-cols-3 gap-1 p-2 border-2 rounded-xl transition-all
      ${isActive ? ' bg-purple-900/30 border-[#bb57fed7] scale-[1.03] z-10 md:animate-border-pulse ' : ' border-gray-500 bg-transparent '} `}>
            {cells.map((cellValue, cellIndex) => (
                <Cell
                    key={cellIndex}
                    value={cellValue}
                    onClick={() => onCellClick(boardIndex, cellIndex)}
                    disabled={!isActive}
                    isCurrentPlayerX={isCurrentPlayerX}
                />
            ))}
        </div>
    );
};

export default MiniBoard;