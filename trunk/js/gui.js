/*
 * gui.js
 * GUI des Spieles
 * http://www.zebresel.de
 *
 */
 
function GUI() { 
	this.usernameHTML = document.createElement("input");
	this.usernameHTML.setAttribute("class", "inputname");
	this.usernameHTML.setAttribute("placeholder","Please enter your name.");
	this.usernameHTML.setAttribute("type","text");
	
	this.usermailHTML = document.createElement("input");
	this.usermailHTML.setAttribute("class", "inputname");
	this.usermailHTML.setAttribute("placeholder","Please enter your mail. (not required)");
	this.usermailHTML.setAttribute("type","text");
	
	
	this.highscoreHTML = document.createElement("div");
	
	
	this.xmlScore;
};

GUI.prototype.Update = function(frame) {
	if(frame%500 == 0)
	{	
		var xmlHttpScore = new XMLHttpRequest();
		
		_this = this;
		xmlHttpScore.onreadystatechange = function () {
			if(xmlHttpScore.readyState == 4 && xmlHttpScore.status == 200)
			{
				_this.xmlScore = xmlHttpScore.responseXML;
			}
		};
		
		xmlHttpScore.open('GET', DATABASE_FOLDER + 'db_score.php', true);
		xmlHttpScore.send(null);
	}
};
 
GUI.prototype.Draw = function(context) {
	context.save();
	switch(Game.state)
	{
		case "menu":
		if(this.usernameHTML.value == "")
		{
			//context.fillText("Das Gewinnspiel ist vorbei!", 15, Game.height + 10);
			context.fillText("Please TYPE your name and mail.", 15, Game.height + 10);
		}
		else
		{
			//context.fillText("Gewinner werden benachrichtigt.", 15, Game.height + 10);
			context.fillText("Press ENTER to begin.", 15, Game.height + 10);
		}
		break;
	
		case "game":
		this.usernameHTML.setAttribute("style", "display: none;");
		this.usermailHTML.setAttribute("style", "display: none;");
		context.fillText("Points: " + Game.Player.score.toString(), 15, Game.height + 10);
		context.fillText("Time: " +  Math.round((Date.now() - Game.StartTime) / 1000) + " Sek.", Game.width - 80, Game.height + 10);
		break;
		
		case "end":
		this.usernameHTML.setAttribute("style", "display: block;");
		this.usermailHTML.setAttribute("style", "display: block;");
		context.fillText("Game over. Press ENTER again.", 15, Game.height + 10);
		break;
	};
	context.restore();
	
	if(this.xmlScore == null)
	{
		this.highscoreHTML.innerHTML = "Loading highscore. Please wait...";
	}
	else
	{
		var value = "";
		var user = this.xmlScore.getElementsByTagName("user");
		for(var i = 0; i < user.length; i++)
		{
			var name, points;
			for(var j = 0; j < user[i].childNodes.length; j++)
			{
				with(user[i].childNodes[j])
				{
					if(nodeName == "name")
					{
						name = firstChild.nodeValue;
					}
					else if(nodeName == "points")
					{
						points = firstChild.nodeValue;
					}
				}
			}	
			
			value += '<div class="user">' + (i+1) +  ". " + name + ': ' + points + '</div>';
		}
		
		this.highscoreHTML.innerHTML = value;
	}
};