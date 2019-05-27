var ft_list;
var room_num;
$(document).ready(function () {
	ft_list = $('#ft_list');
	room_num = $('#Room');
});

function upload() {
	ft_list.empty();
	aj("GET", 'select.php', function (data) {
		data = jQuery.parseJSON(data);
		console.log(data);
		jQuery.each(data, function (i, val) {
			ft_list.prepend($('<div class="player_tab" data-id="' + i + '">' + val + '</div>'));
		});
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
		setTimeout(worker, 2000);
	  }
	});
}

function room() {
	room_num.empty();
	aj("GET", 'functions/give_game_id.php', function (data) {
		if (data != 'false') {
			console.log(data);
			room_num.prepend($('<h1 id="number_alert">' + data + '</h1>'));
		}
	});
}

function aj(method, url, status) {
	$.ajax({
		method: method,
		url: url,
	}).done(function (data) {
		status(data);
	});
}

