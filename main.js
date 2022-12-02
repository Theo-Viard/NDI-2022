class Plateau {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    effacer() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }
}

class PersonnagePrincipal {
    constructor(plateau) {
        this.plateau = plateau
        this.x = this.plateau.canvas.width/2;
        this.y = this.plateau.canvas.height/2;
        this.img = document.getElementById("persoPrinc");
        this.width = 10 / 100 * this.img.width; 
        this.height = 10 / 100 * this.img.height; 
        this.keys = new Set();
        this.listeBalles = [];
    }

    dessiner() {
        this.plateau.ctx.beginPath();
        this.plateau.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.plateau.ctx.closePath();
    }

    seDeplacer(x, y) {
        this.x += x;
        this.y += y;
        this.dessiner();
    }

    creerBalle(posSourisX, posSourisY) {
        let balle = new Balle(this.plateau, this.x, this.y, posSourisX, posSourisY)
        this.listeBalles.push(balle)
        balle.dessiner()
    }

    verifierSiBalleSortDuPlateau(indice_balle) {
        let balle = this.listeBalles[indice_balle]
        if (balle.x > this.plateau.canvas.width || balle.y > this.plateau.canvas.height || 0 - balle.radius > balle.x || 0 - balle.radius > balle.y) {
            this.listeBalles.splice(indice_balle, 1);
        }
    }

    avancerBalles() {
        for (let i = 0; i < this.listeBalles.length; i++) { 
            this.listeBalles[i].avancer()
            this.verifierSiBalleSortDuPlateau(i)
        }
    }

    faireLesDeplacements() {
        if(this.keys.has("Right") || this.keys.has("ArrowRight")) {
            this.seDeplacer(5, 0);
        }

        if(this.keys.has("Left") || this.keys.has("ArrowLeft")) {
            this.seDeplacer(-5, 0);
        }

        if(this.keys.has("Down") || this.keys.has("ArrowDown")) {
            this.seDeplacer(0, 5);
        }

        if(this.keys.has("Up") || this.keys.has("ArrowUp")) {
            this.seDeplacer(0, -5);
        }
        
        if (this.keys.has(" ")) {
            this.creerBalle();
        }
    }
}

class Balle {
    constructor(plateau, x1, y1, x2, y2) {
        this.plateau = plateau;
        this.m = (y2 - y1) / (x2 - x1);
        this.p = y1 - this.m * x1;
        this.x = x1;
        this.y = y1;
        this.radius = 10;
        this.vers_la_droite = x1 < x2;
        this.vers_le_bas = y1 < y2;

        if (this.vers_la_droite) {
            this.vx = this.plateau.canvas.width - x1 + this.radius
        } else {
            this.vx = 0 - this.plateau.canvas.width
        }

        if (this.vers_le_bas) {
            this.vy = this.plateau.canvas.height - y1 + this.radius
        } else {
            this.vy = 0 - this.plateau.canvas.height
        }

        this.vx = this.vx * 5/100
        this.vy = this.vy * 5/100

        this.plateau.ctx.beginPath();
        this.plateau.ctx.rect(this.x1, this.y1, this.x2, this.y2);
        this.plateau.ctx.fillStyle = "#7795DD";
        this.plateau.ctx.fill();
        this.plateau.ctx.closePath();
    }

    avancer() {
        console.log(this.vx, this.vy)
        this.x += this.vx
        this.y += this.vy

        this.y = this.x * this.m + this.p
        this.dessiner()
    }

    dessiner() {
        this.plateau.ctx.beginPath();
        this.plateau.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.plateau.ctx.fillStyle = "#0095DD";
        this.plateau.ctx.fill();
        this.plateau.ctx.closePath();
    }
}
let plateau = new Plateau()
let persoPrinc = new PersonnagePrincipal(plateau);

window.onkeydown = function(event) {
    persoPrinc.keys.add(event.key);
    persoPrinc.faireLesDeplacements();
}

window.onkeyup = function(event) {
    persoPrinc.keys.delete(event.key);
}

window.onclick = function(event) {
    persoPrinc.creerBalle(event.offsetX, event.offsetY);
}

function loop() {
    plateau.effacer()
    persoPrinc.dessiner();
    persoPrinc.avancerBalles();
    setTimeout(loop, 10);
}

loop()

