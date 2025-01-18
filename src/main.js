// adding more items to shop
let shop = document.getElementById('shop');

// An array for shop items


let basket = JSON.parse(localStorage.getItem("data")) || [];

// function to print cards automatically
let generateShop = ()=>{
    
 return (shop.innerHTML= shopItemsData.map((x)=>{
    let {id, name, price, desc, img} = x;
   let search =basket.find((x) => x.id === id) || []
    return `
 
    <div id=product-id-${id} class="item">
               <!-- NB the width will be changed to 200 if the percentage did not work -->
               <img width="220" src="${img}" alt="Picture of a bed">
               <div class="details">
                   <h3>${name}</h3>
                   <p>${desc}</p>
                   <div class="price-quantity">
                       <h2>$ ${price}</h2>
                       <div class="buttons">
   
                           <svg onclick="decrement(${id})" class="w-6 h-6 text-gray-800 dark:text-white icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                           </svg>
   
                           <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                             
                           <svg onclick="increment(${id})" class="w-6 h-6 text-gray-800 dark:text-white icon1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                           </svg>
                             
                       </div>
                   </div>
               </div>
   
           </div>
   
    `
 }).join(""));
}

generateShop();

// increment function
let increment = (id) =>{
    let seletedItem =id;

    let search = basket.find((x)=>x.id ===seletedItem.id);

    if(search === undefined) {
        basket.push({
            id: seletedItem.id,
            item: 1,
        });
        
    }
    
    else{
        search.item += 1;
    }
        
    // console.log(basket);
    update(seletedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
// decrement functio
let decrement = (id) =>{
    let seletedItem =id;

    let search = basket.find((x)=>x.id === seletedItem.id);
    if (search === undefined) return

    else if(search.item === 0) return;
        
    
    else{
        search.item -=1;
    }
    update(seletedItem.id);
    basket = basket.filter((x) => x.item !== 0 );
    // console.log(basket);
    

    localStorage.setItem("data", JSON.stringify(basket));
};
// update function
let update = (id) => {
    let search = basket.find((x) =>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// calculation function
let calculation= () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=(basket.map((x) => x.item).reduce((x,y) => x+y,0));
    
};

calculation();