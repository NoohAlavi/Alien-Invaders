class EnemyBullet {
  constructor(ship, image) {
    this.ship = ship;
    this.pos = {x: ship.pos.x, y: ship.pos.y};
    this.width = 32;
    this.height = 32;
    this.speed = randRange(3, 5);
    this.img = new Image();
    this.img.src = image;
  }
  render() {
    /*ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#ffffff";
    ctx.fillRect(this.pos.x + this.ship.width/2 - this.width/2, this.pos.y - this.ship.height/5, this.width, this.height);
    ctx.strokeRect(this.pos.x + this.ship.width/2 - this.width/2, this.pos.y - this.ship.height/5, this.width, this.height);*/
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }
  update() {
    this.pos.y += this.speed;
    if (this.pos.y < 0) {
      enemyBullets.splice(0, 1);
    }
  }
  isCollidingWith(player) {
    if (player === undefined) return false;
    return (this.pos.x + this.width > player.pos.x && this.pos.y + this.height > player.pos.y && player.pos.y + player.height > this.pos.y && player.pos.x + player.width > this.pos.x);
  }
}