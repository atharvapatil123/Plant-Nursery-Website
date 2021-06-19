window.onload=function(){

    var navElements= document.querySelectorAll('.navi');
    for(let i=0;i<navElements.length;i++){
        navElements[i].addEventListener('click',
        changeActivePosition(navElements[i]))
        // console.log("Innnnn")
    }
    
    function changeActivePosition(activeItem){
        for(let i=0;i<navElements.length;i++){
            console.log(navElements[i].classList)
            navElements[i].classList.remove('active');
        }
        // console.log("In ",activeItem);
        activeItem.classList.add('active');
    }
}