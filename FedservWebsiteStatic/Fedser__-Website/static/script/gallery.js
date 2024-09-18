$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

    // $('.gallery-row').masonry({
    //    // itemSelector: '.grid-item',
    //     columnWidth: '.grid-item',
    //     percentPosition: true
    // });

});

// init Masonry
var $grid = $('.gallery-row').masonry({
    // options...
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
});