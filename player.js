class Ship {
  constructor (x, y) {
    this.pos = {x: x, y: y};
    this.width = 75;
    this.height = 75;
    this.img = new Image();
    this.img.src = "Assets/ship.png";
    this.speed = 20;
  }
  render() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }
  shoot() {
   /* if (penetration) {
      for (let i = 0; i < 10; i++) {
        bullets.push(new Bullet(this, 1.1));
      }
      return;
    }*/
    bullets.push(new Bullet(this, 1.1));
  }
}