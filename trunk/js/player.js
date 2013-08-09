/*
 * player.js
 * Spieler im Spiel (Steuerung)
 * http://www.zebresel.de
 *
 */
 
 
//Grundobjekt - Konstruktor
function Player(pos) {
	//Position
	this.pos = pos;
	this.width = 10;
	this.height = 10;
	
	this.tail = new Array();
	this.tail[0] = new Vector2(this.x, this.y);
	
	this.Init(this.pos);
}

//Player Funktionen
Player.prototype.Init = function(pos) {
	this.x = pos.x;
	this.y = pos.y;
	
	//Eigenschaften
	this.tickrate = SPEED;
	this.direction = new Vector2(1, 0);
	this.addTail = false;
	this.moved = false;
	
	this.score = 0;
	this.tail = new Array();
	this.tail[0] = new Vector2(this.x, this.y);
};

Player.prototype.Reset = function() {
	this.Init(this.pos);
};

Player.prototype.AddNewTail = function(points) {
	this.score += points;
	this.addTail = true;
}

Player.prototype.IsPositionOnPlayer = function(pos) {
	var ret = false;
	
	for(i = 0; i < this.tail.length; i++)
	{
		if(this.tail[i].x == pos.x && this.tail[i].y == pos.y)
		{
			ret = true;
			break;
		}
	}
	
	return ret;
}

Player.prototype.BitesInTail = function(pos) {
	var ret = false;
	
	for(i = 2; i < this.tail.length; i++)
	{
		if(this.tail[i].x == this.tail[0].x && this.tail[i].y == this.tail[0].y)
		{
			ret = true;
			break;
		}
	}
	
	return ret;
}

//Player Bewegung
Player.prototype.moveLeft = function() {
	if(this.direction.x == 0 && this.moved == false)
	{
		this.direction.x = -1;
		this.direction.y = +0;
		this.moved = true;
	}
};

Player.prototype.moveRight = function() {
	if(this.direction.x == 0 && this.moved == false)
	{
		this.direction.x = 1;
		this.direction.y = 0;
		this.moved = true;
	}
};

Player.prototype.moveUp = function() {
	if(this.direction.y == 0 && this.moved == false)
	{
		this.direction.x = +0;
		this.direction.y = -1;
		this.moved = true;
	}
};

Player.prototype.moveDown = function() {
	if(this.direction.y == 0 && this.moved == false)
	{
		this.direction.x = 0;
		this.direction.y = 1;
		this.moved = true;
	}
};

Player.prototype.startGame = function() {
	Game.Start();
};

//Engine Funktionen
Player.prototype.Draw = function(context) {
	context.strokeRect(this.x, this.y, this.width, this.height);
	
	for(i=0; i<this.tail.length - 1; i++)
	{
		context.fillRect(this.tail[i].x, this.tail[i].y, this.width - 1, this.height - 1);
	}
};

Player.prototype.Update = function(frame) {
	if (Key.isDown(Key.UP)) this.moveUp();
	if (Key.isDown(Key.DOWN)) this.moveDown();
	if (Key.isDown(Key.LEFT)) this.moveLeft();
	if (Key.isDown(Key.RIGHT)) this.moveRight();
	
	if (Key.isDown(Key.ENTER)) this.startGame();
	
	if(Game.state == "game" && frame%this.tickrate == 0)
	{		
		
		for(i = this.tail.length - 1; i > 0; i--)
		{
			this.tail[i] = this.tail[i - 1];
		}
		
		var tmpPos = new Vector2(this.x, this.y);
		this.tail[0] = tmpPos;
		
		if(this.addTail)
		{
			this.tail[this.tail.length] = new Vector2(this.tail[this.tail.length - 1].x, this.tail[this.tail.length - 1].y);
			this.addTail = false;
		}
		
		this.x += this.direction.x * 10;
		this.y += this.direction.y * 10;
		
		this.moved = false;
	}
};