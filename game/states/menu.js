
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Joust World', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText2 = this.game.add.text(this.game.world.centerX, 360, 'Press mousebutton to fly. Land on a platform to restore energy. Or get powerup for energy boost.', { font: '16px Arial', fill: '#ffffff', align: 'center'});
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
