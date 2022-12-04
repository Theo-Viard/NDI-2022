const contact = document.getElementById("contact");
const lancer = document.getElementById("lancer");
const button = document.getElementById("button")
const jeu = document.getElementById("jeu");
const score = document.getElementById("score");
const nbcapotte = document.getElementById("nbcapotte");
const game = document.getElementById("game");
const bite = document.getElementById("bite");
const maladie = document.getElementById("maladie");
const capotte = document.getElementById("capotte");

function lancerJeu() {
  jeu.removeAttribute("hidden");
  lancer.innerHTML = true;
  button.hidden = true;
}

function jump() {
  if (bite.classList != "jump") {
    bite.classList.add("jump");

    setTimeout(function () {
      bite.classList.remove("jump");
    }, 600);
  }
}

let isAlive = setInterval(function () {

  if(lancer.innerHTML == "true") {
    score.innerHTML = "0";
    lancer.innerHTML = "false";
  }

  // get current bite Y position
  let biteTop = parseInt(window.getComputedStyle(bite).getPropertyValue("top"));
  
  // get current maladie X position
  let maladieLeft = parseInt(window.getComputedStyle(maladie).getPropertyValue("left"));

  // get current capotte X position
  let capotteLeft = parseInt(window.getComputedStyle(capotte).getPropertyValue("left"));

  // score
  let points = parseInt(score.innerText);
  points ++;
  score.innerHTML = points;

  let points2 = parseInt(nbcapotte.innerText);

  // detect collision avec la capotte
  if (capotteLeft < 40 && capotteLeft > 0 && biteTop < 50) {
    if (contact.innerText == "false") {
      points2 ++;
      nbcapotte.innerHTML = points2;
      contact.innerHTML = true;
    }
    if (points2 >= 5) {
      resetGame("Win", points, points2);
    }
  } else {
    contact.innerHTML = false;
  }

  // detect collision avec le maladie
  if (maladieLeft < 40 && maladieLeft > 0 && biteTop >= 140) {
    // collision
    resetGame("Game Over!", points, points2);
  }

  // apparition de la capotte quand le score atteint 5000 points
  if (points > 3000) {
    capotte.style.backgroundImage = "url(img/capotte.png)";
    capotte.style.backgroundSize = "40px 30px";
    capotte.style.animation = "block 6s infinite linear";
  }

}, 1);

document.addEventListener("keydown", function (event) {jump();});

function resetGame(msg, point, score) {
  alert(msg+"\nVous avez un score de "+point+" et avez attrapé "+score+" capottes.");
  location.reload();
}