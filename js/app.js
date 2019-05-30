$(function () {
    var App = {

        /**
         * Init Function
         */
        init: function() {
            App.PlayVideo();
            App.Sidebar();
            App.SmoothScroll();
            App.General();
        },

        PlayVideo: function(){
            $('#play-video').on('click', function(e){
              e.preventDefault();
              $('#video-overlay').addClass('open');
              $("#video-overlay").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/4PhHsiGf8cI" frameborder="0" allowfullscreen></iframe>');
            });

            $('.video-overlay, .video-overlay-close').on('click', function(e){
              e.preventDefault();
              close_video();
            });

            $(document).keyup(function(e){
              if(e.keyCode === 27) { close_video(); }
            });

            function close_video() {
              $('.video-overlay.open').removeClass('open').find('iframe').remove();
            };
        },

        Sidebar: function () {
            $(window).resize(function() {
                var path = $(this);
                var contW = path.width();
                if(contW >= 751){
                    document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
                }else{
                    document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
                }
            });

            $('.dropdown').on('show.bs.dropdown', function(e){
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
            });

            $('.dropdown').on('hide.bs.dropdown', function(e){
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
            });

            $(".navbar-toggler").click(function(e) {
                e.preventDefault();
                var elem = document.getElementById("sidebar-wrapper");
                left = window.getComputedStyle(elem,null).getPropertyValue("left");
                if(left == "200px"){
                    document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
                }
                else if(left == "-200px"){
                    document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
                }
            });

            function getPageHeight(){
                var height = (window.innerHeight > 0) ? window.innerHeight : document.documentElement.clientHeight;
                $('.sidebar-nav').css('height',height-90);
            }
            window.onresize = getPageHeight();
            getPageHeight();
        },

        /**
         * ScrollBack
         */
        SmoothScroll: function() {
            
        // Select all links with hashes
        $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
              && 
              location.hostname == this.hostname
            ) {
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  };
                });
              }
            }
          });

        },

        General: function(){            
            $(function () {
              $('[data-toggle="popover"]').popover();
            });
        }
    };

    $(function() {
        App.init();
    });

});