
if(typeof gamestate == "undefined")
{
	gamestate = 	["n", "n", "n"
		,"n", "n", "n"
		,"n", "n", "n"];
}

for(var i = 0; i < 9; i++)
{
	var name = "box" + (i + 1).toString();
	console.log(name);
 	document.getElementById(name).innerHTML=gamestate[i];
}

console.log(gamestate);

function clickTask(pos)
{
	var board_pos = pos;
	var box_name = "box" + (pos + 1);
	var box_element = document.getElementById(box_name);

	function makeMoveX()
	{
		box_element.innerHTML="X";
		gamestate[board_pos] = "X";
	}

	function makeMoveO()
	{
		var new_el = document.createElement('div');
		new_el.setAttribute('class', 'circle');
		box_element.appendChild(new_el);
		gamestate[board_pos] = "O";
	}

		
	
	return function(){
		if(gamestate[board_pos] == "n")
		{
			makeMoveO();
		}
		else
		{
			document.getElementById("msg").innerHTML="Move already played on this spot";
		}
		getServerMove();
		
	};
};

// http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
function post(path, params, method) {
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
		

function getServerMove()
{
	var data = {"data" : gamestate};
	post("ttt.html", gamestate, "post");

}

document.getElementById("box1").onclick = clickTask(0);
document.getElementById("box2").onclick = clickTask(1);
document.getElementById("box3").onclick = clickTask(2);
document.getElementById("box4").onclick = clickTask(3);
document.getElementById("box5").onclick = clickTask(4);
document.getElementById("box6").onclick = clickTask(5);
document.getElementById("box7").onclick = clickTask(6);
document.getElementById("box8").onclick = clickTask(7);
document.getElementById("box9").onclick = clickTask(8);

