document.ready

$(document).ready(function () {


    /* For the sticky navigation */
    const waypoint = new Waypoint({
        element: document.querySelector('.js--section-features'),
        handler: direction => {
            if (direction == 'down') {
                document.querySelector('nav').classList.add('sticky');
            } else {
                document.querySelector('nav').classList.remove('sticky');
            }
        },
        offset: '60px;'
    });

    // $('.js--section-features').waypoint(function(direction) {
    //     if (direction == "down") {
    //         $('nav').addClass('sticky');
    //     } else {
    //         $('nav').removeClass('sticky');
    //     }
    // }, /*{
    //   offset: '60px;'
    // }*/);


    /* Scroll on buttons */
    // document.querySelector('.js--scroll-to-plans').addEventListener('click', (e) => {
    //     console.log(e);
    //     const element = document.querySelector('.js--section-plans');
    //     element.scrollIntoView({ block: "center", behaviour: "smooth" });
    // });

    $('.js--scroll-to-plans').click(function () {
        var html = $('html, body');
        html.animate({scrollTop: $('.js--section-plans').offset().top}, 1000);
    });

    $('.js--scroll-to-start').click(function () {
        $('html, body').animate({scrollTop: $('.js--section-features').offset().top}, 1000);
    });


    /* Navigation scroll */
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });


    /* Animations on scroll */

    new Waypoint({
        element: document.querySelector('.js--wp-1'),
        handler: () => document.querySelector('.js--wp-1').classList.add('animated', 'fadeIn'),
        offset: '50%'
    });

    new Waypoint({
        element: document.querySelector('.js--wp-2'),
        handler: () => document.querySelector('.js--wp-2').classList.add('animated', 'fadeInUp'),
        offset: '50%'
    });

    new Waypoint({
        element: document.querySelector('.js--wp-3'),
        handler: () => document.querySelector('.js--wp-3').classList.add('animated', 'fadeIn'),
        offset: '50%'
    });

    new Waypoint({
        element: document.querySelector('.js--wp-4'),
        handler: () => document.querySelector('.js--wp-4').classList.add('animated', 'pulse'),
        offset: '50%'
    });

    // $('.js--wp-1').waypoint(function(direction) {
    //     $('.js--wp-1').addClass('animated fadeIn');
    // }, {
    //     offset: '50%'
    // });
    //
    // $('.js--wp-2').waypoint(function(direction) {
    //     $('.js--wp-2').addClass('animated fadeInUp');
    // }, {
    //     offset: '50%'
    // });
    //
    // $('.js--wp-3').waypoint(function(direction) {
    //     $('.js--wp-3').addClass('animated fadeIn');
    // }, {
    //     offset: '50%'
    // });
    //
    // $('.js--wp-4').waypoint(function(direction) {
    //     $('.js--wp-4').addClass('animated pulse');
    // }, {
    //     offset: '50%'
    // });


    /* Mobile navigation */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');

        nav.slideToggle(200);

        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });
});