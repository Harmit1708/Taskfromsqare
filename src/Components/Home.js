import React, { useContext, useState } from "react";
import { productContext } from "../App";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
function Home() {
  let context = useContext(productContext);

  let [another, setAnother] = useState();

  let handlePlus = (e) => {
    let index = context.products.findIndex((x) => x.name === e.name);
    let result = (context.products[index].q += 1);
    setAnother(result);
  };

  let handleMinus = (e) => {
    let index = context.products.findIndex((x) => x.name === e.name);
    let result = (context.products[index].q -= 1);
    if (result < 1) {
      alert("Minimum Qty Is 1");
      context.products[index].q = 1;
    }
    setAnother(result);
  };

  return (
    <>
      <h3 className="text-center mt-3">Products</h3>
      {context.loader ? (
        <>
          <p className="text-center mt-5">Loading...</p>
        </>
      ) : (
        <>
          <div className="grid container">
            {context.products.map((e, i) => {
              console.log(e);
              return (
                <>
                  <div
                    key={i}
                    className="container mt-5 mb-3 text-center  product"
                    style={{
                      backgroundColor: "white",
                      height: "600px",
                      width: "300px",
                    }}
                  >
                    <img
                      className="mt-5"
                      src={e.image}
                      alt="pic"
                      style={{ height: "250px", width: "250px" }}
                    />
                    <p className="fw-bold ml-3" style={{ height: "50px" }}>
                      {e.name}
                    </p>
                    <p className="pt-3">&#36;{e.price}</p>
                    <div>
                      <button
                        id="minus"
                        className="btn minus-btn shadow-none  m-2 "
                        onClick={() => handleMinus(e)}
                      >
                        <RemoveIcon />
                      </button>
                      Qty:{e.q}
                      <button
                        className="btn plus-btn shadow-none  m-2"
                        onClick={() => handlePlus(e)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            {e.description}
                          </Tooltip>
                        }
                      >
                        <Button variant="secondary">Description</Button>
                      </OverlayTrigger>
                    ))}
                    <br></br>
                    <button
                      className="btn btn-outline-success mt-2"
                      onClick={async () => {
                         debugger
                        let values = {
                          product_id: e.id,
                          description: e.name,
                          image: e.image,
                          price: e.price,
                          weight_in_grams: e.weight_in_grams,
                          qty: e.q
                        };
                        let res = await axios.post(
                          "https://taskno-1.herokuapp.com/users/cart/item",
                          values
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
