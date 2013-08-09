/*
 * logic.js
 * Logik des Spieles
 * http://www.zebresel.de
 *
 */
 
 function Logic() { };
 
 
 Logic.prototype.Calc = function() {
 	//Gamelogik
	if(Game.state == "game")
	{
		if(Game.Player.x < 0 || Game.Player.x > Game.width - Game.Player.width || Game.Player.y < 0 || Game.Player.y > Game.height - Game.Player.height)
		{
			//Spiel zurücksetzen wenn Spieler an den Rand stößt
			Game.End();
		}
		
		//Wenn Spieler sich selber frißt
		if(Game.Player.BitesInTail())
		{
			Game.End();
		}
		
		if(Game.Player.IsPositionOnPlayer(Game.Block)) 
		{
			Game.Player.AddNewTail(10);
			Game.Audio.PlaySound('eat.ogg');
			
			var tmp_poscheck = true;
			while(tmp_poscheck)
			{
				var x = Math.round(GetRandom(0, MAP_X - 1));
				var y = Math.round(GetRandom(0, MAP_Y - 1));
				var position = new Vector2(x * STEPS, y * STEPS);
	
				tmp_poscheck = Game.Player.IsPositionOnPlayer(position);
				if(!tmp_poscheck)
				{
					Game.Block.x = position.x;
					Game.Block.y = position.y;
				}
			}
		}
	}
 };