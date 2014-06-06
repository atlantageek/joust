'use strict';

var Catapult = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'catapult', frame);
  this.animations.add('pulse');
  this.animations.add('fire',[1,4,7], 4, false);
  this.animations.add('clear',[1], 4, false);

  // initialize your prefab here
  
};

Catapult.prototype = Object.create(Phaser.Sprite.prototype);
Catapult.prototype.constructor = Catapult;

Catapult.prototype.update = function() {
  if ((( this.x - this.game.camera.x) < 650)
   && (( this.x - this.game.camera.x) > 300))
  {
    this.fire();
  }
  
  // write your prefab's specific update code here
  
};

Catapult.prototype.fire = function() {
  this.play('fire',false);
};


module.exports = Catapult;
