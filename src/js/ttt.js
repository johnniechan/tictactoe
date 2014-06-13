var ttt_model;

if(typeof gamestate == "undefined")
{
	ttt_model = new tictactoeModel();
}
else
{
	ttt_model = new tictactoeModel(gamestate);
}


var ttt_view = new tictactoeView(ttt_model,
				{message_box : "msg",
					reset_button: "reset",
					box0 : "box1",
					box1 : "box2",
					box2 : "box3",
					box3 : "box4",
					box4 : "box5",
					box5 : "box6",
					box6 : "box7",
					box7 : "box8",
					box8 : "box9"} );

var ttt_controller = new tictactoeController(ttt_model, ttt_view);

ttt_view.drawBoard();
