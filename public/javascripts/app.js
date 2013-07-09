var nickname = ''
  , socket = io.connect('http://localhost');

socket.on('auth', function () {
	nickname = prompt("What is your nickname?");
	socket.emit('setnick', {nickname: nickname});
});

nickname = prompt("What is your nickname?");
socket.emit('setnick', {nickname: nickname});

socket.on('welcome', function (data) {
	var toadd = $('<li>').attr("data-nickname", nickname).text("Joined");
	$("#chat").append(toadd);
	console.dir(data);
	
	for (var i = 0; i < data.users.length; i++) {
		$("#online").append("<li>"+data.users[i]+"</li>");
	}
});

$("#sendmessage").submit(function (e) {
	
	e.preventDefault();
	
	var foo = $("#message").val();
	$("#message").val("");
	
	socket.emit("msg", foo);
	//alert("sendt"+foo);
	var bar = $('<li>').attr("data-nickname", nickname).text(foo);
	$("#chat").append(bar);
	
});

socket.on('msg', function(m,n) {
	//alert("msg received"+m);
	var bar = $('<li>').attr("data-nickname", n).text(m);
	$("#chat").append(bar);
});

socket.on('updateNick', function(n) {
	var cats = $("<li>").text(n);
	$("#online").append(cats);
});
