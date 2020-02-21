window.onload = setup;
window.onkeyup = keyup;
window.onkeydown = input;
window.onclick = clickHandler;

var img, ctx, ship, bullets, enemyBullets, enemy, spawner, score, gameMode, option, difficulty, target, lives, powerups, hacked, penetration, frozen, explosive, paused, boss, bossSpawned;
const GAME_MODES = {PLAY: 0, GAME_OVER: 1, WIN: 2};

const intro = "\
Welcome to Alien Invaders, a #original game by Nooh Alavi! \n\n\
You must stop evil aliens from attacking and destroying our beloved planet, earth. Powerups will help you along the way. Avoid their fireballs and do not let them enter the atmosphere under any circumstance... or else...";

const controls = "Controls:\n\n\
Move: AD, Left Right\n\
Shoot: [Space], W, Up, Enter\n\
Pause: Escape";

const difficulties = "Please Choose a difficulty:\n\
a) Noob: Destroy 50 aliens to win, 5 Lives\n\
b) Easy: Destroy 100 aliens to win, 4 Lives\n\
c) Amateur: Destroy 150 aliens to win, 3 Lives\n\
d) Medium: Destroy 250 aliens to win, 3 Lives\n\
e) Hard: Destroy 500 aliens to win, 2 Lives\n\
f) Intense: Destroy 700 aliens to win, 2 Lives\n\
g) Nightmare: Destroy 1K aliens to win, 2 Lives\n\
h) Hardcore: Destroy 2.5K aliens to win, 1 Life\n\
i) Tryhard: Destroy 5K aliens to win, 1 Life\n\
j) If You Beat This, You Don't Have A Life: Destroy 7K aliens to win, 1 Life\n\
k) If You Beat This, You are a Bot: Destroy 10K aliens to win, 1 Life\n\
l) Dis is for dem Spammerz: Destroy 20K aliens to win, 1 Life\
";

function setup() {
  alert(intro);
  alert(controls);
  option = window.prompt(difficulties, "Please Choose a Difficulty");
  option = option.toLowerCase();
  if (option == "a" || option == "noob") {
    target = 50;
    difficulty = "Noob";
    lives = 5;
  }
  else if (option == "b" || option == "easy") {
    target = 100;
    difficulty = "Easy";
    lives = 4;
  }
  else if (option == "c" || option == "amateur") {
    target = 150;
    difficulty = "Amateur";
    lives = 3;
  }
  else if (option == "d" || option == "medium") {
    target = 250;
    difficulty = "Medium";
    lives = 3;
  }
  else if (option == "e" || option == "hard") {
    target = 500;
    difficulty = "Hard";
    lives = 2;
  }
  else if (option == "f" || option == "intense") {
    target = 700;
    difficulty = "Intense";
    lives = 2;
  }
  else if (option == "g" || option == "nightmare") {
    target = 1000;
    difficulty = "Nightmare";
    lives = 2;
  }
  else if (option == "h" || option == "hardcore") {
    target = 2500;
    difficulty = "Hardcore";
    lives = 1;
  }
  else if (option == "i" || option == "tryhard") {
    target = 5000;
    difficulty = "Tryhard";
    lives = 1;
  }
  else if (option == "j" || option == "if you beat this you don't have a life") {
    target = 7000;
    difficulty = "If you Beat This You Don't Have A Life";
    lives = 1;
  }
  else if (option == "k" || option == "if you beat this you are a bot") {
    target = 10000;
    difficulty = "If you Beat This You Are A Bot";
    lives = 1;
  }
  else if (option == "l" || option == "dis is for dem spammerz") {
    target = 20000;
    difficulty = "Dis is for Dem Spammerz";
    lives = 1;
  }
  else {
    alert("Please enter a valid difficulty!");
    location.reload();
  }
  ctx = cvs.getContext("2d");
  ship = new Ship(cvs.width/2 - (75/2), cvs.height - 100);
  bullets = [];
  enemyBullets = [];
  enemies = [];
  score = 0;
  powerups = [];
  
  paused = false;
  bossSpawned = false;
  
  hacked = false;
  penetration = false;
  frozen = false;
  explosive = false;
  
  gameMode = GAME_MODES.PLAY;
  
  spawnEnemies();
  spawner = window.setInterval(spawnEnemies, 5000);
  window.setInterval(spawnPowerups, 20000); //20000

  loop();
}

function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
  if (gameMode == GAME_MODES.PLAY) {
    if (!paused) {
      if (bossSpawned) {
        boss.update();
        for (let i = 0; i < bullets.length; i++) {
          if (bullets[i].isCollidingWith(boss)) {
            if (!penetration) bullets.splice(i, 1);
            if (explosive) {
              boss.health -= 50;
              explosive = false;
            }
            else {
              boss.health --;
            }
            if (boss.health < 0) {
              gameMode = GAME_MODES.WIN;
            }
          }
        }
      }
      for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
      }
      for (let i = 0; i < enemyBullets.length; i++) {
        enemyBullets[i].update();
        if (enemyBullets[i].isCollidingWith(ship)) {
          if (lives == 1) {
            gameMode = GAME_MODES.GAME_OVER;
          }
          else {
            lives--;
            enemyBullets.splice(i, 1);
            ship.img = new Image();
            ship.img.src = "Assets/shipDamaged.png";
            window.setTimeout(function(){ship.img.src = "Assets/ship.png";}, 250);
          }
        }
      }
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        if (enemies[i].pos.y >= cvs.height - 100) {
            gameMode = GAME_MODES.GAME_OVER;
        }
      }
      for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
          if (bullets[j].isCollidingWith(enemies[i])){
            enemies.splice(i, 1);
            if (!penetration) bullets.splice(j, 1);
            score++;
            if (explosive) {
              enemies = [];
              explosive = false;
            }
          }
        }
      }
      for (let i = 0; i < powerups.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
          if (bullets[j].isCollidingWith(powerups[i])) {
            if (powerups[i].power == "Heal") {
              lives++;
            }
            else if (powerups[i].power == "Kill") {
              cvs.style.backgroundImage = "url(Assets/backgroundBackup.png)";
              clear();
              if (bossSpawned) boss.health -= 50;
              window.setTimeout(function(){cvs.style.backgroundImage = "url(Assets/background.png)";}, 250);
            }
            else if (powerups[i].power == "Hack") {
              hacked = true;
              window.setTimeout(function(){hacked = false;}, 10000);
            }
            else if (powerups[i].power == "Penetrate") {
              penetration = true;
              window.setTimeout(function(){penetration = false}, 10000);
            }
            else if (powerups[i].power == "Freeze") {
              frozen = true;
              window.setTimeout(function(){frozen = false;}, 10000);
            }
            else if (powerups[i].power == "tnt") {
              explosive = true;
              bullets = [];
            }
            powerups.splice(i, 1);
            bullets.splice(j, 1);
          }
        }
      }
    }
