'use strict';

var Plasma = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plasma', frame);
  this.animations.add('pulse');
  this.catapult = nil;

  // initialize your prefab here
  
};

Plasma.prototype = Object.create(Phaser.Sprite.prototype);
Plasma.prototype.constructor = Plasma;

Plasma.prototype.update = function() {
  
  // write your prefab's specific update code here
  this.play('pulse',true);
  this.scale.x = 0.2;
  this.scale.y = 0.2;
  
};

module.exports = Plasma;
