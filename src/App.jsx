import React, { useState} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import InternalProvider from "./components/ContextProvider";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/Error";
import { SpinnerCircular } from 'spinners-react';
import background from '../img/background.jpg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Success from "./components/Success";
import Results from "./components/Results";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("TEST-d6c1b91f-14ff-4527-8596-577d7f3f98b3");

const App = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({ quantity: "1", price: "100", amount: 100, description: "", id: 0});
  
  const handleClick = () => {
    setIsLoading(true);
  
    axios.post("https://backghtucuman.netlify.app/.netlify/functions/server/create_preference", orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderSpinner = () => {
     if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular сolor='#009EE3' />
        </div>
      )
     }
  }

  return (
    <InternalProvider context={{ preferenceId, isLoading, orderData, setOrderData }}>
      <Router>
        <img src={background} alt="background" className="absolute z-[-1] h-full md:w-full bg-center"/>
        <Navbar />
        {renderSpinner()}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="checkout/:id" element={<Checkout onClick={handleClick} />} />
          <Route path="/feedback" element={<Success/>}/>
          <Route path="/results" element={<Results/>}/>
        </Routes>
        <Footer />
      </Router>
    </InternalProvider>
  );
};

export default App;

