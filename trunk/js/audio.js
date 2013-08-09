/*
 * audio.js
 * Audio des Spieles
 * http://www.zebresel.de
 *
 */
 
 function Audio() { 
 	Audio.base = document.createElement('audio');
 };
 
 Audio.prototype.PlaySound = function(filename)  {
 	Audio.base.setAttribute('src', SOUNDS_FOLDER + filename);
	Audio.base.play();
 };
 
 Audio.prototype.StopSound = function() {
 	Audio.base.stop();
 };