class Boss {
  constructor(x, y) {
    this.pos = {x:x, y:y};
    this.width = 128;
    this.height = 128;
    this.img = new Image();
    this.img.src = "Assets/boss.png";
    if (difficulty == "Noob" || difficulty == "Easy" || difficulty == "Amateur") {
      this.maxHealth = 50;
    }
    else if (difficulty == "Normal" || difficulty == "Hard" || difficulty == "Intense") {
      this.maxHealth = 100;
    }
    else if (difficulty == "Tryhard" || difficulty == "Nightmare" || difficulty == "Hardcore") {
      this.maxHealth = 150;
    }
    else {
      this.maxHealth = 200;
    }
    this.health = this.maxHealth;
    bossSpawned = true;
    this.speed = 2.5;
  }
  render() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }
  update() {
    if (!frozen) {
      this.pos.x += this.speed;
      if (this.pos.x + this.width > cvs.width || this.pos.x < 0) {
        this.speed = -this.speed;
        if (Math.random() < 0.1 && !hacked) this.shoot();
      }
      if (Math.random() < 0.025 && !hacked) { //2.5%
        this.shoot();
      }
    }
  }
  shoot() {
    enemyBullets.push(new EnemyBullet(this, "Assets/bossBullet.png"));
  }
}