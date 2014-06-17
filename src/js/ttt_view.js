function tictactoeView(_elements)
{
	this.elements = {
		message_box : document.getElementById(_elements.message_box),
		reset_button: document.getElementById(_elements.reset_button),
		board : {
			box0 : document.getElementById(_elements.box0),
			box1 : document.getElementById(_elements.box1),
			box2 : document.getElementById(_elements.box2),
			box3 : document.getElementById(_elements.box3),
			box4 : document.getElementById(_elements.box4),
			box5 : document.getElementById(_elements.box5),
			box6 : document.getElementById(_elements.box6),
			box7 : document.getElementById(_elements.box7),
			box8 : document.getElementById(_elements.box8) }
	};
}

tictactoeView.prototype = {

	/**** View Update Methods ****/

	
	putMessage: function(msg)
	{
		var message_box = this.elements.message_box;
		message_box.innerHTML = msg;
	},

	drawBox: function(pos, token)
	{
		var name = "box" + pos.toString();
		this.elements.board[name].innerHTML="";
		if(token == "O")
		{
			var new_el = document.createElement('div');
			new_el.setAttribute('class', 'circle');
			this.elements.board[name].appendChild(new_el);
		}
		else if(token == "X")
		{
			this.elements.board[name].innerHTML="X";
			
		}
		else
		{
		}


	},

	clearBoard: function()
	{
		for(i = 0; i < 9; i++)
		{
			this.drawBox(i, "n");
		}
	}
};
	
