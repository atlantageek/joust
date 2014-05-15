
  'use strict';

  var Swan = require('../prefabs/swan');
  var Platform = require('../prefabs/platform');
  var PlatformGroup = require('../prefabs/platform_group');
  var Pteradactyl = require('../prefabs/pteradactyl');
  function Play() {}
  Play.prototype = {
    create: function() {

    var style = { font: "25px Arial", fill: "#ff0044", align: "center" };

      this.game.score = 0;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.platform_group = this.game.add.group();
      this.flap_energy = 100;
      this.flap_energy_txt = this.game.add.text(200, 0, "Text", style);

      this.swan = new Swan(this.game, this.game.width/2, this.game.height/2);
      this.pter = new Pteradactyl(this.game, this.game.width, this.game.height/2);
      this.game.add.existing(this.swan);
      this.pter.animations.play('pterfly');
      this.game.add.existing(this.pter);
      //this.ground = this.game.add.sprite(0, 500, 'ground');
      //this.game.physics.enable(this.ground);
      //this.ground.body.immovable = true;
      this.swan.body.gravity.y=300;
      //this.swan.body.velocity.x = 100;
      //Setup Animations
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.swan.jump, this.swan);
           //this.swan.animations.play('walk');

      this.platformGenerator = this.game.time.events.loop(
		Phaser.Timer.SECOND * 5, this.generatePlatform, this);
      
      this.platformGenerator = this.game.time.events.loop(
		Phaser.Timer.SECOND , this.updateScore, this);

      
    },
    updateScore: function() {
      this.game.score += 1;
    },
    generatePlatform: function() {
      var x = this.game.width;
      var y = this.game.rnd.integerInRange(50,400);
      var platform = this.platform_group.getFirstExists(false);
      if (!platform)
      {
          var platform = new Platform(this.game,x,y);
          this.platform_group.add(platform);
      }
      platform.reset(x,y);
      var scale= (1.5 + this.game.rnd.normal()) * 100;
      console.log(scale);
      platform.width = scale;
    },
    update: function() {
      //this.game.physics.arcade.collide(this.swan, this.ground);
      this.game.physics.arcade.collide(this.pter, this.platform_group);
      this.game.physics.arcade.collide(this.swan, this.platform_group);
      this.game.physics.arcade.collide(this.swan, this.pter, this.pter_swan_collide);
      if (this.swan.flap_energy <= 0)
      {
      this.flap_energy_txt.text = "Energy: Dead!!!  Score: " + this.game.score;
        console.log("dying");
      }
      else if (this.swan.body.wasTouching.down)
      {
         this.swan.flap_energy += 1
	 if (this.swan.animations.currentAnim.name != "walk")
         {
           console.log("Walk");
           this.swan.animations.play('walk');
         }
      }
      else
      {
	 if (this.swan.animations.currentAnim.name != "flap")
         {
           console.log("Flap");
           this.swan.animations.play('flap');
         }
      }
      this.flap_energy_txt.text = "Energy: " + this.swan.flap_energy + " Score: " + this.game.score;
      if (this.pter.y > this.swan.y )
      {
          this.pter.body.velocity.y = -30;
      }
      if (this.pter.y < this.swan.y )
      {
          this.pter.body.velocity.y = 40;
      }
      if (this.swan.y > 700)
      {
      this.game.state.start('gameover');
      }


    },
    pter_swan_collide: function(swan, pter) {
      swan.flap_energy -= 5;
      pter.body.velocity.x = -100;
      
    }, 
    clickListener: function() {
    }
  };
  
  module.exports = Play;
