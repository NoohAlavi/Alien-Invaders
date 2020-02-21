class Bullet {
  constructor(ship, speed) {
    this.ship = ship;
    this.pos = {x: ship.pos.x, y: ship.pos.y};
    this.width = 32;
    this.height = 32;
    this.originalSpeed = this.height/2 * speed;
    this.speed = this.originalSpeed;
    this.img = new Image();
    this.img.src = "Assets/Bullet.png";
  }
  render() {
    //ctx.fillStyle = "#ff0000";
    //ctx.strokeStyle = "#ffffff";
    //ctx.fillRect(this.pos.x + this.ship.width/2 - this.width/2, this.pos.y - this.ship.height/5, this.width, this.height);
    //ctx.strokeRect(this.pos.x + this.ship.width/2 - this.width/2, this.pos.y - this.ship.height/5, this.width, this.height);
    ctx.drawImage(this.img, this.pos.x + this.ship.width/2 - this.width, this.pos.y - this.ship.height/5, this.width * 2, this.height * 2);
  }
  update() {
    if (explosive) {
      this.speed = this.originalSpeed / 2;
    }
    else {
      this.speed = this.originalSpeed;
    }
    this.pos.y -= this.speed;
    if (this.pos.y < 0) {
      bullets.splice(0, 1);
    }
  }
  isCollidingWith(enemy) {
    if (enemy === undefined) return false;
    return (this.pos.x + this.width > enemy.pos.x && this.pos.y + this.height > enemy.pos.y && enemy.pos.y + enemy.height > this.pos.y && enemy.pos.x + enemy.width > this.pos.x);
  }
}