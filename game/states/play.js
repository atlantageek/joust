
  'use strict';

  var Swan = require('../prefabs/swan');
  var EnergyStar = require('../prefabs/energy_star');
  var Plasma= require('../prefabs/plasma');
  var Catapult= require('../prefabs/catapult');
  
  var Pteradactyl = require('../prefabs/pteradactyl');
  function Play() {}
  Play.prototype = {
    preload: function() {
    this.game.load.tilemap('cave', 'assets/tilemaps/maps/world.json', null, 
      Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tilemaps/tiles/tileset.png');
    },
    shutdown: function() {
      this.swan.destroy();
      this.map.destroy();
      this.plasma_group.destroy();
      this.pter.destroy();
      this.catapult_group.destroy();
    },
    create: function() {
      
    var style = { font: "25px Arial", fill: "#ff0044", align: "center" };

      this.game.score = 0;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.flap_energy = 100;
      this.flap_energy_txt = this.game.add.text(30,this.game.height - 30 , "Text", style);
      this.flap_energy_txt.fixedToCamera = true;



      //tilemap
      this.map = this.game.add.tilemap('cave');
      this.map.addTilesetImage('tiles');
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1,16);

    //Sprites
      this.swan = new Swan(this.game, this.game.width/2, 50);
      this.plasma_group = this.game.add.group();
      this.energy_star_group = this.game.add.group();
      this.pter = this.game.add.group();
      this.game.physics.enable(this.plasma_group);
      this.game.physics.enable(this.energy_star_group);
      this.catapult_group = this.game.add.group();
      var pter_list = [1100,1500,1800,2400,2500,3300,3400,4000,4100,4500,5000,5500,5800, 8000];
      var energy_star_list = [{x:670,y:200},{x:2160,y:200},{x:2460,y:200}, {x:4400,y:200}, {x:6720,y:200},{x:8290,y:200}];
      //var pter_list = [1400,8000];
      var catapult_list = [870,2160,2460, 4400, 6720,8290];
      for (var i=0;i<pter_list.length;i++)
      {
        this.pter.add( new Pteradactyl(this.game, pter_list[i], 30));
        
        //this.pter.animations.play('pterfly');
      }
      for (var i=0;i<energy_star_list.length;i++)
      {
        var star = new EnergyStar(this.game, energy_star_list[i].x, energy_star_list[i].y,0);
        this.game.physics.enable(star);
        this.swan.body.setSize(20,20,8,8);
        star.body.gravity.y=0;
        this.energy_star_group.add( star);
        star.animations.play('sitting');
      }
      for (var i=0;i<catapult_list.length;i++)
      {
        var catapult = new Catapult(this.game, catapult_list[i], 490);
        catapult.events.onAnimationComplete.add(function(target) {
          var plasma = this.launch_plasma(target.x - 10 , target.y );
          plasma.catapult = catapult;
          target.frame = 1;
         }, this);
      
        this.catapult_group.add( catapult);
        
      }
      this.game.add.existing(this.swan);
      this.game.add.existing(this.pter);
      this.game.add.existing(this.catapult_group);
      this.game.add.existing(this.plasma_group);
      this.game.add.existing(this.energy_star_group);
      this.swan.body.gravity.y=300;
      this.game.physics.enable(this.swan);
      this.swan.body.setSize(20,20,8,8);
      //this.game.camera.follow(this.swan);

      //Setup Animations
      this.game.input.onDown.add(function() {
        console.log("HELP");
        this.swan.jump();
       },this);
      
    },
    updateScore: function() {
      this.game.score = Math.round(this.swan.x/10.0);
    },
    update: function() {
      this.swan.body.velocity.x=40;
      this.game.physics.arcade.collide(this.swan, this.energy_star_group, this.energy_star_swan_collide, this.energy_star_swan_check);
      this.game.physics.arcade.collide(this.swan, this.pter, this.pter_swan_collide);
      this.game.physics.arcade.collide(this.swan, this.plasma_group, this.plasma_swan_collide);
      this.game.camera.x = this.swan.x- 200;
      this.updateScore();
      if (this.swan.flap_energy > 0)
      {
         this.game.physics.arcade.collide(this.swan, this.layer);
      }
      this.game.physics.arcade.collide(this.pter, this.layer);
      if (this.swan.flap_energy <= 0)
      {
      this.flap_energy_txt.text = "Energy: Dead!!!  Distance Travelled: " + this.game.score;
      }
      else if (this.swan.body.blocked.down)
      {
         this.swan.flap_energy +=1
	 if (this.swan.animations.currentAnim.name != "walk")
         {
           this.swan.animations.play('walk');
         }
      }
      else
      {
	 if (this.swan.animations.currentAnim && this.swan.animations.currentAnim.name != "flap")
         {
           this.swan.animations.play('flap');
         }
      }
      this.flap_energy_txt.text = "Energy: " + this.swan.flap_energy + " Distance Travelled: " + this.game.score;
      this.pter.callAll('follow',null, this.swan.y);
      if (this.swan.y > 700)
      {
      this.game.state.start('gameover');
      }
      if (this.swan.x > 10000)
      {
      this.game.state.start('gameover');
      }


    },
    pter_swan_collide: function(swan, pter) {
      swan.flap_energy -= 20;
      pter.body.velocity.x = -100;
    }, 
    plasma_swan_collide: function(swan, plasma) {
      swan.flap_energy -= 20;
      plasma.contact();
    }, 
    energy_star_swan_collide: function(swan, energy_star) {
      swan.flap_energy += 30;
      energy_star.animations.play('used', 5,false,true);
    }, 
    energy_star_swan_check: function(swan, energy_star) {
      if (energy_star.used) {return false;}
      return true;
      
    }, 
    launch_plasma: function(x,y)
    {
      //var plasma = this.plasma_group.create(this.gax,y,'plasma');
      var plasma = new Plasma(this.game,x,y);
      this.plasma_group.add(plasma);

      this.game.physics.enable(plasma);
    
      plasma.lifespan=3000;
      plasma.body.gravity.y=200;
      plasma.body.velocity.x=(this.swan.x-x) * 1.1;
      plasma.body.velocity.y=(this.swan.y-y) * 1.1;
      plasma.events.onKilled.add(function() {
      }, plasma);
      return plasma;
    
    },
    swan_layer_collide: function(swan, pter) {
      if (swan.body.blocked.down)
      {
         swan.flap_energy += 1
	 if (swan.animations.currentAnim.name != "walk")
         {
           console.log("Walk");
           swan.animations.play('walk');
         }
      }
      
    }, 
    clickListener: function() {
    }
  };
  
  module.exports = Play;
