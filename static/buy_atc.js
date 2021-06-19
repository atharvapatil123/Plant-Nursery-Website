window.onload=function(){
    var cart = document.querySelectorAll('#cart');
    var product_name = document.getElementById('product_name');
    var names = document.querySelectorAll('.name');
    product_name.innerHTML="hello"
    for (e of cart){
        console.log(e.classList);
        e.addEventListener('click',()=>{
            console.log(e.classList);
            for(i of names){
                console.log(i.attributes.id.value)
                if(e.classList.contains(i.attributes.id.value)){
                    console.log(i);
                    console.log(i.innerHTML);
                    product_name.innerHTML = i.innerHTML;
                    console.log(typeof(product_name.innerHTML));
                }
            }
        })
    }
}