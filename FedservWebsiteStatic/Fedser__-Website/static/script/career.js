$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });
    if ($(window).width() < 681) {
        $('.offer-carosal').slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });
    }
    
});