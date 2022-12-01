const game = document.getElementById("game");
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");
const nbcapotte = document.getElementById("nbcapotte");
const capotte = document.getElementById("capotte");

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 600);
  }
}

let isAlive = setInterval(function () {

  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  
  // get current cactus X position
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // detect collision avec le cactus
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    resetGame("Game Over!");
  }

  //score
  let cpt = parseInt(score.innerText);
  cpt++;
  score.innerHTML = cpt;

  let capotteLeft = parseInt(window.getComputedStyle(capotte).getPropertyValue("left"));

  // detect collision avec la capotte
  if (capotteLeft < 50 && capotteLeft > 0 && dinoTop < 50) {
    let cpt2 = parseInt(nbcapotte.innerText);
    cpt2 ++;
    nbcapotte.innerHTML = cpt2;

    if (cpt2 >= 11) {
      resetGame("Win");
    }
  }

}, 1);

document.addEventListener("keydown", function (event) {jump();});

function resetGame(msg) {
  alert(msg);
  location.reload();
}