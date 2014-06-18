function tictactoeModel(input_state)
{
	if(typeof input_state != "undefined")
	{
		this.gamestate = input_state;
	}
	else
	{
		this.gamestate = ["n", "n", "n",
				  "n", "n", "n",
				  "n", "n", "n"];
	}

}

tictactoeModel.prototype = {

	getBox : function(pos)
	{
		return this.gamestate[pos];
	},

	/**** Manipulate Board ****/

	placeToken : function(player, pos)
	{
		if(this.gamestate[pos] == "n" && !this.isEnd() && this.validPlayer(player))
		{
			this.gamestate[pos] = player;
			return true;
		}
		return false;	
	},

	resetBoard : function()
	{
		for(i = 0; i < 9; i++)
		{
			this.gamestate[i] = "n";
		}
	},

	/**** Helper Functions ****/
	
	validPlayer : function(player)
	{
		return player == "O" || player == "X";
	},


	/**** Game Over Checks ****/

	isFull : function()
	{
		var is_full = true;
		for(i = 0; i < 9; i++)
		{
			is_full = is_full && (this.gamestate[i] != "n");
		}
		return is_full;
	},

	isWin : function(player)
	{
		return ((this.gamestate[0] == player && this.gamestate[1] == player && this.gamestate[2] == player) ||
			(this.gamestate[3] == player && this.gamestate[4] == player && this.gamestate[5] == player) ||
			(this.gamestate[6] == player && this.gamestate[7] == player && this.gamestate[8] == player) ||
			(this.gamestate[0] == player && this.gamestate[3] == player && this.gamestate[6] == player) ||
			(this.gamestate[1] == player && this.gamestate[4] == player && this.gamestate[7] == player) ||
			(this.gamestate[2] == player && this.gamestate[5] == player && this.gamestate[8] == player) ||
			(this.gamestate[0] == player && this.gamestate[4] == player && this.gamestate[8] == player) ||
			(this.gamestate[6] == player && this.gamestate[4] == player && this.gamestate[2] == player));
	},

	isDraw : function()
	{
		return !this.isWin("O") && !this.isWin("X") && this.isFull();
	},

	isEnd : function()
	{
		return this.isFull() || this.isWin("O") || this.isWin("X");
	},

};