/*    if (enemies.length == 0) {
      window.setTimeout(spawnEnemies, 1000);
    }*/
  }
  if (score >= target) {
    spawnBoss();
    //gameMode = GAME_MODES.WIN;
  }
}

function render() {
  if (gameMode == GAME_MODES.PLAY) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    if (bossSpawned) {
      boss.render();
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(20, 20, (boss.health/boss.maxHealth) * 760, 20);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(20, 20, 760, 20);
    }
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(0, cvs.height - 100, cvs.width, 1);
    ship.render();
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].render();
    }
    for (let i = 0; i < enemyBullets.length; i++) {
      enemyBullets[i].render();
    }
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].render();
    }
    for (let i = 0; i < powerups.length; i++) {
      powerups[i].render();
    }
    document.getElementById("scoreText").innerText = "Score: " + score;
    document.getElementById("difficulty").innerText = "Difficulty: " + difficulty;
    document.getElementById("lives").innerText = "Lives: " + lives;
  }
  else if (gameMode === GAME_MODES.GAME_OVER) {
    ctx.fillStyle = "#4e0000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.font = "96px fantasy";
    ctx.fillStyle = "#ffff00";
    ctx.fillText("GAME OVER!", cvs.width/2 - 300, 100);
    ctx.strokeText("GAME OVER!", cvs.width/2 - 300, 100);
    ctx.font = "30px fantasy";
    ctx.fillText("You let Earth Get destroyed. You suck.", cvs.width/2 - 200, 200);
    ctx.strokeText("You let Earth Get destroyed. You suck.", cvs.width/2 - 200, 200);
    ctx.font = "48px fantasy";
    ctx.fillText("Click anywhere to restart", cvs.width/2 - 250, 500);
    ctx.strokeText("Click anywhere to restart", cvs.width/2 - 250, 500);
    var img = new Image()
    img.src="Assets/enemy.png";
    ctx.drawImage(img, cvs.width/2 - 250, cvs.height/2, 100, 100);
    img.src="Assets/enemy2.png";
    ctx.drawImage(img, cvs.width/2 + 150, cvs.height/2, 100, 100);
    document.getElementById("earth").src = "Assets/destroyedEarth.png";
    document.getElementById("lives").innerText = "Lives: 0";
  }
  else if (gameMode == GAME_MODES.WIN) {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.font = "96px fantasy";
    ctx.fillStyle = "#000000";
    ctx.fillText("You Win!", cvs.width/2 - 200, cvs.height/2 - 100);
    ctx.strokeText("You Win!", cvs.width/2 - 200, cvs.height/2 - 100);
    ctx.font = "48px fantasy";
    ctx.fillText("Click anywhere to restart", cvs.width/2 - 250, 500);
    ctx.strokeText("Click anywhere to restart", cvs.width/2 - 250, 500);
  }
}

function keyup(e) {
  if ((e.key === " " || e.key === "w" || e.key === "ArrowUp" || e.key == "Enter") && !paused) {
    ship.shoot();
  }
  else if (e.key == "Escape") {
    paused = !paused;
  }
  else {
    return false;
  }
}

function input(e) {
  if (!paused) {
    if ((e.key === "ArrowRight" || e.key === "d") && (ship.pos.x + ship.width < cvs.width)) {
      ship.pos.x += ship.speed;
    }
    else if ((e.key === "ArrowLeft" || e.key === "a") && (ship.pos.x > 0)) {
      ship.pos.x -= ship.speed;
    }
  }
}

function clear() {
  enemies = [];
  enemyBullets = [];
  score += 25;
  //spawnEnemies();
}

function spawnBoss() {
  enemies = [];
  if (!bossSpawned) boss = new Boss(cvs.width/2, 100);
  window.clearInterval(spawner);
}

function spawnEnemies() {
  if (!frozen && !paused) {
    for (let i = 0 ; i < Math.round(cvs.width/60); i++) {
      enemies.push(new Enemy(i * 60, 0, 3, "Assets/enemy.png"));
    }
    for (let i = 0 ; i < Math.round(cvs.width/60); i++) {
      enemies.push(new Enemy(i * 60, 60, 6, "Assets/enemy2.png"));
    }
  }
}

function spawnPowerups() {
  if (!paused) {
    powerups.push(new PowerUp(randRange(100, cvs.width - 100), randRange(300, cvs.height - 200)));
  }
}

function clickHandler(e) {
  if (gameMode != GAME_MODES.PLAY) {
    location.reload();
  }
}