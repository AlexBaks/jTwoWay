var jTwoWay = function(){
	var ajax = {};
	var slot = {};
	var view = {};
	var thisElement;
	var config = {}
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
	
	this.runAjax = function( ajax, view, action, post ){ 
		if (ajax in jtw.ajax) { 
			return jtw.ajax[ajax](view, action, post);
		} else {
			console.log('jtw.ajax: '+ajax+' не найден');
		}
	}
	
	this.runView = function( view, json ){ 
		if (view in jtw.view) { 
			return jtw.view[view]( json );
		} else {
			console.log('jtw.view: '+view+' не найден');
		}
	}
}	

var jtw = new jTwoWay();
jtw.ajax = {};
jtw.slot = {};
jtw.view = {};
jtw.config = {};

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
