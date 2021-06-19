var product_total_amount = document.getElementById('product_total_amount');
var total_cart_amt = document.getElementById('total_cart_amt');
var shipping_charge = document.getElementById('shipping_charge');
var total;
total_cart_amt.innerHTML = parseInt(product_total_amount.innerHTML) + parseInt(shipping_charge.innerHTML);
var decreasenumber = (incdec,itemprice) => {
    var itemprice = document.getElementById(itemprice);
    var itemval = document.getElementById(incdec);

    if(itemval.value<=0){
        itemval.value=0;
    }
    else{
        itemval.value = parseInt(itemval.value)-1;
        itemval.style.backgroundColor='white';
        itemval.style.color='black';
        if(itemval.value==1){
            product_total_amount.innerHTML = parseInt(itemprice.innerHTML);
        }
        else{
            product_total_amount.innerHTML = parseInt(product_total_amount.innerHTML) - parseInt(itemprice.innerHTML);
        }
        total_cart_amt.innerHTML = parseInt(product_total_amount.innerHTML) + parseInt(shipping_charge.innerHTML);
        total = total_cart_amt.innerHTML;
    }
}
var increasenumber = (incdec,itemprice) => {
    var itemval = document.getElementById(incdec);
    var itemprice = document.getElementById(itemprice);

    if(itemval.value>=5){
        itemval.value=5;
        alert("Maximum 5 items allowed!")
        itemval.style.backgroundColor='red';
        itemval.style.color='white';
    }
    else{
        itemval.value = parseInt(itemval.value)+1;
        if(itemval.value==1){
            // itemprice.innerHTML = 2*parseInt(itemprice.innerHTML);
            product_total_amount.innerHTML = parseInt(itemprice.innerHTML);
        }
        else{
            product_total_amount.innerHTML = parseInt(product_total_amount.innerHTML) + parseInt(itemprice.innerHTML);
        }
        total_cart_amt.innerHTML = parseInt(product_total_amount.innerHTML) + parseInt(shipping_charge.innerHTML);
        total = total_cart_amt.innerHTML;
    }
}

var discount_code = () =>{
    var discount_code1 = document.getElementById('discount_code1');
    var discount_apply = document.getElementById('discount_apply');
    console.log(discount_code1.innerHTML)
    if(product_total_amount.innerHTML==0){
        alert("Cart is empty")
    }
    else{
        if(discount_code1.value === "new"){
            if(total_cart_amt.innerHTML == total ){
                total_cart_amt.innerHTML -= 50;
                alert("Discount of ₹50 applied!!")
                discount_apply.style.display = 'block';
                console.log(total_cart_amt.innerHTML," ",total)
            }
            else{
                alert("Discount code already applied !");
            }
        }
        else{
            // if()
            total_cart_amt.innerHTML = total;
            alert("No such discount code !")
            discount_apply.style.display = 'none';
        }
    }
}

