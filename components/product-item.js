// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(obj) {
    super();
    var myStorage = window.localStorage;
    var count = document.getElementById('cart-count');
    let cart = JSON.parse(myStorage.getItem('procart'));

    this.attachShadow({mode: 'open'});

    const newli = document.createElement('li');
    newli.setAttribute("class", "product");

    const newimg = newli.appendChild(document.createElement('img'));
    newimg.src = obj.image;
    newimg.alt = obj.title;
    newimg.width = 200;

    const newp = newli.appendChild(document.createElement('p'));
    newp.setAttribute("class", "title");
    newp.textContent = obj.title;

    const newp2 = newli.appendChild(document.createElement('p'));
    newp2.setAttribute("class", "price");
    newp2.textContent = "$" + obj.price;

    const newbtn = newli.appendChild(document.createElement('button'));
    newbtn.setAttribute("onclick", "alert('Added to Cart!')");

    if (cart.includes(obj.id)) {  
      newbtn.textContent = "Remove from Cart";
    }
    else {
      newbtn.textContent = "Add to Cart";
    }

    newbtn.onclick = function () {
      if (newbtn.textContent == "Add to Cart") {
        cart = JSON.parse(myStorage.getItem('procart'));
        count.textContent = parseInt(count.textContent) + 1;
        newbtn.textContent = "Remove from Cart"
        cart.push(obj.id);
        myStorage.setItem("procart", JSON.stringify(cart));
        alert('Added to Cart!');
      }
      else {
        cart = JSON.parse(myStorage.getItem('procart'));
        count.textContent = parseInt(count.textContent) - 1;
        newbtn.textContent = "Add to Cart";
        cart.splice(cart.indexOf(obj.id), 1);
        myStorage.setItem("procart", JSON.stringify(cart));
      }
    }

    const style = document.createElement('style');

    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`

    this.shadowRoot.append(style,newli);
  }

}

customElements.define('product-item', ProductItem);