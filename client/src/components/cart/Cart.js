import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";

import { idbPromise } from '../../utils/helpers';
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, REMOVE_FROM_CART } from '../../utils/actions';
// import "./ProductDisplay.css";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const ProductDisplay = ({submitCheckout}) => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$0.00</h5>
//       </div>
//     </div>
    
//     <button onClick={submitCheckout}>
//       Checkout
//     </button>

//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

const Cart = () => {
  // const [message, setMessage] = useState("");
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)

  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  //   }

  //   if (!state.cart.length) {
  //     getCart();
  //   }
  // }, [state.cart.length, dispatch]);

  const toggleCart = () => dispatch({ type: TOGGLE_CART });
  const calculateTotal = () => {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  const submitCheckout = async () => {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    await getCheckout({
      variables: { products: productIds },
    });
    console.log('test:', data);
  };

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  };

  // return message ? (
  //   <Message message={message} />
  // ) : (
  //   <ProductDisplay submitCheckout={submitCheckout} />
  // );
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$0.00</h5>
        </div>
      </div>
      
      <button onClick={submitCheckout}>
        Checkout
      </button>
    
    </section>
  )
};
export default Cart;