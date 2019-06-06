var mapp;
var data_g;
var timer;
var name_loc;
var role;
var game_id;
var src_img;
var r_role;
var r_loc;
var vote;

$(document).ready(function () {
	mapp = $('#mapp');
	timer = $('#timer');
	name_loc = $('#name_loc');
	role = $('#role');
	vote = $('#vote');
});

//Парсинг данных

function map() {
	var lol = decodeURIComponent(location.search.substr(1)).split('&');
	var kent = lol[0].split('=');
	game_id = kent[1];
	aj("GET", "take_map_info.php?game_id=" + game_id, function (data) {
		if (data != 'not_found') {
			data = jQuery.parseJSON(data);
			src_img = data['img'];
			r_role = data['role'];
			r_loc = data['loc'];
		}
	});
}

function parse1() {
	var lol = decodeURIComponent(location.search.substr(1)).split('&');
	var kent = lol[0].split('=');
	game_id = kent[1];
	aj("GET", "take_map_info.php?game_id=" + game_id, function (data) {
		if (data != 'not_found') {
			data = jQuery.parseJSON(data);
			src_img = data['img'];
			r_role = data['role'];
			r_loc = data['loc'];
		}

	});
}

//Вывод картинки и локации

function map1(data) {
	role.empty();
	role.prepend($('<h3>' + data + '</h3>'));
}

function map2(data) {
	name_loc.empty();
	name_loc.prepend($('<h3>' + data + '</h3>'));
}

function map3(data) {
	mapp.empty();
	mapp.prepend($('<img src="'+ data + '">'));
}

function update(tum) {
	var min = 0;
	var sec = 0;
	if (tum > 59)
		min = parseInt((tum / 60), 10);
	sec = parseInt((tum % 60), 10);
	if (sec < 10)
		sec = "0" + sec;
	if (min < 10)
		min = "0" + min;
	if (tum < 0) {
		min = "00"
		sec = "00";
	}
	timer.empty();
	timer.prepend($('<h2>' + min + ':' + sec + '</h2>'));
	// console.log(data_g);
}

//Голосование

function vote_lol() {
	aj("GET", "start_vote.php", function (data) {
		var pol;
		// console.log(data);
		data = jQuery.parseJSON(data);
		// console.log(data);
		role.empty();
		name_loc.empty();
		mapp.empty();
		vote.empty();
		map3("pics/WHOIS.png");
		jQuery.each(data, function (i, val) {
			pol = val.split(';');
			vote.prepend($('<div class="player_tab" data-id="' + i + '">' + pol[1] + " - " + pol[0] + '</div>').click(vote_it));
		});
	});
	setTimeout(vote_lol, 1000);
}

function vote_it() {
	if (confirm('Вы уверены?'))
		aj("GET", "put_vote.php?id=" + $(this).data('id'), vote_lol);
}

/// Таймер

function take_new3() {
	var lul = new Date().getTime() / 1000;
	var tum;
	tum = data_g["t_finish"] - lul;
	if (data_g["t_finish"] <= lul) {
		vote_lol();
		update(tum);
	}
	else {
		update(tum);
		// console.log(tum);
		setTimeout(take_new3, 10);
	}
}

function take_new2() {
	var lul = new Date().getTime() / 1000;
	var tum;
	tum = data_g["t_start"] - lul; 
	if (data_g["t_start"] <= lul) {
		map3(src_img);
		map1(r_role);
		if (r_loc)
			map2(r_loc);
		take_new3();
		// console.log("Игра началась");
	}
	else {
		update(tum);
		// console.log(tum);
		setTimeout(take_new2, 10);
	}
}

function take_new(data) {
	var i = 0;
	while (data[i]) {
		if (data[i]['game_id'] == game_id)
		{
			data_g = data[i];
			take_new2();
			return ; 
		}
		i++;
	}
	console.log("ERROR");
	document.location.replace("main.html");
};

function load_info() {
	var lol = decodeURIComponent(location.search.substr(1)).split('&');
	var kent = lol[0].split('=');
	game_id = kent[1];
	// console.log(game_id);
	aj("GET", "take_role.php", function (data) {
		// console.log(data);
		data = jQuery.parseJSON(data);
		take_new(data);
	});
	// setTimeout(take_new2, 1000);
};

function aj(method, url, status) {
	$.ajax({
		method: method,
		url: url,
	}).done(function (data) {
		status(data);
	});
};