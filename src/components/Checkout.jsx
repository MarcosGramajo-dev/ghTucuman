import React, { useEffect, useState  } from "react";
import classnames from 'classnames'
import { Context } from "./ContextProvider";
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios'
import { Typography } from "@material-tailwind/react";


const Checkout = ({ onClick }) => {
  const { id } = useParams();
  const navigate = useNavigate ();

  const [isVisible, setIsVisible] = React.useState(true);
  const { preferenceId, isLoading: disabled, orderData, setOrderData } = React.useContext(Context);
  const shoppingCartClass = classnames('shopping-cart dark mb-10', {
    'shopping-cart--hidden': !isVisible,
  })
  const [data, setData] = useState([]);

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId])

  const updatePrice = (event) => {
    const quantity = event.target.value;
    const amount = parseInt(orderData.price) * parseInt(quantity);
    setOrderData({ ...orderData, quantity, amount });
  }

  const getParticipant = async ( id ) => {
        try {
            const response = await axios.get(`http://localhost:8080/participants?id=${id}`);
            setData(response.data.participant);
            window.localStorage.setItem('participant', JSON.stringify(response.data.participant))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  useEffect(() => {
      getParticipant(id);
  }, []);

  useEffect(() => {
    console.log(data);
    setOrderData({...orderData, description: `${data.name} ${data.lastName}`, id: data.id})
    window.localStorage.setItem('orderData', JSON.stringify(orderData))
  }, [data]);
  
  return (
    <section className={shoppingCartClass}>
      <div className="container" id="container">
        <div className="block-heading">
          <h1 className="text-3xl">¡Vota Ya!</h1>
        </div>
        <div>
          <div className="bg-white">
            <div className="">
              <img
                //className="img-fluid mx-auto d-block image"
                className="p-5"
                alt="Image of a product"
                src={data.photo ? data.photo : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'}
              />
            </div>
            <div className="text-center">
              <Typography
                id="product-description"
                variant="h3"
                color="black"
                className="font-medium"
            >
                {data.name} {data.lastName}
            </Typography>
            </div>
            <div className="p-3 px-5">
              <label htmlFor="quantity">
                <b>Cantidad de votos</b>
              </label>
              <input
                onChange={updatePrice}
                type="number"
                id="quantity"
                value={orderData.quantity}
                min="1"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  <span className="price" id="cart-total">${orderData.amount}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => {
                    onClick();
                    navigate('/payment');
                  }}
                  id="checkout-btn"
                  disabled={disabled}
                >
                  Votar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
