var jTwoWay = function(){
	var func = {};
	var slot = {};
	var view = {};
	/*
		получаем сигнал от элемента, сопостовляем со slot
		если подходящий slot не найден, то выдаем ошибку.
	*/
	this.runSlot = function( signal, thisElement ){ 

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
	$.ajax({
        type: "POST",
        url: "assets/components/xcore/connectors.php"+"?action="+action,
        data: post,
		success: function ( data ) {
			return data;
		}
    });
}

jtw.slot['action'] = function( thisElement ) {
	var action = thisElement.attr('x-action');
	var rowId = thisElement.attr('x-row-id');
	var post = {};
	post['id'] = 'fdg';
	console.log(post);
	var data = jtw.func['x-action'](action,post);
	jtw.view['go'](data,thisElement);
	
	return false
}

jtw.view['go'] = function( data, thisElement ) {
	console.log(data);
}
