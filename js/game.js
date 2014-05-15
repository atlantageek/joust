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

},{}],3:[function(require,module,exports){
'use strict';

var Platform = require('./platform');

var PlatformGroup = function(game, parent) {  
  Phaser.Group.call(this, game, parent);
};

PlatformGroup.prototype = Object.create(Phaser.Group.prototype);  
PlatformGroup.prototype.constructor = PlatformGroup;

module.exports = PlatformGroup;

},{"./platform":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Swan = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'swan', frame);
  this.flap_energy = 500;
  // initialize your prefab here
  this.anchor.setTo(0.5,0.5);
  this.game.physics.enable(this);
  this.body.gravity.y=300;
  this.animations.add('flap',[5,6], 8, false);
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
      if (this.x < this.game.width/2 )
      {
        this.body.velocity.x = 100;
      }
      if (this.x >= this.game.width/2 )
      {
        this.body.velocity.x = 0;
      }
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
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'Score is ' + this.game.score, { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
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

},{"../prefabs/platform":2,"../prefabs/platform_group":3,"../prefabs/pteradactyl":4,"../prefabs/swan":5}],10:[function(require,module,exports){

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
    this.load.spritesheet('swan', 'assets/swan.png',45,45);
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet('pteradactyl', 'assets/pterodactyl.png',64, 30);

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