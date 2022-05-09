import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Cart from './Components/Cart'
import axios from 'axios';
import CheckOut  from './Components/CheckOut';
export const productContext = React.createContext()
function App() {

  var [products, setProducts] = useState([]);
  var [cart, setCart] = useState([]);
  let [loader,setLoader] = useState();

  let getData = async () => {
    setLoader(true);
    let data = [];
    for (let i = 100; i <= 110; i++) {
      var res = await axios.get(
        "https://e-commerce-api-recruitment.herokuapp.com/product/" + i
      );
      res.data.product['q'] = 1;
      data.push(res.data.product);
    }
    setProducts(data);
    setLoader(false)
  };

  

  useEffect(() => {
    getData();
  }, []);


  return <div className='App'>
    <BrowserRouter>
      <productContext.Provider value={{products,setProducts,loader,setLoader,cart,setCart}}>
      <Header></Header>
        <Routes> 
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
        </Routes>
      </productContext.Provider>
    </BrowserRouter>
  </div>
}

export default App;