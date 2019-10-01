$(document).ready(function() {
	//handle adding products
  var cart = {};
  if (localStorage.getItem("mycart") == null)
    localStorage.setItem("mycart", JSON.stringify(cart));

  $(".addToCart").on('click', function() {
    let id = $(this).attr('id');
    let cost = $(this).attr('price');
    let cartCurrent = JSON.parse(localStorage.getItem("mycart"));
    if (cartCurrent[id] == null) {
      cartCurrent[id] = {quantity: 1, price: cost};
    } else {
      cartCurrent[id].quantity++;
    };

    localStorage.setItem("mycart", JSON.stringify(cartCurrent));

    console.log(JSON.parse(localStorage.getItem("mycart")));
  });

  
});