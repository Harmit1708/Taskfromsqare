import Context from "@mui/base/TabsUnstyled/TabsContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../App";
function CheckOut() {
  let context = useContext(productContext);

  let finalpay;
  let [postalCode, setPostalCode] = useState();
  let [distance, setDistance] = useState();
  let [weight, setWeight] = useState();
  let [shippingCharge, setShippingCharge] = useState();

  let [totalAmount,setTotalAmount] = useState(sessionStorage.getItem('price'))

  let getPostal = async () => {
    let res = await axios.get(
      'http://e-commerce-api-recruitment.herokuapp.com/warehouse/distance?postal_code='+
        postalCode
    );
    setDistance(parseInt(res.data.distance_in_kilometers));
    for (let i = 0; i < context.cart.length; i++) {
      let result = context.cart[i].weight_in_grams / 1000;
      setWeight(result);
    }
  };

  useEffect(() => {
    getPostal();
  });



  return (
    <div className="text-center">
      <label>Enter PostalCode</label>
      <br></br>
      <input
        type="number"
        onChange={(e) => setPostalCode(e.target.value)}
        value={postalCode}
        placeholder="Enter Postal Code"
      ></input>
      <br></br>
      Notes:Postal Code valid ones are 465535 to 465545
      <br></br>
      <p className="fw-bold">Distance from warehouse : {distance}Km</p>
      {weight < 2 ? (
        distance < 5 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 12}</p>
          </>
        ) : distance > 5 && distance < 20 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 15}</p>
          </>
        ) : distance > 20 && distance < 50 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 20}</p>
            
          </>
        ) : distance > 50 && distance <= 500 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 50}</p>
          </>
        ) : distance > 500 && distance < 800 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 100}</p>
          </>
        ) : distance > 800 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 220}</p>
          </>
        ) : (
          <></>
        )
      ) : weight > 2 && weight < 5 ? (
        distance < 5 ? (
          <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 14}</p>
        ) : distance > 5 && distance < 20 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 18}</p>
          </>
        ) : distance > 20 && distance < 50 ? (
          <>
            {" "}
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 24}</p>
          </>
        ) : distance > 50 && distance < 500 ? (
          <>
            {" "}
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 55}</p>
          </>
        ) : distance > 500 && distance < 800 ? (
          <>
            {" "}
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 110}</p>
          </>
        ) : distance > 800 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 250}</p>
          </>
        ) : (
          <></>
        )
      ) : weight > 5 && weight < 20 ? (
        distance < 5 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 16}</p>
          </>
        ) : distance > 5 && distance < 20 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 25}</p>
          </>
        ) : distance > 20 && distance < 50 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 30}</p>
          </>
        ) : distance > 50 && distance < 500 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 80}</p>
          </>
        ) : distance > 500 && distance < 800 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 130}</p>
          </>
        ) : distance > 800 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 270}</p>
          </>
        ) : (
          <></>
        )
      ) : weight > 20 ? (
        distance < 5 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 21}</p>
          </>
        ) : distance > 5 && distance < 20 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 35}</p>
          </>
        ) : distance > 20 && distance < 50 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 50}</p>
          </>
        ) : distance > 50 && distance < 500 ? (
          <>
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 90}</p>
          </>
        ) : distance > 500 && distance < 800 ? (
          <>
            <p className="fw-bold">Shipping Charge : &#36;{shippingCharge = 150}</p>
          </>
        ) : distance > 800 ? (
          <>
            {" "}
            <p className="fw-bold">Shipping Charge :  &#36;{shippingCharge = 300}</p>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    <p className="fw-bold" >Total Cart Amount : &#36;{totalAmount}</p>
    <p className="fw-bold">Final Pay : &#36;{finalpay = +totalAmount + +shippingCharge} </p>
    </div>
  );
}

export default CheckOut;
