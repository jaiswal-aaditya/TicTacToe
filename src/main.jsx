import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const ultimateBtn = document.getElementById('ultimate')
const homeBtn = document.getElementById('home')

const navLinks = document.querySelector(".nav-links")
const hamburger = document.querySelector(".hamburger")
const close = document.querySelector(".close")

const ultimateContainer = document.getElementById('ultimate-tictactoe')
const classicContainer = ultimateContainer.cloneNode(true).childNodes

let root = null

function mountReact() {
  if (!root) {
    root = createRoot(ultimateContainer)
  }
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

function unMountReact() {
  if (root) {
    root.unmount()
    root = null
  }
  ultimateContainer.replaceChildren(...Array.from(classicContainer).map(node => node.cloneNode(true)))
}

function render404() {
  if (root) {
    root.unmount()
    root = null
  }
  ultimateContainer.innerHTML = `
  <div class="relative h-[calc(100dvh-var(--navbar-height))] flex items-center justify-center overflow-hidden bg-[#0d0d0d] font-sans">
      
      <div class="absolute inset-0 opacity-20 pointer-events-none" 
           style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 40px 40px;">
      </div>

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#8315ea]/20 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      
      <div class="relative z-10 text-center px-6 max-w-4xl">
        
        <div class="flex justify-center gap-6 -mt-12! md:-mt-1!">
           <div class="w-12 h-12 border-4 border-[#ff6aff] rounded-full shadow-[0_0_20px_#ff6aff]"></div>
           <div style="filter: drop-shadow(0 0 3px #f9b732) drop-shadow(0 0 9px #f9b732);">
              <div class="w-12 h-12 bg-[#ffb4ff] flex items-center justify-center" 
                style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
                  <div class="w-[75%] h-[75%] bg-[#ffad0a]" 
                    style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%); margin-top: 5%;">
                  </div>
              </div>
           </div>
           <div class="w-12 h-12 border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"></div>
           </div>

        <h1 class="text-[8rem]! md:text-[10rem]! font-black text-white leading-none tracking-tighter mt-6!
                   drop-shadow-[0_0_30px_rgba(255,106,255,0.8)]">
          4<span class="text-[8rem]! md:text-[10rem]! text-[#ff6aff] inline-block animate-bounce">0</span>4
        </h1>
        
        <div class="flex flex-col items-center space-y-3 mt-8! md:mt-6!">
          <h2 class="text-xl! sm:text-3xl! md:text-4xl! font-mono font-black text-white tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            ELIMINATED FROM REALITY!
          </h2>
          <p class="text-gray-400 mt-4! md:max-w-150 font-mono text-sm! md:text-base! tracking-[0.2em] leading-relaxed italic opacity-80">
            THE PLAYER OR PAGE YOU ARE LOOKING FOR HAS BEEN DISQUALIFIED FROM THE GAME.
          </p>
        </div>

        <div class="flex flex-col md:flex-row justify-center gap-8 mt-13! md:mt-12!">
        <button data-path="/" 
          class="nav-btn cursor-pointer md:order-2 px-10 py-4 bg-[#8315ea] hover:bg-[#a12ec5] text-white font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(131,21,234,0.6)] border-2 border-[#ff6aff] tracking-widest">
          RETURN TO HOME
        </button>

        <button data-path="/ultimate" 
        class="nav-btn cursor-pointer md:order-1 px-12 py-4 bg-[#181818] hover:bg-[#000000] text-white font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(131,21,234,0.6)] border-2 border-[#ff6aff] tracking-widest">
        ULTIMATE PAGE
        </button>
        </div>
      </div>

      <div class="absolute inset-0 pointer-events-none opacity-[0.04]" 
          style="background: linear-gradient(to bottom, transparent 50%, white 50%); background-size: 100% 3px;">
      </div> 
    </div>
  `

  ultimateContainer.onclick = (e) => {
    const btn = e.target.closest('.nav-btn')
    if (!btn) return
    
    e.preventDefault()
    const targetPath = btn.getAttribute('data-path')
    window.history.pushState({}, "", targetPath)
    handleRouting()
  }
}

function handleRouting() {
  const path = window.location.pathname
  if (path === '/ultimate') {
    mountReact()

  } else if (path === '/' || path === '/index.html') {
    unMountReact()

  } else {
    render404()
  }
}

handleRouting()

window.addEventListener('popstate', handleRouting)

ultimateBtn.addEventListener('click', (e) => {
  e.preventDefault()
  window.history.pushState({}, "", "/ultimate")
  navLinks.classList.remove("active")
  hamburger.classList.remove("active")
  close.classList.remove("active")
  mountReact()
})

homeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  window.history.pushState({}, "", "/")
  unMountReact()
})