//缩略地图
var Thumbnail = function() {

	var static_img = $('<img>').addClass('img-full').attr('src', 'img/thumb.png').css('height',200);

	$('body').append(
		$('<div>')
		.addClass("Thumbnail")
		.append(static_img)
	);
	
	this.hidden = false;
}

Thumbnail.prototype.hide = function(){
	$('.Thumbnail').hide();
}
Thumbnail.prototype.show = function(){
	$('.Thumbnail').show();
}
Thumbnail.prototype.toggle = function(){
	$('.Thumbnail').toggle();
	this.hidden = !this.hidden;
}