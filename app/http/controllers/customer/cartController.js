const cartController = () => {
  return {
    index(req, res) {
      res.render("customer/cart");
    },
    update(req, res) {
      // let cart = {
      // items: {
      //     pizzaid: {item: pizzaObject, qty: 0},
      // },
      // totalQty: 0,
      // totalPrice:
      // }

      // If there is no cart session
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        }
      }
      let cart = req.session.cart

      // Item is not in cart
      if(!cart.items[req.body._id]){
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + +req.body.price
      }else{

        // If Item is already in cart
        cart.items[req.body._id].qty =  cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + +req.body.price
      }

      return res.json({totalQty: cart.totalQty})

      
    },
  };
};

module.exports = cartController;
