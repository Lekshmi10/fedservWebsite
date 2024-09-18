var vid = document.getElementById("banner-video");
vid.playbackRate = 0.5;
$(document).ready(function () {
    $('.department-carosal').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        //prevArrow:"<button class='slide-nav-prev'><svg class='ionicon' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144'/></svg></button>",
        //nextArrow:"<button class='slide-nav'><svg width=\"15\" height=\"17\" viewBox=\"0 0 15 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.219671 0.21967C0.512564 -0.0732233 0.987438 -0.0732233 1.28033 0.21967L8.78033 7.71967C9.07322 8.01256 9.07322 8.48744 8.78033 8.78033L1.28033 16.2803C0.987437 16.5732 0.512563 16.5732 0.21967 16.2803C-0.0732233 15.9874 -0.0732233 15.5126 0.21967 15.2197L7.18934 8.25L0.219671 1.28033C-0.0732227 0.987437 -0.0732226 0.512563 0.219671 0.21967ZM6.21967 0.21967C6.51256 -0.0732233 6.98744 -0.0732233 7.28033 0.21967L14.7803 7.71967C15.0732 8.01256 15.0732 8.48744 14.7803 8.78033L7.28033 16.2803C6.98744 16.5732 6.51256 16.5732 6.21967 16.2803C5.92678 15.9874 5.92678 15.5126 6.21967 15.2197L13.1893 8.25L6.21967 1.28033C5.92678 0.987437 5.92678 0.512563 6.21967 0.21967Z\" fill=\"#FAFAFA\"/></svg></button>"
        responsive: [
            {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
            },
            {
            breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
            breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.career-carosal').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:"<button class='slide-nav-prev'><svg class='ionicon' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144'/></svg></button>",
        nextArrow:"<button class='slide-nav'><svg width=\"15\" height=\"17\" viewBox=\"0 0 15 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.219671 0.21967C0.512564 -0.0732233 0.987438 -0.0732233 1.28033 0.21967L8.78033 7.71967C9.07322 8.01256 9.07322 8.48744 8.78033 8.78033L1.28033 16.2803C0.987437 16.5732 0.512563 16.5732 0.21967 16.2803C-0.0732233 15.9874 -0.0732233 15.5126 0.21967 15.2197L7.18934 8.25L0.219671 1.28033C-0.0732227 0.987437 -0.0732226 0.512563 0.219671 0.21967ZM6.21967 0.21967C6.51256 -0.0732233 6.98744 -0.0732233 7.28033 0.21967L14.7803 7.71967C15.0732 8.01256 15.0732 8.48744 14.7803 8.78033L7.28033 16.2803C6.98744 16.5732 6.51256 16.5732 6.21967 16.2803C5.92678 15.9874 5.92678 15.5126 6.21967 15.2197L13.1893 8.25L6.21967 1.28033C5.92678 0.987437 5.92678 0.512563 6.21967 0.21967Z\" fill=\"#FAFAFA\"/></svg></button>"
    });

    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });
});