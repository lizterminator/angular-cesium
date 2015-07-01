//缩略地图
var Thumbnail = function(config, hotspots) {

	var static_img = $('<img>').addClass('img-full').attr('src', 'img/thumb.png').css('height',200);

	


	$('body').append(
		$('<div>')
		.addClass("Thumbnail")
		.append(static_img)
	);
}