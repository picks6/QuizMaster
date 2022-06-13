import React, { useState, useEffect } from "react";
import { Modal, Header, Button } from "semantic-ui-react";
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";

import { idbPromise } from '../../utils/helpers';
import Auth from "../../utils/auth";
import { useLocation } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_PERMISSIONS } from '../../utils/actions';
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
  const [message, setMessage] = useState("");
  // const [open, setOpen] = React.useState(false);
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [updateUser, {}] = useMutation(UPDATE_USER);
  
  const getCart = async () => {
    const cart = await idbPromise('cart', 'get');
    console.log('cart:', cart);
    setCart(cart[0]);
  };
  useEffect(() => {

    if (!cart.length) {
      getCart();
    }
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      const addPermission = async () => {
        try {
          const cart = await idbPromise('cart', 'get');
          console.log('cart:', cart[0]._id);
          const { data } = await updateUser({ variables: { permission: cart[0]._id}});
          const updatedUser = data.updateUser
          // console.log('updateduser:', updatedUser);
          if (updatedUser.permissions.includes(cart[0]._id)) {
            const newCart = await idbPromise('cart', 'delete', cart[0]);
            console.log('success:', newCart);
          }
        } catch (error) {
          console.log(error);
        }
      }
      addPermission();
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  // const toggleCart = () => dispatch({ type: TOGGLE_CART });

  // const calculateTotal = () => {
  //   let sum = 0;
  //   state.cart.forEach((item) => {
  //     sum += item.price * item.purchaseQuantity;
  //   });
  //   return sum.toFixed(2);
  // };

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

  // if (!state.cartOpen) {
  //   return (
  //     <div className="cart-closed" onClick={toggleCart}>
  //       <span role="img" aria-label="trash">
  //         🛒
  //       </span>
  //     </div>
  //   );
  // };
  // console.log("user:", Auth.getUser());
  
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  return message ? (<Message message={message} />) : (
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

    // message ? (<Message message={message} />) : (
    //   <Modal 
    //     onOpen={()=>setOpen(true)} 
    //     onClose={()=>setOpen(false)} 
    //     open={open} 
    //     trigger={
    //       <Button animated>
    //         <Button.Content visible>Buy</Button.Content>
    //         <Button.Content hidden>Price</Button.Content>
    //       </Button>
    //     } 
    //   >
    //     <Modal.Header>Checkout: 🛒</Modal.Header>
    //     <Modal.Content>
    //       <Modal.Description>
    //         <Header>Deck: {deck.title}</Header>
    //         <p>By: {deck.creator.username}</p>
    //         <p>Categories: {deck.categories.map((category) => `${category.category} `)}</p>
    //         {/* <p>Price: {deck.price}</p> */}
    //       </Modal.Description>
    //     </Modal.Content>
    //     <Modal.Actions>
    //       <Button onClick={submitCheckout}>
    //         Checkout
    //       </Button>
    //     </Modal.Actions>
    //   </Modal>
    // )
  )
};
export default Cart;