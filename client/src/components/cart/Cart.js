import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card,  Header, Button } from "semantic-ui-react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";

import { idbPromise } from '../../utils/helpers';

import { useStoreContext } from "../../utils/GlobalState";
import { SET_PERMISSIONS } from "../../utils/actions";
import CartWrapper from "../ui/CartWrapper";
// import "./ProductDisplay.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [updateUser] = useMutation(UPDATE_USER);
  const [getUser] = useLazyQuery(QUERY_USER);

  const clearCart = async (cart) => {
    try {
      const newCart = await idbPromise('cart', 'delete', cart[0]);

      return newCart;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setState = async () => {
      const cart = await idbPromise('cart', 'get');
      setCart(cart);
    };
    setState();
  }, [cart]);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      const updatePermission = async () => {
        try {
          const cart = await idbPromise('cart', 'get');
          console.log(cart);
          const { data } = await updateUser({
            variables: { permission: cart[0]._id },
          });
          console.log(data);
          const updatedUser = data.updateUser;
          await dispatch({
            type: SET_PERMISSIONS,
            permissions: updatedUser.permissions,
          });
          clearCart(cart);
        } catch (error) {
          console.log(error);
        }
      };
      updatePermission(cart);
      setMessage("Order placed!.");
    }

    if (query.get("canceled")) {
      const getPermissions = async () => {
        try {
          const { data } = await getUser();
          await dispatch({
            type: SET_PERMISSIONS,
            permissions: data.user.permissions,
          });
          clearCart(cart);
        } catch (error) {
          console.log(error);
        }
      };
      getPermissions();
      setMessage("Order canceled.");
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

  const submitCheckout = async () => {
    const productIds = [];

    cart.forEach((item) => productIds.push(item._id));
    console.log("test:", cart);
    await getCheckout({
      variables: { products: productIds },
    });
  };

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
      <Button 
        // as={Link} to='/dashboard' 
        onClick={() => window.location.assign('/dashboard')}
        inverted color="purple">Return to Dashboard</Button>
    </section>
  );

  if (!cart.length) {
    return <div>Loading</div>;
  } else {
    return message ? (
      <Message message={message} />
    ) : (
      <CartWrapper>
        <Card>
          <Card.Content className="product">
            <Card.Header>Deck: {cart[0].title}</Card.Header>
          </Card.Content>
          <Card.Content className="description">
            <Header>
              Categories:{" "}
              {cart[0].categories.map((category) => `${category.category} `)}
            </Header>
            <p>By: {cart[0].creator.username}</p>
            <p>Price: {cart[0].price}</p>
            <p>Description:</p>
            <p>{cart[0].description}</p>
          </Card.Content>

          <Button color="blue" onClick={submitCheckout}>
            Checkout
          </Button>
        </Card>
      </CartWrapper>
    );
  }
};
export default Cart;
