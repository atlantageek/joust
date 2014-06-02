(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'joust-world');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
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
  console.log(  " XXX" + (this.x - this.game.camera.x) );
  
  // write your prefab's specific update code here
  
};

Catapult.prototype.fire = function() {
  this.play('fire',false);
};


module.exports = Catapult;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
  this.flap_energy -= 5;
}
Swan.prototype.constructor = Swan;

Swan.prototype.update = function() {
  
  // write your prefab's specific update code here
      var fade_level = this.flap_energy / 500.0 + 0.25;
      if (fade_level > 1) {fade_level = 1;}
        console.log("fading");
      this.game.add.tween(this).to( { alpha: fade_level }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
  
};

module.exports = Swan;

},{}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(400,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(400, 200, 'Score is ' + this.game.score, { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(400, 300, 'Want to play Again? Click anywhere.', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
    console.log("Create gameover");
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }

  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Joust World', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText2 = this.game.add.text(this.game.world.centerX, 360, 'Press spacebar to flap. Land on a platform to rest.', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText2.anchor.setTo(0.5, 0.5);
    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play ', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],9:[function(require,module,exports){

  'use strict';

  var Swan = require('../prefabs/swan');
  var  Plasma= require('../prefabs/plasma');
  var  Catapult= require('../prefabs/catapult');
  
  var Pteradactyl = require('../prefabs/pteradactyl');
  function Play() {}
  Play.prototype = {
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
      this.pter = this.game.add.group();
      this.game.physics.enable(this.plasma_group);
      this.catapult_group = this.game.add.group();
      //var pter_list = [1100,1500,1800,2400,2500,3300,3400,4000,4100,4500,5000,5500,5800, 8000];
      var pter_list = [1400,8000];
      var catapult_list = [870,2160,2460, 4400, 8340];
      for (var i=0;i<pter_list.length;i++)
      {
        this.pter.add( new Pteradactyl(this.game, pter_list[i], 30));
        
        //this.pter.animations.play('pterfly');
      }
      for (var i=0;i<catapult_list.length;i++)
      {
        var catapult = new Catapult(this.game, catapult_list[i], 490);
        catapult.events.onAnimationComplete.add(function(target) {
          var plasma = this.launch_plasma(target.x , target.y);
          plasma.catapult = catapult;
          target.frame = 1;
         }, this);
      
        this.catapult_group.add( catapult);
        
      }
      this.game.add.existing(this.swan);
      this.game.add.existing(this.pter);
      this.game.add.existing(this.catapult_group);
      this.game.add.existing(this.plasma_group);
      this.swan.body.gravity.y=300;
      this.game.physics.enable(this.swan);
      //this.game.camera.follow(this.swan);

      //Setup Animations
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.swan.jump, this.swan);
           this.swan.animations.play('flap');

      
    },
    updateScore: function() {
      this.game.score = this.game.camera.x;
    },
    update: function() {
      this.swan.body.velocity.x=40;
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
      this.flap_energy_txt.text = "Energy: Dead!!!  Score: " + this.game.score;
        console.log("dying");
      }
      else if (this.swan.body.blocked.down)
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
	 if (this.swan.animations.currentAnim && this.swan.animations.currentAnim.name != "flap")
         {
           console.log("Flap");
           this.swan.animations.play('flap');
         }
      }
      this.flap_energy_txt.text = "Energy: " + this.swan.flap_energy + " Score: " + this.game.score;
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
      swan.flap_energy -= 5;
      pter.body.velocity.x = -100;
    }, 
    plasma_swan_collide: function(swan, pter) {
      swan.flap_energy -= 5;
    }, 
    launch_plasma: function(x,y)
    {
      var plasma = this.plasma_group.create(x,y,'plasma');
      this.game.physics.enable(plasma);
    
      plasma.scale.x=0.1;
      plasma.scale.y=0.1;
      plasma.lifespan=3000;
      plasma.body.gravity.y=200;
      plasma.body.velocity.x=(this.swan.x-x);
      plasma.body.velocity.y=(this.swan.y-y);
      plasma.events.onKilled.add(function() {
      }, plasma);
      return plasma;
    
    },
    swan_layer_collide: function(swan, pter) {
           console.log(swan.body.blocked);
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

},{"../prefabs/catapult":2,"../prefabs/plasma":3,"../prefabs/pteradactyl":4,"../prefabs/swan":5}],10:[function(require,module,exports){

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
    this.game.load.tilemap('cave', 'assets/tilemaps/maps/world.json', null, 
      Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/tilemaps/tiles/tileset.png');


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

},{}]},{},[1])