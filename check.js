var ft_list;

$(document).ready(function () {
	ft_list = $('#ft_list');
});

function upload() {
	ft_list.empty();
	aj("GET", 'select.php', function (data) {
		data = jQuery.parseJSON(data);
		console.log(data);
		jQuery.each(data, function (i, val) {
			ft_list.prepend($('<div data-id="' + i + '">' + val + '</div>'));
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
		setTimeout(worker, 5000);
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