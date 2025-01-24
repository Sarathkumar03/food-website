const btncart=document.querySelector('.cart-icon')
const cart=document.querySelector('.cart')
const btnclose=document.querySelector('#cart-close')
//for opening a cart 
btncart.addEventListener('click',()=>
{
    cart.classList.add('cart-active')
})
//for closing a cart
btnclose.addEventListener('click',()=>
    {
        cart.classList.remove('cart-active')
    })
document.addEventListener('DOMContentLoaded',loadFood);
function loadFood(){
    loadContent();
}
function loadContent()
{
    //remove food items from cart
    let btnremove=document.querySelectorAll('.cart-remove')
    btnremove.forEach((btn)=>{
       btn.addEventListener('click',removeItem)
    }
    );
    //product item change event
    let QtyElement=document.querySelectorAll('.cart-quantity')
    QtyElement.forEach((input)=>
    {
        input.addEventListener('change',ChangeQty)
    }
    );
    //product cart
    let cartbtns=document.querySelectorAll('.add');
    cartbtns.forEach((btn)=>{
        btn.addEventListener('click',addCart)
    })
    updateTotal()
}
//remove item
function removeItem()
{
    if(confirm('Are you sure to remove'))
    {
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML
        itemList=itemList.filter(el=>el.title !=title)
        this.parentElement.remove();
        loadContent()

    }
    
}
//change quantity
function ChangeQty()
{
    if(isNaN(this.value) || this.value<1)
    {
        this.value=1;
    }
    loadContent()
}

let itemList=[];

//add qunatity
function addCart()
{
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML
    let price=food.querySelector('.food-price').innerHTML
    let imgsrc=food.querySelector('.image-resize').src
    let newProduct={title,price,imgsrc}
    //check product already exist in cart
    if(itemList.find(el=>el.title==newProduct.title))
    {
        alert("product already exist in cart")
        return;
    }
    else
    {
        itemList.push(newProduct)
    }

    let  newProductElement=createCartProduct(title,price,imgsrc)
    let element=document.createElement('div')
    element.innerHTML=newProductElement;
    let   cartBasket=document.querySelector('.cart-content')
    cartBasket.append(element)
    loadContent();
}

function createCartProduct(title,price,imgsrc)
{
    return `
                          <div class="cart-box">
                            <img src="${imgsrc}" >
                            <div class="detail-box">
                                <div class="cart-food-title">${title}</div>
                                <div class="price-box">
                                    <div class="cart-price">${price}</div>
                                    <div class="cart-amt">${price}</div>
                                </div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <ion-icon name="trash" class="cart-remove"></ion-icon>
                        </div>
                        `
        
}
function updateTotal()
{
  const cartitems=document.querySelectorAll('.cart-box')
  const totalvalue=document.querySelector('.total-price')
  let total=0;
  cartitems.forEach(product=>
  {
    let priceElement=product.querySelector('.cart-price')
    let price=parseFloat(priceElement.innerHTML.replace('Rs.',''))
    let qty=product.querySelector('.cart-quantity').value
    total+=(price*qty);
    product.querySelector('.cart-amt').innerHTML="Rs."+price*qty
  }
  )
  totalvalue.innerHTML="Rs."+total

  //add product in cart icon
  const cartcount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartcount.innerHTML=count
  if(count==0)
  {
    cartcount.style.display='none'
  }
  else
  {
    cartcount.style.display='block'
  }
}