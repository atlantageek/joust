'use strict';

var Platform = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'platform', frame);
  this.anchor.setTo(0,0.5);
  this.game.physics.enable(this);
  this.body.velocity.y=-100;

  // initialize your prefab here
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.body.immovable = true;
  
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
  this.body.velocity.x = -100;
  
  // write your prefab's specific update code here
  
};

module.exports = Platform;
