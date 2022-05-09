import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {productContext} from '../App'
function Cart() {

  let context = useContext(productContext)
  let navigate = useNavigate();

  let cartPrice = 0;
  let cartData = async () => {
    let res = await axios.get("https://taskno-1.herokuapp.com/users/cart/items");
    context.setCart(res.data.items);
  };

  let handleDelete = async (e) => {
    let del = await axios.delete(
      "https://taskno-1.herokuapp.com/users/cart/item/delete/" + e._id
    );
    cartData();
  };

  useEffect(() => {
    cartData();
  }, []);

  return (
    <>
      <h3 className="text-center mt-5">Cart</h3>
      <div
        className="container mt-5 text-center grid"
        style={{ justifyItems: "center" }}
      >
        {context.cart.map((e, i) => {
          cartPrice = cartPrice + Number(e.price * e.qty);
          sessionStorage.setItem('price',cartPrice)
          return (
            <>
              <div
                className="text-center"
                style={{ backgroundColor: "white", width: "300px" }}
                key={i}
              >
                <img
                  className="mt-5"
                  src={e.image}
                  alt={e.name}
                  style={{ height: "250px", width: "250px" }}
                />
                <p className="mt-2">Id : {e.product_id}</p>
                <p>Name : {e.description}</p>
                <p>Qty : {e.qty}</p>
                <p>Price : &#36;{e.price}</p>
                <button
                  className="btn btn-danger mb-2"
                  onClick={() => handleDelete(e)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div className="text-center mt-5">
      <div className="fw-bold">Total Amount : &#36;{cartPrice}</div><br></br>
        <button className="btn btn-danger">Remove All Item</button>
        <br></br>
        <button
          className="btn mt-2"
          style={{ backgroundColor: "yellow", color: "black" }}
          onClick={() => navigate("/checkout")}
        >
          Check Out
        </button>
      </div>
    </>
  );
}

export default Cart;
