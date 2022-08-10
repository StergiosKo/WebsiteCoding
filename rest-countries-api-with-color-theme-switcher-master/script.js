
function toggleLightDarkMode(){
    var body = document.querySelector('body');
    if (body.getAttribute('data-theme') == 'default'){
        body.removeAttribute('data-theme');
        body.setAttribute('data-theme', 'light')
    }
    else{
        body.removeAttribute('data-theme');
        body.setAttribute('data-theme', 'default')
    }
}
