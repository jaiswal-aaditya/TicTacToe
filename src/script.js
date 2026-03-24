import triangleImg from './assets/img/triangle.webp';
import circleImg from './assets/img/circle.webp';
import triangleGuard from './assets/img/triangle-guard.svg';
import circleGuard from './assets/img/circle-guard.svg';

console.log("Welcome to TicTacToe")
const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");
const resetBtn = document.getElementById("reset");
const hamburger = document.querySelector(".hamburger");
const Close = document.querySelector(".close");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
let boxes = document.getElementsByClassName("box");
let turn = "X";
let isPlaying = false;
let gameOver = false;

const setNavbarHeight = () => {
    const height = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${height}px`);
};

window.addEventListener('load', setNavbarHeight);
window.addEventListener('resize', setNavbarHeight);

btn.addEventListener("click", () => {
    if (!isPlaying) {
        music.play();
        btn.textContent = "🔇 Pause Track";
    }
    else {
        music.pause();
        btn.textContent = "🔊 Play\u00A0\u00A0Track";
    }
    isPlaying = !isPlaying;
});

const checkWin = () => {
    let imgboxes = document.querySelectorAll(".containers img");
    let wins = [
        [0, 1, 2, 50, -2100, 0, 1],
        [3, 4, 5, 50, 0, 0, 1],
        [6, 7, 8, 50, 2000, 0, 1],
        [0, 3, 6, 8.3333, 0, 90, 1],
        [1, 4, 7, 50, 0, 90, 1],
        [2, 5, 8, 91.6666, 0, 90, 1],
        [0, 4, 8, 50, 0, 45, 1.4],
        [2, 4, 6, 50, 0, 135, 1.4]
    ]
    wins.forEach(e => {
        if ((imgboxes[e[0]].alt === imgboxes[e[1]].alt) && (imgboxes[e[1]].alt === imgboxes[e[2]].alt) && (imgboxes[e[0]].alt !== "")) {
            document.querySelector(".win-line").style.transform = `translate(${e[3]}%, ${e[4]}%) rotate(${e[5]}deg) scaleX(${e[6]})`;

            document.querySelector(".info span").innerText = "Won:  ";
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "45%";
            boxes[e[0]].classList.add("win-box")
            boxes[e[1]].classList.add("win-box")
            boxes[e[2]].classList.add("win-box")
            gameOver = true;
        }
    });
    if (!gameOver) {
        let isFull = true;
        for (let i = 0; i < imgboxes.length; i++) {
            if (imgboxes[i].alt === "") {
                isFull = false; // Found an empty box, not a draw yet
                break;
            }
        }
        if (isFull) {
            gameOver = true;
            document.querySelector(".info span").innerText = "Draw: ";
        }
    };
};

Array.from(boxes).forEach(element => {
    element.addEventListener("click", () => {
        if (gameOver) return;
        const img = element.querySelector("img");
        const player = document.querySelector(".info img");
        if (img.hidden) {
            img.src = turn === "X" ? triangleImg : circleImg;
            img.alt = turn;
            img.hidden = false;
            turn = turn === "X" ? "O" : "X";
            checkWin();
            if (!gameOver) {
                player.src = turn === "X" ? triangleGuard : circleGuard;
                player.alt = turn;
            }
        }
    })
});

resetBtn.addEventListener("click", () => {
    Array.from(boxes).forEach(box => {
        const img = box.querySelector("img");
        img.src = "";
        img.alt = "";
        img.hidden = true;
        box.classList.remove("win-box");
    });
    turn = "X";
    gameOver = false;
    document.querySelector(".info img").src = triangleGuard;
    document.querySelector(".info img").alt = turn;
    document.querySelector(".info span").innerText = "Turn: ";
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0";
    document.querySelector(".win-line").style.transform = "scaleX(0.00000000000000000001)";
});

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    Close.classList.toggle("active");
});
Close.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    Close.classList.remove("active");
});