'use strict';

var Plasma = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'plasma', frame);
  this.animations.add('pulse',[0,1,2,3],4,false);

  // initialize your prefab here
  
};

Plasma.prototype = Object.create(Phaser.Sprite.prototype);
Plasma.prototype.constructor = Plasma;

Plasma.prototype.update = function() {
  
  // write your prefab's specific update code here
  this.scale.x = 0.3;
  this.scale.y = 0.3;
  this.animations.play('pulse', false);
  
};
Plasma.prototype.contact = function() {
  this.animations.play('pulse', false,true);
   this.destroy();
}

module.exports = Plasma;
