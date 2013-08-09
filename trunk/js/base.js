/*
 * base.js
 * Basiselemente des Spieles
 * http://www.zebresel.de
 *
 */
 
 var ASSET_FOLDER = document.location + "../assets/";
 var TEXTURE_FOLDER = ASSET_FOLDER + "textures/";
 var SOUNDS_FOLDER = ASSET_FOLDER + "sounds/";
 var MAPS_FOLDER = ASSET_FOLDER + "maps/";
 var DATABASE_FOLDER = document.location + "database/";
 
 function Vector2(x, y) {
 	this.x = x;
	this.y = y;
 };
 
 
 function GetRandom(min, max) {
 	if(min > max) return -1;
	if(min == max) return min;
	
	return (min + (Math.random() * (max - min)));
 };
 
 
  var Key = {
	_pressed: {},
	
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	ENTER: 13,

	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},
	
	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
	},
	
	onKeyup: function(event) {
		delete this._pressed[event.keyCode];
	}
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
