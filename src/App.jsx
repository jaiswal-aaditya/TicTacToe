import { useState } from 'react';
import UltimateBoard from './components/UltimateBoard';

function App() {
  return (
    <div className="min-[860px]:flex min-[860px]:justify-center min-[860px]:items-center min-[860px]:gap-18">
      {/* UltimateBoard */}
      <div className="min-[860px]:relative min-[860px]:left-0 min-[860px]:shrink-0">
        <UltimateBoard />
      </div>

      {/* Game Info */}
      <div className="game-info mt-3! min-[860px]:mt-0 min-[860px]:p-10! min-[860px]:shrink-0">
        <button className="music" id="music-btn-mingle">
          🔊 Play&nbsp;&nbsp;Track
        </button>

        <audio id="bg-music-mingle" loop>
          <source src="audio/mingle-game.mp3" type="audio/mpeg" />
        </audio>

        <div className="flex justify-center">
          <h1 className="whitespace-nowrap text-[135%]! md:text-[150%]!">
            Welcome to Ultimate TicTacToe
          </h1>
        </div>

        <div className="turn">
          <span className="info">
            <span>Turn: </span>
            <img className='hue-rotate-205 saturate-200 brightness-105' src="/square-guard.svg" alt="X" width="50%" />
          </span>

          <button className="reset-btn" id="reset-mingle">
            Reset
          </button>
        </div>

        <div className="imgbox">
          <img src="/src/assets/img/win.gif" alt="Win" width="0px" />
        </div>
      </div>
    </div>
  );
}

export default App;