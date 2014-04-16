var jTwoWay = function(){
	var slot = {};
	var connector = {};
	var view = {};
	var thisElement;
	var config = {}
	/*
		получаем сигнал от элемента, сопостовляем со slot
		если подходящий slot не найден, то выдаем ошибку.
	*/
	this.runSlot = function( signal, thisElement ){ 
        
		this.element = thisElement;
        var arrSignal = signal.split(/[:]/);
        this.elementSufix = arrSignal[1];
        if (this.elementSufix == undefined) {
            this.elementSufix = '';
        } 
        
		if (arrSignal[0] in jtw.slot) { 
				return jtw.slot[arrSignal[0]]();
		} else {
			console.log('jtw.slot: '+arrSignal[0]+' не найден');
		}
	}
	
	this.runConnector = function( connector, view, action, post ){ 
		if (connector in jtw.connector) { 
			return jtw.connector[connector](view, action, post);
		} else {
			console.log('jtw.ajax: '+connector+' не найден');
		}
	}
	
	this.runView = function( view, json ){ 
		if (view in jtw.view) { 
			return jtw.view[view]( json );
		} else {
			console.log('jtw.view: '+view+' не найден');
		}
	}
    
    this.getData = function( name ){ 
        
        if (this.elementSufix != '') {
            var elementSufix = '-'+this.elementSufix;
        }else{
            elementSufix = '';
        }
        var name = 'data-'+name+elementSufix;
        var val = this.element.attr( name );
        if (val == undefined) {
            var element = this.element.closest('['+name+']');
            val = element.attr( name );
        }   
        return val;
	}
    
    this.setData = function( name, value ){ 

        if (this.elementSufix != '') {
            var elementSufix = '-'+this.elementSufix;
        }else{
            elementSufix = '';
        }
        var name = 'data-'+name+elementSufix;
        var val = this.element.attr( name );
        if (val != undefined) {
            this.element.attr( name, value );
            alert('dsf');
        }
        
        if (val == undefined) {
            var element = this.element.closest('['+name+']');
            val = element.attr( name );
            if (val != undefined) {
                this.element.attr( name, value );
            }
        }   
	}
}	

var jtw = new jTwoWay();
jtw.slot = {};
jtw.connector = {};
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


jtw.config['modx_assets_path'] = 'assets/components/';

jtw.slot['action'] = function() {
    //jtw.setData('action','DDDD');
    var d = jtw.getData('action');
    alert(d);
}
