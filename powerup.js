class PowerUp {
  constructor (x, y) {
    this.img = new Image();
    this.img.src = "Assets/powerUp.png";
    this.pos = {x: x, y: y};
    this.width = 32;
    this.height = 32;
    window.setTimeout(function(){powerups = [];}, 7000); //Despawns in 7 seconds
    var rand = randRange(1, 6);
    if (rand == 1) {
      this.power = "Heal";
      this.img.src = "Assets/heartPowerUp.png";
    }
    else if (rand == 2) {
      this.power = "Kill";
      this.img.src = "Assets/backup.png";
    }
    else if (rand == 3) {
      this.power = "Hack";
      this.img.src = "Assets/hackPowerUp.png";
    }
    else if (rand == 4) {
      this.power = "Penetrate";
      this.img.src = "Assets/penetrationPowerUp.png";
    }
    else if (rand == 5) {
      this.power = "Freeze";
      this.img.src = "Assets/freezePowerUp.png";
    }
    else if (rand == 6) {
      this.power = "tnt";
      this.img.src = "Assets/explosivePowerUp.png";
    }
  }
  render() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }
}