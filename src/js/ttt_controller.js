function tictactoeController(_model, _view)
{
	this.model = _model;
	this.view = _view;
	console.log(this);

	// Q: Why can't I just assign without the "this." part?
	this.view.elements.board.box0.onclick = this.clickTask(0);
	this.view.elements.board.box1.onclick = this.clickTask(1);
	this.view.elements.board.box2.onclick = this.clickTask(2);
	this.view.elements.board.box3.onclick = this.clickTask(3);
	this.view.elements.board.box4.onclick = this.clickTask(4);
	this.view.elements.board.box5.onclick = this.clickTask(5);
	this.view.elements.board.box6.onclick = this.clickTask(6);
	this.view.elements.board.box7.onclick = this.clickTask(7);
	this.view.elements.board.box8.onclick = this.clickTask(8);
	this.view.elements.reset_button.onclick = this.resetTask();

	this.checkGameOver();
}


tictactoeController.prototype = {

	/**** Callback Methods ****/

	clickTask : function(_pos)
	{
		var pos = _pos;
		var model = this.model;
		var view = this.view;
		var _this = this;

		return function()
		{
			console.log("clicked " + pos + "block.");
			if(!model.isEnd())
			{
				if(!model.placeToken("O", pos))
				{
					view.putMessage("Invalid mark.");
				}
				else
				{
					if(!_this.checkGameOver())
					{
						_this.getServerMove();
					}
					else
					{
						view.drawBoard();
					}
					
				}	
			}
			else
			{
				view.putMessage("Game already ended.");
			}
		}
	},

	resetTask : function()
	{
		var model = this.model;
		var view = this.view;
		return function()
		{
			model.resetBoard();
			view.drawBoard();
		}
	},

	checkGameOver : function()
	{
		if(this.model.isWin("O"))
		{
			this.view.putMessage("Game over. You win.");
			return true;
		} 
		else if(this.model.isWin("X"))
		{
			this.view.putMessage("Game over. You lose.");
			return true;
		}
		else if(this.model.isDraw())
		{
			this.view.putMessage("Game over. Draw.");
			return true;
		}
		return false;
	},

	
	getServerMove : function()
	{
		this.postToServer("ttt.html", this.model.gamestate, "post");
	},

	
	postToServer : function(path, params, method) 
	{
	    method = method || "post"; // Set method to post by default if not specified.

	    var form = document.createElement("form");
	    form.setAttribute("method", method);
	    form.setAttribute("action", path);

	    for(var key in params) {
		if(params.hasOwnProperty(key)) {
		    var hiddenField = document.createElement("input");
		    hiddenField.setAttribute("type", "hidden");
		    hiddenField.setAttribute("name", key);
		    hiddenField.setAttribute("value", params[key]);

		    form.appendChild(hiddenField);
		 }
	    }

	    document.body.appendChild(form);
	    form.submit();
	}

	
};
