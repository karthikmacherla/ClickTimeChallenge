$(document).ready(function() {
  //render all items added to cart and initial total quantity + price
	$("#purchased_items").ready(function() {
    let count = 0;
    let totalPrice = 0;
    var purchased_items = JSON.parse(localStorage.getItem("mycart"));
    for (var key in purchased_items) {
      if (purchased_items.hasOwnProperty(key) && purchased_items[key].quantity > 0) {
        var elem = "<tr><td><input type=\"number\" min=\"1\" value=\""
          + purchased_items[key].quantity + "\"" 
          + "class=\"quant subtitle has-text-centered\" style=\"width: 3em\"> </td><td><h1 class=\"subtitle\">" 
          + key + "</h1></td><td> <p>$" 
          + purchased_items[key].price * purchased_items[key].quantity + "</p></td>"
          + "<td><button class=\"button is-danger\">Remove</button></td></tr>";
        $(elem).appendTo($("#purchased_items"));
      }
    }
    getDiscountsAndRenderTotals(purchased_items);
  });

  $("tbody").on('focusout keypress', 'input', function(e) {
    let val = $(this).val();
    if (val < 0) {
      $(this).val(0);
      val = 0;
    } else if (val == '') {
      val = 0;
    }
    let parent = $(this).parent().parent(); //now at the row;
    let name = parent.find("h1").html();
    let price = parent.find("p");

    let data = JSON.parse(localStorage.getItem("mycart"));
    let oldQuantity = data[name].quantity;
    data[name].quantity = val;
    localStorage.setItem("mycart", JSON.stringify(data));

    getDiscountsAndRenderTotals(data);
  });

  $("tbody").on('click', 'button', function() {
    let parent = $(this).parent().parent(); //now at the row;
    let name = parent.find("h1").html();
    let price = parent.find("p");

    let data = JSON.parse(localStorage.getItem("mycart"));
    data[name].quantity = 0;

    localStorage.setItem("mycart", JSON.stringify(data));
    getDiscountsAndRenderTotals(data);
    parent.remove();
  })
})

var getDiscountsAndRenderTotals = function (purchased_items) {
  var res = calculateDiscounts(purchased_items);
    $("#total_quantity").html(res.total_quantity);
    $('#quantity').html(res.total_quantity)
    $("#total_price").html(res.true_price);
    $('#cost').html(res.true_price);
    $('#youpay').html(res.discount);
}

var calculateDiscounts = function (purchased_items) {
  let quantity = 0;
  let dvd_discount = 1;
  let blu_ray_discount = 1;
  let raw_price = 0;
  let your_price = 0;

  if (purchased_items["Star Wars Episode IV DVD"] != null 
    && purchased_items["Star Wars Episode IV DVD"].quantity > 0 
    && purchased_items["Star Wars Episode V DVD"] != null 
    && purchased_items["Star Wars Episode V DVD"].quantity > 0 
    && purchased_items["Star Wars Episode VI DVD"] != null 
    && purchased_items["Star Wars Episode VI DVD"].quantity > 0 ) {
    dvd_discount = 0.9;
  }
  if (purchased_items["Star Wars Episode IV Blu-Ray"] != null 
    && purchased_items["Star Wars Episode IV Blu-Ray"].quantity > 0 
    && purchased_items["Star Wars Episode V Blu-Ray"] != null 
    && purchased_items["Star Wars Episode V Blu-Ray"].quantity > 0 
    && purchased_items["Star Wars Episode VI Blu-Ray"] != null 
    && purchased_items["Star Wars Episode VI Blu-Ray"].quantity > 0 ) {
    blu_ray_discount = 0.85;
  }

  for (var key in purchased_items) {
    if (purchased_items.hasOwnProperty(key)) {
      quantity += parseInt(purchased_items[key].quantity);
      raw_price += purchased_items[key].price * purchased_items[key].quantity;
      if (key.includes("DVD")) {
        your_price += parseFloat(purchased_items[key].price) 
          * parseInt(purchased_items[key].quantity) * dvd_discount;
      } else {
        your_price += parseFloat(purchased_items[key].price) 
        * parseInt(purchased_items[key].quantity) * blu_ray_discount;
      }
    }
  }
  if (quantity >= 100) {
    your_price *= 0.95;
  }

  return { total_quantity: quantity, true_price: raw_price, discount: your_price};
}
