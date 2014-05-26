'use strict';

var Pteradactyl = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pterodactyl', frame);

  // initialize your prefab here
  this.anchor.setTo(0.5,0);
  this.game.physics.enable(this);
  this.body.gravity.y=0;
  this.concoon_launch_anim = this.animations.add('concoon-launch',[3,4,5], 5, false);
  this.animations.add('concoon',[3,4], 5, true);
  this.animations.add('pterfly',[0,1,2], 5, true);
  this.animations.play('concoon');
  this.launch_flag = false;
  this.body.setSize(60,30,0,0);
  // initialize your prefab here
  
};

Pteradactyl.prototype = Object.create(Phaser.Sprite.prototype);
Pteradactyl.prototype.constructor = Pteradactyl;

Pteradactyl.prototype.update = function() {
  if (this.x < this.game.camera.x + 700)
  {
      this.body.velocity.x = -150;
  }
  //if (this.x < -1 * this.width )
  //{
  //  this.x = this.game.width + this.game.camera.x;
  //  console.log("PTER: " + this.x);
  //}
  
  // write your prefab's specific update code here
  
};
function change_to_fly(target) {
  target.launch_flag = true;
  target.loadTexture('pterodactyl-short');
  target.crop(Phaser.Rectangle(0,0,30,60));
  target.animations.play('pterfly');
  console.log("Hey");

}
Pteradactyl.prototype.follow = function(target) {
  if ((this.x < this.game.camera.x + 740) && !this.launch_flag)
  {
    this.anim = this.animations.play('concoon-launch');
    this.concoon_launch_anim.onComplete.add(change_to_fly, this);
    this.body.velocity.y = 100;
  }
  if ((this.x < this.game.camera.x + 700) && this.launch_flag)
  {
      if (this.y > target )
      {
          this.body.velocity.y = -30;
      }
      if (this.y < target )
      {
          this.body.velocity.y = 150;
      }
  }
}

module.exports = Pteradactyl;
