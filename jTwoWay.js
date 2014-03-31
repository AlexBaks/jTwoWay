<?
var jTwoWay = function(){
	var slot = {};
	var view = {};
	var plugin = {};
	/*
		получаем сигнал от элемента, сопостовляем со slot
		если подходящий slot не найден, то выдаем ошибку.
	*/
	this.runSlot = function( signal, thisElement ){ 

		if (signal in jtw.slot) { 
				return jtw.slot[signal]( thisElement );
		} else {
			alert('Слот не найден: '+signal);
		}
	}

}	
var jtw = new jTwoWay();
jtw.slot = {
	action: function(thisElement){
		var signal = thisElement.attr('signal-click');
		var rowId = thisElement.attr('row-id');
		
		$.ajax({
            type: "POST",
            url: "assets/components/xcore/connectors.php",
            data: { 
				action: signal
                ,id: rowId
            }
        }).done(function( msg ) {

            return false;
        });
	}
	,del: function(thisElement, signal) {
	}
	,save: function( thisElement, value) {
	}
};
jtw.slot['signal'] = function( thisElement ) {alert('sdf')}
$( document ).ready(function() {

	$("[signal-click]").click(function () {
		var signal = $(this).attr('signal-click');
		jtw.runSlot( signal, $(this) );
		return false;

	});
});
