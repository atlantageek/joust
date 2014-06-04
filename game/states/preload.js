
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.spritesheet('swan', 'assets/ostrich.png',52,52);
    this.load.spritesheet('pterodactyl', 'assets/pterodactyl.png',60,65);
    this.load.spritesheet('catapult', 'assets/cannon.png',50,60);
    this.load.spritesheet('pterodactyl-short', 'assets/pterodactyl.png',50,45);
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');


    this.load.spritesheet('plasma', 'assets/plasmaball.png', 128, 128);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
