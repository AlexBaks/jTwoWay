var jTwoWay = function(){
	var func = {};
	var slot = {};
	var view = {};
	var thisElement;
	/*
		получаем сигнал от элемента, сопостовляем со slot
		если подходящий slot не найден, то выдаем ошибку.
	*/
	this.runSlot = function( signal, thisElement ){ 
		this.thisElement = thisElement;
		if (signal in jtw.slot) { 
				return jtw.slot[signal]( thisElement );
		} else {
			console.log('jtw.slot: '+signal+' не найден');
		}
	}
	
	this.runView = function( viwe, data, thisElement ){ 
		if (viwe in jtw.func) { 
			return jtw.viwe[viwe](data,thisElement);
		} else {
			console.log('jtw.viwe: '+viwe+' не найден');
		}
	}
}	

var jtw = new jTwoWay();
jtw.func = {};
jtw.slot = {};
jtw.view = {};

$( document ).ready(function() {

	$( "body" ).on( "click", '[signal-click]' ,function(e) {
		var thisElement = $(this);
		var signal = thisElement.attr('signal-click');
		return jtw.runSlot( signal, thisElement );
	});
	
	$( "[signal-hover]" ).hover(function(e) {
		var thisElement = $(this);
		var signal = thisElement.attr('signal-hover');
		return jtw.runSlot( signal, thisElement );
	});
	
	$( "body" ).on( "focus", '[signal-focus]' ,function(e) {
 		var thisElement = $(this);
		var signal = thisElement.attr('signal-focus');
		return jtw.runSlot( signal, thisElement );
    });
    
    $( "body" ).on( "focusout.tab", '[signal-focusout]',{stop:true} ,function(e) {
		var thisElement = $(this);
		var signal = thisElement.attr('signal-focusout');
		return jtw.runSlot( signal, thisElement );
    });
	
});


jtw.func['x-action'] = function( action, post) {

	if (action == '') {
		var get = '';
	}else{
		var get = "?action="+action;
	}

	$.ajax({
        type: "POST",
        url: "assets/components/xcore/connectors.php"+get,
        data: post,
		dataType : "json",
		success: function ( json ) {
			jtw.view[view]( json );
		}
    });
}

jtw.func['migx-action'] = function( view, action, post) {

	post['start'] = 0;
	post['limit'] = 10
	post['action'] = 'mgr/migxdb/getList';
	post['configs'] = 'catalog';
	post['reqTempParams'] = '';
	post['reqConfigs'] = 'catalog';
	post['resource_id'] = '';
	post['object_id'] = '';


	$.ajax({
        type: "POST",
        url: "assets/components/migx/connector.php",
        data: post,
		dataType : "json",
		success: function ( json ) {
			jtw.view[view](json);
		}
	});
}

jtw.slot['action'] = function( thisElement ) {
	var action = thisElement.attr('x-action');
	var rowId = thisElement.attr('x-row-id');
	var post = {};
	post['id'] = 'fdg';
	var json = jtw.func['migx-action']('go',action,post);
	return false
}

jtw.view['go'] = function( json ) {
	console.log(jtw.thisElement.attr('href'));
	console.log(json.message);
}
