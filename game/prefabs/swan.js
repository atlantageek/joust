'use strict';

var Swan = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'swan', frame);
  this.flap_energy = 500;
  // initialize your prefab here
  this.anchor.setTo(0.5,0.5);
  this.game.physics.enable(this);
  this.body.gravity.y=300;
  this.animations.add('flap',[5,6,7], 8, false);
  this.animations.add('walk',[0,1,2,3], 10, true);
  this.animations.add('stand',[4], 10, true);


  
};

Swan.prototype = Object.create(Phaser.Sprite.prototype);
Swan.prototype.jump = function() {
  if (this.flap_energy <= 0) {
    this.animations.play('stand');
    if (this.scale.y > 0)
    { this.scale.y = -1 * this.scale.y;}
  return;}
  console.log("Jump");
  this.body.velocity.y=-100;
  this.animations.play('flap');
  this.flap_energy -= 10;
}
Swan.prototype.constructor = Swan;

Swan.prototype.update = function() {
  
  // write your prefab's specific update code here
      var fade_level = this.flap_energy / 500.0 + 0.25;
      if (fade_level > 1) {fade_level = 1;}
      this.game.add.tween(this).to( { alpha: fade_level }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
  
};

module.exports = Swan;
