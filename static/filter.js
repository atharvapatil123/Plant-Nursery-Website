var iti = document.querySelectorAll('.category-of-plants-filter');
var navElements= document.querySelectorAll('.navi');
var item = document.querySelectorAll('.item');
var original_item = item;
var price = document.querySelectorAll('#price');
var grid = document.getElementById('grid');
var a1=[],a2=[],a3=[];
var clicked=true;
var clicked2=true;
var clicked3=true;

window.onload=function(){
    var down = document.getElementById('triangle');
    var grid = document.getElementById('grid');
    var filter = document.getElementById('filter');
    var rating = document.querySelectorAll('#rating');
    var plate = document.getElementById('plate')
    var buttons = document.querySelectorAll('.button');

    down.addEventListener('click',()=>{
        open()
    })
    plate.addEventListener('click',()=>{
        open()
    })

    function open(){
        var d = document.getElementById('detail').open;
        if(d){
            down.style.transform = 'rotate(-45deg)';
            down.style.marginTop= '-6px';
            down.style.borderBottomColor = 'green';
            down.style.borderLeftColor = 'green';
            grid.style.marginTop='7%';
            filter.style.marginTop='7%';
        }
        else{
            down.style.transform = 'rotate(135deg)';
            down.style.marginTop= '52px';
            down.style.borderBottomColor = 'white';
            down.style.borderLeftColor = 'white';
            grid.style.marginTop='10%';
            filter.style.marginTop='10%';
        }
    }
    b1 = document.getElementById('for-price-filter-low-to-high');
    b1.addEventListener('click',function(){
        sortByPriceLowToHigh(b1);
    });
    
    async function sortByPriceLowToHigh(b1){
        // for(let i=0;i<item.length;i++){
            //     console.log(item[i])
            // }
            if(clicked2==false){
                clicked2=true;
                b2.style.backgroundColor='white';
                b2.style.color='black';
                for(let i=0;i<original_item.length;i++){
                    grid.appendChild(original_item[i]);
                    item[i].classList.remove(`${a2[i]}`);
                    item[i].classList.remove('true');
                }
            }
            
            if(clicked3==false){
                clicked3=true;
                b3.style.backgroundColor='white';
                b3.style.color='black';
                for(let i=0;i<original_item.length;i++){
                    grid.appendChild(original_item[i]);
                    item[i].classList.remove(`${a3[i]}`);
                    item[i].classList.remove('true');
                }
            }
            
            for(let i=0;i<item.length;i++){
                if(item[i].style.display!=="none"){
                    item[i].classList.add('true')
                }
            }
            console.log(item)
            if(clicked){
                clicked=false;
                b1.style.backgroundColor='green';
                b1.style.color='white';
                for(let i=0;i<price.length;i++){
                    // console.log("Hi")
                    a1[i]=parseInt(price[i].innerHTML);
                    item[i].classList.add(`${price[i].innerHTML}`);
                }
                console.log(item)
                a1.sort(function(a, b){return a-b});
                console.log(a1)
                
                for(let i=0;i<a1.length;i++){
                    for(let j=0;j<item.length;j++){
                        if(a1[i]==item[j].classList[6]){
                            if(item[j].classList.contains('true')){
                                item[j].style.display = 'block';
                                // console.log(item[j].classList);
                                item[j].classList.remove(`${a1[i]}`);
                                item[j].classList.remove('true');
                                grid.appendChild(item[j]);
                                await sleep(1);
                        }
                    }
                    else{
                        item[j].classList.remove(`${a1[i]}`);
                    }
                }  
            }
        }
        else{
            clicked=true;
            b1.style.backgroundColor='white';
            b1.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a1[i]}`);
                item[i].classList.remove('true');
                // await sleep(1000);
                // console.log(item[i].classList);
            }
        }
    }
    b2 = document.getElementById('for-price-filter-high-to-low');
    b2.addEventListener('click',function(){
        sortByPriceHighToLow(b2);
    });
    
    async function sortByPriceHighToLow(b2){

        if(clicked==false){
            clicked=true;
            b1.style.backgroundColor='white';
            b1.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a1[i]}`);
                item[i].classList.remove('true');
            }
        }
        if(clicked3==false){
            clicked3=true;
            b3.style.backgroundColor='white';
            b3.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a3[i]}`);
                item[i].classList.remove('true');
            }
        }
        for(let i=0;i<item.length;i++){
            if(item[i].style.display!=="none"){
                item[i].classList.add('true')
            }
        }
        if(clicked2){
            clicked2=false;
            b2.style.backgroundColor='green';
            b2.style.color='white';
            for(let i=0;i<price.length;i++){
                a2[i]=parseInt(price[i].innerHTML);
                item[i].classList.add(`${price[i].innerHTML}`);
            }
            a2.sort(function(a, b){return b-a});
            // for(let i=0;i<a2.length;i++){
            //     console.log(a2[i]);
            // }
            for(let i=0;i<a2.length;i++){
                for(let j=0;j<item.length;j++){
                    if(a2[i]==item[j].classList[6]){
                        item[j].style.display = 'block';
                        grid.appendChild(item[j]);
                        console.log(item[j].classList);
                        item[j].classList.remove(`${a2[i]}`);
                        item[j].classList.remove('true');
                        await sleep(1);
                    }
                    else{
                        item[j].classList.remove(`${a2[i]}`);
                    }
                }  
            }

        }
        else{
            clicked2=true;
            b2.style.backgroundColor='white';
            b2.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a2[i]}`);
                item[i].classList.remove('true');
            }
        }
    }
    b3=document.getElementById('for-rating-filter');
    b3.addEventListener('click',function(){
        sortByRating();
    })
    async function sortByRating(){
        if(clicked==false){
            clicked=true;
            b1.style.backgroundColor='white';
            b1.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a1[i]}`);
                item[i].classList.remove('true'); 
            }
        }
        if(clicked2==false){
            clicked2=true;
            b2.style.backgroundColor='white';
            b2.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a2[i]}`);
                item[i].classList.remove('true');            
            }
        }
        for(let i=0;i<item.length;i++){
            if(item[i].style.display!=="none"){
                item[i].classList.add('true')
            }
        }
        if(clicked3){
            clicked3=false;
            b3.style.backgroundColor='green';
            b3.style.color='white';
            for(let i=0;i<price.length;i++){
                a3[i]=parseFloat(rating[i].innerHTML).toFixed(1);
                item[i].classList.add(`${rating[i].innerHTML}`);
            }
            a3.sort(function(a, b){return b-a});
            for(let i=0;i<a3.length;i++){
                console.log(a3[i]);
            }
            for(let i=0;i<a3.length;i++){
                for(let j=0;j<item.length;j++){
                    if(a3[i]==item[j].classList[6]){
                        item[j].style.display = 'block';
                        grid.appendChild(item[j]);
                        // console.log(item[j].classList);
                        item[j].classList.remove(`${a3[i]}`);
                        item[j].classList.remove('true');
                        await sleep(1);
                    }
                    else{
                        item[j].classList.remove(`${a3[i]}`);
                    }
                }  
            }
        }
        else{
            clicked3=true;
            b3.style.backgroundColor='white';
            b3.style.color='black';
            for(let i=0;i<original_item.length;i++){
                grid.appendChild(original_item[i]);
                item[i].classList.remove(`${a3[i]}`);
                item[i].classList.remove('true');            }
        }
    }
    function numSortDesc(a, b) {
        return b - a;
    }

    for(let i=0;i<navElements.length;i++){
        navElements[i].addEventListener('click',
        changeActivePosition.bind(this,navElements[i]));
    }
    for(let i=0;i<iti.length;i++){
        iti[i].addEventListener('click',
        filterPosts.bind(this,iti[i]));
    }
    
    function filterPosts(e){
        changeActivePosition(e);
        for(let i=0;i<item.length;i++){
            if(item[i].classList.contains(e.attributes.id.value)){
                item[i].style.display="block";
            }else{
                item[i].style.display="none";
                // console.log(item[i].classList, e.attributes.id.value);
            }
            console.log(item[i]);
        }
    }
    
    function changeActivePosition(activeItem){
        for(let i=0;i<iti.length;i++){
            iti[i].classList.remove('active');
        }
        activeItem.classList.add('active');
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // for(let i=0;i<buttons.length;i++){
    //     buttons[i].addEventListener('mouseover',()=>{
    //         buttons[i].style.backgroundColor="rgb(176, 255, 176)";
    //     })
    //     buttons[i].addEventListener('mouseleave',()=>{
    //         buttons[i].style.backgroundColor="green";
    //         buttons[i].style.color="black";
    //     })
    // }
    // var h1 = document.querySelector('#add_to_cart_button');
    // var cart = document.querySelectorAll('#cart');
    // var select = document.querySelector('.select');
    // for(i of cart){
    //     i.addEventListener('click',(e)=>{
    //         var add = Number(h1.getAttribute('data-count')||0);
    //         h1.setAttribute('data-count',add+1);
    //         h1.classList.add('zero');
            
    //         for(let i=0;i<item.length;i++){
    //             if(item[i].classList.contains(e.attributes.classList.value)){
                    
    //             }
    //         }

    //         var parent = e.target.parentNode;
    //         var clone = parent.cloneNode(true);
    //         select.appendChild(clone);
    //         clone.lastElementChild.innerText = "Buy-now";
    //         if(clone){
    //             h1.onclick=()=>{
    //                 select.classList.toggle('display');
    //             }
    //         }

    //         var image = e.target.parentNode.querySelector('img');
    //         var span = e.target.parentNode.querySelector('span');
    //         var s_image = image.cloneNode(false);
    //         span.appendChild(s_image);
    //         span.appendChild.add('active');
    //         setTimeout(()=>{
    //             span.removeChild(s_image);
    //             span.classList.remove('active');
    //         }, 500);

    //     })
    // }
    
}

