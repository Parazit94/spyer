var ft_list;
var room_num;
$(document).ready(function () {
	ft_list = $('#ft_list');
	room_num = $('#Room');
});

function upload() {
	var lol = decodeURIComponent(location.search.substr(1)).split('&');
	ft_list.empty();
	aj("GET", 'select.php', function (data) {
		if (data == "false") {
			document.location.replace("main.html");
		}
		else if (data == "true") {
			document.location.replace('game.html?' + lol[0]);
		}
		else {
			data = jQuery.parseJSON(data);
			console.log(data);
			jQuery.each(data, function (i, val) {
				ft_list.prepend($('<div class="player_tab" data-id="' + i + '">' + val + '</div>'));
			});
		}
			
	});
}

function worker() {
	$.ajax({
	  url: 'check.php', 
	  success: function(html) {
		if (html == 'true') {
			console.log('upload\n');
			upload();
		}
		else
			console.log('no upload\n');
	  },
	  complete: function() {
		setTimeout(worker, 500);
	  }
	});
}

function room() {
	room_num.empty();
	aj("GET", 'functions/give_game_id.php', function (data) {
		if (data != 'false') {
			console.log(data);
			room_num.prepend($('<h3 id="number_alert">' + data + '</h3>'));
		}
	});
}

function vote() {
	aj("GET", 'functions/give_vote.php', function () {return;});
}

function aj(method, url, status) {
	$.ajax({
		method: method,
		url: url,
	}).done(function (data) {
		status(data);
	});
}

