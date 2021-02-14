// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  var myfetch = fetch('https://fakestoreapi.com/products');
  myfetch.then( function(response) {
    return response.json();
  }).then(function(json) {
    var data = json;
    var datalen = data.length;
    myStorage.setItem('datalen', datalen);

    for (let i = 0; i < datalen; i++) {
      myStorage.setItem(data[i].id, JSON.stringify(data[i]));
    }
    setup();
  })

});

var myStorage = window.localStorage;

if (!myStorage.getItem('procart')) {
  myStorage.setItem('procart', JSON.stringify([]));
}
else {
  var cart = JSON.parse(myStorage.getItem('procart'));
}

var count = document.getElementById('cart-count');
count.textContent = cart.length;

function setup () {
  for (let i = 1; i <= myStorage.getItem('datalen'); i++) {
    const prolist = document.getElementById('product-list');
    var obj = JSON.parse(myStorage.getItem(i));
    var a = new ProductItem(obj);
    a.setAttribute("item", JSON.parse(myStorage.getItem(i)))
    prolist.appendChild(a);
  }
}

