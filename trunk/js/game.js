/*
 * game.js
 * Grundlegender Spieleaufbau
 * http://www.zebresel.de
 *
 */

//Grundobjekt des Spieles
var Game = { 
	fps: 50,	
	frame: 0
};

//Initialisierung des Spiels
Game.init = function() {
	//Einstellungen
	Game.StartTime = (new Date).getTime();
	Game.width = MAP_X * STEPS;
	Game.height = MAP_Y * STEPS;
	
	this.state = "menu";
	this.username = "";
	
	//GUI erstellen
	Game.Gui = new GUI();
	
	//Audio
	Game.Audio = new Audio();
	
	//Logik
	Game.Logic = new Logic();
	
	//Canvas erstellen HTML5
	Game.canvas = document.createElement("canvas");
	Game.canvas.width = Game.width;
	Game.canvas.height = Game.height + 20;
	
	//Canvas in ein Context speichern
	Game.world = Game.canvas.getContext("2d");
	
	//Spieler erstellen
	Game.Player = new Player(new Vector2(STEPS * 2, STEPS * 4));
	
	//Spieleinhalte laden
	Game.Block = new Block(new Vector2(STEPS * 2, STEPS * 8));
	
	
	//Welt in die HTML hinzufügen
	this.gameField = document.getElementById("game_field");
	this.highscoreField = document.getElementById("highscore_field");
	this.usernameField = document.getElementById("username_field");
	this.usermailField = document.getElementById("usermail_field");

	this.gameField.appendChild(Game.canvas);
	this.highscoreField.appendChild(Game.Gui.highscoreHTML);
	this.usernameField.appendChild(Game.Gui.usernameHTML);
	this.usermailField.appendChild(Game.Gui.usermailHTML);
	
	
	//Spiel starten
	Game._onEachFrame(Game.run);
}

Game.Start = function() {
	if(Game.Gui.usernameHTML.value != "")
	{
		Game.username = Game.Gui.usernameHTML.value.replace(/\s+$/,"");
		Game.usermail = Game.Gui.usermailHTML.value.replace(/\s+$/,"");
		
		Game.Player.Reset();
		Game.StartTime = (new Date).getTime();
		
		Game.state = "game";
	}
}

Game.End = function() {
	Game.Gui.usernameHTML.value = Game.username;
	Game.Gui.usermailHTML.value = Game.usermail;
	
	var xmlHttpScore = new XMLHttpRequest();		
	xmlHttpScore.open('GET', DATABASE_FOLDER + 'db_score.php?user=' + Game.username + '&mail=' + Game.usermail + '&time=' + (Date.now() - Game.StartTime) + '&points=' + Game.Player.score, true);
	xmlHttpScore.send(null);
		
	Game.state = "end";
}


Game.draw = function() {
	Game.world.clearRect(0, 0, Game.width, Game.height + 20);
	Game.world.strokeRect(0, 0, Game.width, Game.height);
	Game.Player.Draw(Game.world);
	
	//Spiel zeichnen
	Game.Block.Draw(Game.world);
	
	//GUI zeichnen
	Game.Gui.Draw(Game.world);
}


Game.update = function() {
	Game.Player.Update(Game.frame);
	Game.Gui.Update(Game.frame);
	Game.Logic.Calc();
}


Game.run = (function() {
	nextGameTick = (new Date).getTime();
	
	return function() {
		while ((new Date).getTime() > nextGameTick) {
			Game.update();
			nextGameTick += (1000 / Game.fps);
			Game.frame++;
		}
		
		Game.draw();
	};
})();


Game._onEachFrame = (function() {
	var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	if (requestAnimationFrame) 
	{
		return function(cb) {
			var _cb = function() { 
				cb(); 
				requestAnimationFrame(_cb); 
			}
			_cb();
		};
	} 
	else 
	{
		return function(cb) {
			setInterval(cb, 1000 / Game.fps);
		}
	}
})();