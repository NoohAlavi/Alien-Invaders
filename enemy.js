class Enemy {
  constructor (x, y, speed, src) {
    this.pos = {x: x, y: y};
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = src;
    this.speed = speed;
  }
  render() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }
  update() {
    if (!frozen) {
      this.pos.x += this.speed;
      if (this.pos.x + this.width > cvs.width || this.pos.x < 0) {
        this.speed = -this.speed;
        this.pos.y += this.height * 2;
        if (Math.random() < 0.1 && !hacked) this.shoot();
      }
      if (Math.random() < 0.00055 && !hacked) { //0.055%
        this.shoot();
      }
    }
  }
  shoot() {
    enemyBullets.push(new EnemyBullet(this, "Assets/enemyBullet.png"));
  }
}