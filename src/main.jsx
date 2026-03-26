import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const ultimateBtn = document.getElementById('ultimate')
const homeBtn = document.getElementById('home')

const navLinks = document.querySelector(".nav-links")
const hamburger = document.querySelector(".hamburger")
const close= document.querySelector(".close")

const ultimateContainer = document.getElementById('ultimate-tictactoe')
const classicContainer = ultimateContainer.cloneNode(true).childNodes

let root = null

function mountReact(){
   if (!root) {
    root = createRoot(ultimateContainer)
  }
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

function unMountReact(){
   if (root) {
    root.unmount()
    root = null
  }
  ultimateContainer.replaceChildren(...Array.from(classicContainer).map(node => node.cloneNode(true)))
}

ultimateBtn.addEventListener('click', (e) => {
  e.preventDefault()
  navLinks.classList.remove("active")
  hamburger.classList.remove("active")
  close.classList.remove("active")
  mountReact()
 
})

homeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  unMountReact()
})