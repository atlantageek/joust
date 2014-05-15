'use strict';

var Platform = require('./platform');

var PlatformGroup = function(game, parent) {  
  Phaser.Group.call(this, game, parent);
};

PlatformGroup.prototype = Object.create(Phaser.Group.prototype);  
PlatformGroup.prototype.constructor = PlatformGroup;

module.exports = PlatformGroup;
