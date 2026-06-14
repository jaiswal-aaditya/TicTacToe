import { useState, useRef } from 'react';
import UltimateBoard from './components/UltimateBoard';
import circleGuard from './assets/img/circle-guard.svg';
import winGif from './assets/img/win.gif';

let initializeUltimateMusic = () => { };

function App() {
  const audioRef = useRef(null);

  const [xIsNext, setXIsNext] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [resetGameKey, setResetGameKey] = useState(0);

  const handleReset = () => {
    setResetGameKey(prev => prev + 1);
    setXIsNext(true);
    setGameResult(null);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const ultimateMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(!isPlaying);
    }
  }

  initializeUltimateMusic = ultimateMusic;

  return (
    <div className="min-[860px]:flex min-[860px]:justify-center min-[860px]:items-center min-[860px]:gap-18"
    style={{ minHeight: 'calc(100dvh - var(--navbar-height, 70px))' }}>

      {/* UltimateBoard */}
      <div className="min-[860px]:relative min-[860px]:left-0 min-[860px]:shrink-0">
        <UltimateBoard
          key={resetGameKey}
          xIsNext={xIsNext}
          setXIsNext={setXIsNext}
          setGameResult={setGameResult} />
      </div>

      {/* Game Info */}
      <div className="game-info mt-2.5! min-[860px]:mt-0! min-[860px]:p-10! min-[860px]:shrink-0">
        <button className="music" onClick={toggleMusic}>

          {isPlaying ? '🔇 Pause Track' : '🔊 Play\u00A0\u00A0Track'}
        </button>

        <audio ref={audioRef} loop>
          <source src="/audio/mingle-game.mp3" type="audio/mpeg" />
        </audio>

        <div className="flex justify-center -mb-1.5! min-[860px]:mb-0! ">
          <h1 className="whitespace-nowrap text-[135%]! md:text-[150%]!">
            Welcome to Ultimate TicTacToe
          </h1>
        </div>

        <div className="turn">
          <span className="info">
            <span>
              {
                gameResult === 'D'
                  ? 'Draw: '
                  : gameResult
                    ? `Won:\u00A0\u00A0`
                    : 'Turn: '
              }
            </span>
            <img className={
              xIsNext
                ? 'hue-rotate-205 saturate-200 brightness-105 border-[#00f7ff]/60 text-[#ff3a3a] text-5xl!'
                : 'border-[#ff00ff]/70 text-[#f924ce] text-5xl!'}
              src={
                xIsNext
                  ? '/square-guard.svg'
                  : circleGuard }
              alt={xIsNext ? 'X' : 'O'}
              width="55%" />
          </span>

          <button className="reset-btn" onClick={handleReset} >
            Reset
          </button>
        </div>

        <div className='imgbox flex justify-center'>
          <img src={winGif}
            alt="Win"
            width="0px"
            className='select-none pointer-events-none hue-rotate-220 saturate-300 brightness-105 transition-all duration-1500 ease-in-out'
            style={{
              width:
                gameResult === 'X' || gameResult === 'O'
                  ? '45%'
                  : '0px'
            }} />
        </div>
      </div>
    </div>
  );
}

export { initializeUltimateMusic };
export default App;