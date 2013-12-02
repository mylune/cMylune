
jQuery(document).ready(function() {

    /*
        Background slideshow
    */
    $('.coming-soon').backstretch([
      "assets/img/backgrounds/1.jpg"
    , "assets/img/backgrounds/2.jpg"
    , "assets/img/backgrounds/3.jpg"
    ], {duration: 3000, fade: 750});

    /*
        Countdown initializer
    */
    var now = new Date()
    var dateStart = new Date(2013, 10, 30, 0, 0, 0, 0);
    var dateEnd = new Date(2013, 11, 7, 19, 0 , 0, 0);
    var days = parseInt(String(((((((dateEnd.valueOf() - dateStart.valueOf()) / 1000) / 60) / 60) / 24))));
    var hours = parseInt(String(((((dateEnd.valueOf() - dateStart.valueOf()) / 1000) / 60) / 60))) - (days * 24);    
    var minutes = parseInt(String((((dateEnd.valueOf() - dateStart.valueOf()) / 1000) / 60) - (days * 24 * 60) - (hours * 60)));
    var seconds = parseInt(String(((dateEnd.valueOf() - dateStart.valueOf()) / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)));
    var milliseconds = (dateEnd.valueOf() - dateStart.valueOf()) - (days * 24 * 60 * 60 * 1000) - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000) - seconds;
    var countTo = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (dateStart.valueOf());
    $('.timer').countdown(countTo, function(event) {
        var $this = $(this);
        switch(event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
                $this.find('span.'+event.type).html(event.value);
                break;
            case "finished":
                $this.hide();
                break;
        }
    });

    /*
        Tooltips
    */
    $('.social a.facebook').tooltip();
    $('.social a.twitter').tooltip();
    $('.social a.dribbble').tooltip();
    $('.social a.googleplus').tooltip();
    $('.social a.pinterest').tooltip();
    $('.social a.linkedin').tooltip();

    /*
        Subscription form
    */
    $('.success-message').hide();
    $('.error-message').hide();

    $('.subscribe form').submit(function() {
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: 'assets/sendmail.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn();
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn();
                }
            }
        });
        return false;
    });

});

