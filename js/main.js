/* ===================================================================
 * Hola - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /*
     * NOTE: ssPreloader is commented out in ssInit() because it's likely handled by another script or not needed.
     * If you intend to use a preloader, uncomment it in ssInit() and ensure #loader and #preloader elements exist in HTML.
     */
    var ssPreloader = function() {
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {
            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        });
    };


    /*
     * NOTE: ssPrettyPrint is commented out in ssInit(). Remove if not used.
     */
    // var ssPrettyPrint = function() {
    //     $('pre').addClass('prettyprint');
    //     $( document ).ready(function() { prettyPrint(); });
    // };


    /* Move header
     * -------------------------------------------------- */
    var ssMoveHeader = function () {

        var hero = $('.hero'),
            hdr = $('.navbar'),
            triggerHeight = hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            var loc = $WIN.scrollTop();

            if (loc > 50) {
                hdr.addClass('scrolled');
            } else {
                hdr.removeClass('scrolled');
            }

        });

    };


    /* Mobile Menu
     * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {

        var toggleButton = $('.hamburger'),
            nav = $('.nav-menu');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('active');
            nav.toggleClass('active');
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.removeClass('active');
                nav.removeClass('active');
            }
        });

    };

    /*
     * NOTE: ssMasonryFolio is commented out in ssInit() as no .masonry elements are found. Remove if not used.
     */
    // var ssMasonryFolio = function () {
    //     var containerBricks = $('.masonry');
    //     containerBricks.imagesLoaded(function () {
    //         containerBricks.masonry({ itemSelector: '.masonry__brick', resize: true });
    //     });
    // };


    /*
     * NOTE: ssPhotoswipe is commented out in ssInit() as no .item-folio elements are found. Remove if not used.
     */
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            // bind click event
            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    // initialize PhotoSwipe
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });
    // var ssPhotoswipe = function() { ... }; // Moved content inside ssInit for clarity if needed.


    /*
     * NOTE: ssSlickSlider is commented out in ssInit() as no .testimonials__slider elements are found. Remove if not used.
     * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.testimonials__slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: "<div class=\'slick-prev\'><i class=\'im im-arrow-left\' aria-hidden=\'true\'></i></div>",
            nextArrow: "<div class=\'slick-next\'><i class=\'im im-arrow-right\' aria-hidden=\'true\'></i></div>",       
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    // }; // ssSlickSlider is commented out in ssInit()


    /*
     * ------------------------------------------------------ */
    var ssWaypoints = function() {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav li a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });        
    };

    /* NOTE: ssWaypoints is commented out in ssInit() as it conflicts with IntersectionObserver. Remove if not used. */

   /* Stat Counter
    * ------------------------------------------------------ */
    var ssStatCount = function() {

        var statSection = $(".s-stats"),
        stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    // }; // ssStatCount is commented out in ssInit()


    /* NOTE: ssSmoothScroll is commented out in ssInit() as native smooth scroll is preferred. Remove if not used. */
    // var ssSmoothScroll = function() { ... };


    /* NOTE: ssPlaceholder is commented out in ssInit() as modern browsers handle placeholders natively. Remove if not used. */
    // var ssPlaceholder = function() { $('input, textarea, select').placeholder(); };


    /* NOTE: ssAlertBoxes is commented out in ssInit() as no .alert-box elements are found. Remove if not used. */
    // var ssAlertBoxes = function() { ... };


    /* Contact Form
     * ------------------------------------------------------ */
    var ssContactForm = function() {

        /* local validation */
	    $('#contactForm').validate({
        
            /* submit via ajax */
            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
    
                $.ajax({
    
                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(msg) {
    
                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
    
                    }
    
                });
            }
    
        });
    };

    /* NOTE: ssReveal is commented out in ssInit() as it's replaced by IntersectionObserver in script.js. Remove if not used. */
    // var ssReveal = function() { ... };


    /* NOTE: ssBackToTop is commented out in ssInit() as it's replaced by scroll-to-top in script.js. Remove if not used. */
    // var ssBackToTop = function() { ... };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssContactForm();
    })();


})(jQuery);