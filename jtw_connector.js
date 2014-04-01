jtw.ajax['x-connector'] = function( action, post) {

	if (action == undefined) {
		var get = '';
	}else{
		var get = "?action="+action;
	}
	if (view == undefined) {
		console.log('jtw.viwe: '+viwe+' не найден');
		return false;
	}

	$.ajax({
        type: "POST",
        url: jtw.config['modx_assets_path']+"xcore/connectors.php"+get,
        data: post,
		dataType : "json",
		success: function ( json ) {
			jtw.runView(view, json);
		}
    });
}

jtw.ajax['ajax-migx-connector'] = function( view, action, post) {

	if (action == undefined) {
		var get = '';
	}else{
		var get = "?action="+action;
	}
	
	$.ajax({
        type: "POST",
        url: jtw.config['modx_assets_path']+"migx/connector.php"+get,
        data: post,
		dataType : "json",
		success: function ( json ) {
			jtw.runView(view, json);
		}
	});
}
