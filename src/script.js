import triangleImg from './assets/img/triangle.webp';
import circleImg from './assets/img/circle.webp';
import triangleGuard from './assets/img/triangle-guard.svg';
import circleGuard from './assets/img/circle-guard.svg';

console.log("Welcome to TicTacToe")
const music = document.getElementById("bg-music");
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const app = document.getElementById("ultimate-tictactoe");
let boxes = document.getElementsByClassName("box");
let turn = "X";
let isPlaying = false;
let gameOver = false;

document.querySelector(".info img").style.filter = "hue-rotate(205deg) saturate(2) brightness(105%)";
document.querySelector(".info img").style.borderColor = "rgba(0, 247, 255, 0.6)";
document.querySelector(".info img").style.color = "#ff3a3a";
document.querySelector(".info img").style.fontSize = "3rem";

const setNavbarHeight = () => {
    const height = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${height}px`);
};

const checkWin = () => {
    let imgboxes = document.querySelectorAll(".containers img");
    let wins = [
        [0, 1, 2, 50, -2100, 0, 1.2],
        [3, 4, 5, 50, 0, 0, 1.2],
        [6, 7, 8, 50, 2000, 0, 1.2],
        [0, 3, 6, 8.3333, 0, 90, 1.2],
        [1, 4, 7, 50, 0, 90, 1.2],
        [2, 5, 8, 91.6666, 0, 90, 1.2],
        [0, 4, 8, 50, 0, 45, 1.6],
        [2, 4, 6, 50, 0, 135, 1.6]
    ]
    wins.forEach(e => {
        if ((imgboxes[e[0]].alt === imgboxes[e[1]].alt) && (imgboxes[e[1]].alt === imgboxes[e[2]].alt) && (imgboxes[e[0]].alt !== "")) {
            document.querySelector(".win-line").style.transform = `translate(${e[3]}%, ${e[4]}%) rotate(${e[5]}deg) scaleX(${e[6]})`;

            document.querySelector(".info span").innerText = "Won:\u00A0\u00A0";
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "45%";
            if (imgboxes[e[0]].alt === "X") {
                boxes[e[1]].classList.add("win-box-X");
                boxes[e[2]].classList.add("win-box-X");
                boxes[e[0]].classList.add("win-box-X");
            } else {
                boxes[e[1]].classList.add("win-box-O");
                boxes[e[2]].classList.add("win-box-O");
                boxes[e[0]].classList.add("win-box-O");
            }
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

window.addEventListener('load', setNavbarHeight);
window.addEventListener('resize', setNavbarHeight);

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    close.classList.toggle("active");
});

close.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    close.classList.remove("active");
});

app.addEventListener("click", (e) => {
    const box = e.target.closest(".box");
    const resetBtn = e.target.closest("#reset");
    const musicBtn = e.target.closest("#music-btn");

    const player = document.querySelector(".info img");

    if (box) {
        if (gameOver) return;
        const img = box.querySelector("img");
        if (!img || !img.hidden) return;

        if (turn === "X") {
            img.src = triangleImg;
            img.style.filter = `
            hue-rotate(205deg)
            saturate(2)
            brightness(105%)`
            img.style.borderColor = "rgba(0, 247, 255, 0.6)";
            img.style.color = "#ff3a3a";
            img.style.fontSize = "3rem";;
        } else {
            img.src = circleImg;
            img.style.filter = "none";
            img.style.borderColor = "rgba(255, 0, 255, 0.7)";
            img.style.color = "#f924ce";
            img.style.fontSize = "3rem";
        }
        img.alt = turn;
        img.hidden = false;

        turn = turn === "X" ? "O" : "X";
        checkWin();

        if (!gameOver) {
            player.src = turn === "X" ? triangleGuard : circleGuard ;
            if (turn === "X") {
                player.style.filter = "hue-rotate(205deg) saturate(2) brightness(105%)";
                player.style.borderColor = "rgba(0, 247, 255, 0.6)";
                player.style.color = "#ff3a3a";
                player.style.fontSize = "3rem";
            }
            else {
                player.style.filter = "none";
                player.style.borderColor = "rgba(255, 0, 255, 0.7)";
                player.style.color = "#f924ce";
                player.style.fontSize = "3rem";
            }
            player.alt = turn;
        }
    }

    else if (resetBtn) {
        Array.from(boxes).forEach(box => {
            const img = box.querySelector("img");
            img.src = "";
            img.alt = "";
            img.hidden = true;
            img.style.filter = "none";
            box.classList.remove("win-box-X");
            box.classList.remove("win-box-O");
        });

        turn = "X";
        gameOver = false;
        player.style.filter = "hue-rotate(205deg) saturate(2) brightness(105%)";
        player.style.borderColor = "rgba(0, 247, 255, 0.6)";
        player.style.color = "#ff3a3a";
        player.style.fontSize = "3rem";

        app.querySelector(".info img").src = triangleGuard;
        app.querySelector(".info img").alt = turn;
        app.querySelector(".info span").innerText = "Turn: ";
        app.querySelector(".imgbox img").style.width = "0";
        app.querySelector(".win-line").style.transform =
            "scaleX(0.00000000000000000001)";
    }
    else if (musicBtn) {
        if (!isPlaying) {
            music.play();
            musicBtn.textContent = "🔇 Pause Track";
        } else {
            music.pause();
            musicBtn.textContent = "🔊 Play\u00A0\u00A0Track";
        }
        isPlaying = !isPlaying;
    }
});

export function initializeClassicGame() {
    turn = "X";
    gameOver = false;

    if (music) {
        music.pause();
        music.currentTime = 0;
    }
    isPlaying = false;
    const musicBtn = document.querySelector("#music-btn");
    if (musicBtn) {
        musicBtn.textContent = "🔊 Play\u00A0\u00A0Track";
    }
}