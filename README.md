# 🕹️ Tic-Tac-Toe — Squid Game Edition

A modern, responsive, and visually engaging **Tic-Tac-Toe** game featuring both **Classic** and **Ultimate** modes, inspired by the *Squid Game* theme.

This project is a **Hybrid Web Application**: 
- 🟢 **Classic Mode** built using **HTML5, CSS3, and Vanilla JavaScript** 

- 🔴 **Ultimate Mode** built using **React 19** 

- 🧭 Navigation and routing are handled using a **custom client-side history-based routing logic** (using the **History API**), with dynamic mounting/unmounting of React and Vanilla JS views

- 🚧 Includes a custom **404 Page Not Found** fallback page with proper fallback routing for invalid routes and undefined paths

---

## 🌐 Live Demo
[🎮 Play the Game](https://aaditya-tictactoe.vercel.app/)

---

## 🛠️ Tech Stack

This project leverages a **Hybrid Web Architecture** to deliver two completely distinct gameplay mechanics within a unified application layout:

- **Frontend Core (Classic Mode):** Built with raw **HTML5, semantic CSS3, and Vanilla JavaScript (ES6+)** to maintain a lightweight execution context for the traditional board.

- **Component-Driven Framework (Ultimate Mode):** Powered by **React 19** to smoothly manage complex game state changes, handle automatic mini-board flips, and bring in the 3D effects needed for Ultimate Tic-Tac-Toe.

- **Styling & Presentation:** Component layouts utilize **Tailwind CSS v4** combined with native CSS 3D transforms (`perspective-1000`, `backface-hidden`).

- **Build System & Tooling:** Organized via **Vite v8** for lightning-fast Hot Module Replacement (HMR) and optimized distribution builds, linted strictly using modern flat **ESLint** configurations.

---

## 🚀 Features

- **Hybrid Architecture** — Vanilla JS for classic gameplay + React for Ultimate mode.

- **Manual Routing System** — Custom navigation between game modes without libraries.

- **Themed Gameplay** — Traditional X and O replaced with Triangle and Circle guards.

- **Innovative 3D Card-Flipping Interface:** In Ultimate Mode, completed mini-boards 
dynamically undergo a CSS 3D turn-around sequence to lock in their overall grid score using full-scale Square and Circle Guard masks.

- **Smart Win Detection:** Dynamically identifies winning patterns and renders win lines using CSS transforms (rotate, translate, scaleX) for instant visual feedback.  

- **Background Music** — Squid Game–style tension track with play/pause toggle.

- **Visual Feedback** — Victory animation and highlighted winning tiles.

- **Fully Responsive** — Optimized for desktop and mobile with a custom hamburger menu.

---

## 🎮 How to Play

### 🟢 Classic Mode Rules
Classic mode follows the standard rules of Tic-Tac-Toe, elevated with themed imagery:
1. **The Order:** The Triangle Guard (acting as X) takes the first initiative, followed sequentially by the Circle Guard (acting as O).

2. **Gameplay:** Players take turns clicking an empty cell on the 3x3 grid to claim it with their designated asset token.

3. **Winning:** The first player to align three matching symbols in a continuous horizontal, vertical, or diagonal vector wins the round.

4. **Draw:** If all 9 cells are claimed and no player has secured a matching trio line, the match is officially declared a Draw.

### 🔴 Ultimate Mode Rules
Ultimate Mode introduces a 3×3 “meta grid” made up of smaller 3×3 mini-boards:
1. **The Macro Target:** To win the global match, a player must align three completed *Mini-Boards* in a row (horizontally, vertically, or diagonally).

2. **The Forced Vector:** Your opponent’s exact move on a specific cell index inside a Mini-Board **dictates** the precise Mini-Board coordinate your next move must occur within. 

    *(e.g., If Player 1 plays in the top-right cell of **any** Mini-Board, Player 2 is strictly forced to make their next placement inside the top-right Mini-Board).*

3. **Open Target Board:** If a player's forced move sends them to a Mini-Board that is already won, drawn, or fully occupied, that player receives an open pass to make a move on **any** un-blocked active cell anywhere across the entire macro-board.

4. **Mini-Board Flip:** Once a sub-grid is captured by securing 3 standard cells in a row, the entire block flips over via a 3D animation to display a macro Square, Circle, or combined Draw icon, solidifying that quadrant's value for the global grid.

---

## 📂 Project Structure

```text
TicTacToe/
├── public/                     # Static asset delivery root
│   └── audio/                  # Ambient soundtrack files (.mp3)
├── src/                        # React 19 source ecosystem
│   ├── assets/img/             # Theme vector guards, raster assets, and GIFs
│   ├── components/             # Modular component separation
│   │   ├── Cell.jsx            # Lowest level element mapping & image loading
│   │   ├── MiniBoard.jsx       # 3D backface grid encapsulation
│   │   └── UltimateBoard.jsx   # Macro game state coordinator
│   ├── App.jsx                 # React entry wrapper view 
│   ├── index.css               # Global layout adjustments
│   ├── main.jsx                # Application virtual DOM root mounting
│   ├── script.js               # Vanilla JS core engine & global layout handlers
│   └── style.css               # Core presentation layer layout styles
├── index.html                  # Main HTML markup canvas
├── eslint.config.js            # Strict code-quality syntax parameters
├── package.json                # Dependency manifest and execution scripts
├── vite.config.js              # Vite build orchestration configuration
├── vercel.json                 # Configuration file for deployment and routing on Vercel
└── LICENSE                     # GNU General Public License v3.0
```
---

## 🛠️ Installation & Usage

### Running Locally with Live Reload ###
This setup allows you to test both the Vanilla JS architecture and the React development pipeline simultaneously:

1. **Clone the repository**:
```bash
git clone https://github.com/jaiswal-aaditya/TicTacToe.git
```
2. **Navigate into the project workspace:**
```bash
cd TicTacToe
```
3. **Install development and framework dependencies:**
```bash
npm install
```
4. **Launch the local development environment:**
```bash
npm run dev
```
5. **Open the displayed local URL address (typically http://localhost:5173) inside your browser.**

---

## 📜 Credits & Attributions

This project uses third-party visual and media assets provided by talented creators and platforms.
Full credit goes to the original creators and platforms listed below.

### 🎨 Guard Icons
- Source: [Icons8](https://icons8.com/icons)
- License: Icons8 Free License (attribution required)
- Assets: Multiple icons sourced from Icons8

### 🎭 Player Icons
- Creator: Alex Martynov
- Source: Figma Community
- Collection link: [View icon collection](https://www.figma.com/community/file/1029544322780349488/free-squid-game-mask-icons)
- License: CC BY 4.0 (Creative Commons Attribution 4.0 International)

### 🖼️ Website Logo
- Creator: ANTIPOLYGON YOUTUBE
- Source: [Unsplash](https://unsplash.com)
- Photo link: [View original photo](https://unsplash.com/photos/text-logo-4OY7sk4my_A)
- License: Unsplash License

### 🎞️ GIF
- Creator: Kate Mac
- Source: [Giphy](https://giphy.com)
- Asset Link: [View original GIF](https://giphy.com/stickers/among-us-squid-game-squidgame-4BwiYSodoBKPRx6Lh2)
- License: Downloaded from Giphy — used in accordance with Giphy Terms of Service

### 🎵 Background Tracks
- Source: [Pixabay](https://pixabay.com)
- Track name: 
    1. Squid Game Style Beat | Choir x Vocal | Dark (Shifumi)
    2. Mingle Game
- Track link: 
    1. [Listen Dark(Shifumi) on Pixabay](https://pixabay.com/music/beats-squid-game-style-beat-choir-x-vocal-dark-shifumi-288548/)
    2. [Listen Mingle Game on Pixabay](https://pixabay.com/music/pop-mingle-game-287042/)
- Artists: 
    1. Dark (Shifumi) by YellowBirdBeats
    2. Mingle Game by freq88
- License: Pixabay Content License

---

<p align="center">All assets remain the property of their respective creators and are used according to their licensing terms.</p>

## 📄 License

This project is licensed under the GNU General Public License v3.0. See the `LICENSE` file for the full text.

<p align="center">Made with ❤️ by Aaditya Jaiswal</p>
