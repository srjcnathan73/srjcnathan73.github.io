var init = function(skin, position, effect) {
	$('#gdw').show();
	$('#getfresh_demo_wrapper').html($('#spare_content').html()); // overwrite #getfresh_demo_wrapper content to apply the new skin
	var url = document.location.toString();
	if (url.match('#')) {
		url = url.split('#')[0];
	}
	document.location = url+'#'+skin+'-'+position+'-'+effect;
	$("#skin").val(skin);
	$("#position").val(position);
	$("#effect").val(effect);
	var dt = $('#getfresh_demo_wrapper .tabs_holder').skinableSkins({skin: skin, position: position, effect: effect});
	$('#getfresh_demo_wrapper').effect('slide', {direction: 'up'}, 500);
	$('#gdw').hide();
	var content = $('#spare_demo_code').html();
	content = content.replace('$$$skin$$$', skin);
	content = content.replace('$$$position$$$', position);

	content = content.replace('$$$skin$$$', skin);
	content = content.replace('$$$position$$$', position);
	content = content.replace('$$$effect$$$', effect);
	$('#main_title').html($("#skin option:selected").text());
	$('#getfresh_demo_code').html(content);
};
$(document).ready(function() {

	$('#previewSkin').click(function(e) {
		e.preventDefault();
		init($('#skin').val(), $('#position').val(), $('#effect').val());
	});
	$('#videoPreview').click(function(e) {
		e.preventDefault();
		jwplayer('mediaplayer').play();
	});
	// init first
	var url = document.location.toString();
	var skin, position, effect;
	if (url.match('#skin')) { // values in URL
		var info	= url.split('#')[1];
		skin 		= info.split('-')[0]; 
		position 	= info.split('-')[1];
		effect 		= info.split('-')[2];
	}
	else {
		skin 		= 'skin1'; 
		position 	= 'top';
		effect 		= 'basic_display';
	}
	init(skin, position, effect);
	

});


