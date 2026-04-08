import Cell from './Cell';

const MiniBoard = ({ cells, boardIndex, onCellClick, isActive, isCurrentPlayerX }) => {
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