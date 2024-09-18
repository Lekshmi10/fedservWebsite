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

function dept(id) {
    //console.log("id",id)
    let openDetails= document.getElementById("openDetails");
    switch (id) {
        case "IT":
            localStorage.setItem('DEPT','IT');
            break;
        case "OPERATIONS":
            localStorage.setItem('DEPT','OPERATIONS');
            break;
        case "CONTACT_CENTER":
            localStorage.setItem('DEPT','CONTACT_CENTER');
            break;

    }

}