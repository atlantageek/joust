'use strict';

var Pteradactyl = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pteradactyl', frame);

  // initialize your prefab here
  this.anchor.setTo(0.5,0.5);
  this.game.physics.enable(this);
  this.body.gravity.y=0;
  this.animations.add('pterfly',[0,1,2], 5, true);
  this.animations.play('pterfly');
  this.body.velocity.x = -150;

  // initialize your prefab here
  
};

Pteradactyl.prototype = Object.create(Phaser.Sprite.prototype);
Pteradactyl.prototype.constructor = Pteradactyl;

Pteradactyl.prototype.update = function() {
  if (this.x < -1 * this.width )
  {
    this.x = this.game.width;
  }
  
  // write your prefab's specific update code here
  
};

module.exports = Pteradactyl;
