	
	
	$.ajax({
            type: "POST",
            url: "assets/components/modxsite/connectors/mail.php",
            data: { 
                name: $('input[name=name]').val()
                ,mobil: $('input[name=mobil]').val()
                ,mail: $('input[name=mail]').val()
                ,text: $('.formText_alex').val()
                ,city: $('input[name=city]').val() 
            }
        }).done(function( msg ) {
            $('#bottom_left').html('<br /><br /><br /><h2></h2>');
            return false;
        });