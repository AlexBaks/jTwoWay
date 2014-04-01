jtw.config['modx_assets_path'] = 'assets/components/';

jtw.slot['action'] = function( thisElement ) {
	
	var action = thisElement.attr('x-action');
	var rowId = thisElement.attr('x-row-id');
	var view = thisElement.attr('x-view');
	var post = {};
	
	view = 'go';	
	jtw.runConnector('migx',view,action,post);
	
	return false
}

jtw.view['go'] = function( json ) {
	console.log(jtw.thisElement.attr('href'));
	console.log(json.message);
}
