function tictactoeController(_model, _view)
{
	this.model = _model;
	this.view = _view;

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
					view.drawBox(pos, "O");

					if(!_this.checkGameOver())
					{
						_this.requestNextMove("X");
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
			view.clearBoard();
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

	
	requestNextMove : function(who)
	{
		//this.postToServer("ttt.html", this.model.gamestate, "post");

		that = this;

		var data = {"board" : this.model.gamestate, "who" : who};

		serverRequestNextMove("api/opp_move", data, function(resp_data){
			console.log(resp_data);
			if(resp_data.valid_move)
			{
			console.log(resp_data);
				if(that.model.placeToken(resp_data.who, resp_data.move))
				{
			console.log(resp_data);
					that.view.drawBox(resp_data.move, resp_data.who);
					that.checkGameOver();
				}
				else
				{
					Error("requestNextMove: Invalid Server Move");
				}
			}
			else
			{
				Error("requestNextMove: Server could not make a move.");
			}


		});

	},

	ajaxServerResponseTask : function (xmlhttp)
	{
		var model = this.model;
		var view = this.view;
		var _this = this;
		return function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var resp_data = JSON.parse(xmlhttp.responseText);
				if(resp_data.valid_move)
				{
					if(!model.placeToken(resp_data.who, resp_data.move))
					{
						view.putMessage("Server Error: Invalid mark.");
					}
					else
					{
						view.drawBox(resp_data.move, resp_data.who);
						_this.checkGameOver();
					}	
					
				}
			}
		};
	},
};

function serverRequestNextMove(path, data, done)
{
	var xmlhttp = new XMLHttpRequest();
	var req_data = JSON.stringify(data);
	console.log(req_data);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4)
		{
			if(this.status == 200)
			{
				var resp_data = JSON.parse(xmlhttp.responseText);
				console.log(resp_data);
				done(resp_data);
			}
			else
			{
				throw Error("ajaxServerRequest: Invalid status code " + this.status);
			}
		}
	};
	xmlhttp.open("POST", path, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xmlhttp.send(req_data); 
}
