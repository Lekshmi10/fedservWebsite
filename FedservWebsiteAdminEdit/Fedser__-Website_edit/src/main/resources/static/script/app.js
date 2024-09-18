function templateNav() {
    var hanburgerBtn = document.getElementById("navigation-widget");
    if (hanburgerBtn.classList.contains('show')) {
        hanburgerBtn.classList.remove('show');
    } else {
        hanburgerBtn.classList.add('show');
    }
}
function navCLose() {
    var hanburgerBtn = document.getElementById("navigation-widget");
    if (hanburgerBtn.classList.contains('show')) {
        hanburgerBtn.classList.remove('show');
    } else {
        hanburgerBtn.classList.add('show');
    }
}