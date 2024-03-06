import React, {useEffect, useState } from 'react'
import { Context } from "./ContextProvider";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Success = () => {

  const { id } = useParams();

  const [participant, setParticipant] = useState(JSON.parse(window.localStorage.getItem('participant')))
  const [orderData, setOderData] = useState(JSON.parse(window.localStorage.getItem('orderData')))
  const [resData, setResData] = useState('')

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const payment_id = urlParams.get('payment_id');
  const merchant_order_id = urlParams.get('merchant_order_id')

  const getResponse = async (  ) => {
      try {
          const response = await axios.get(`https://backghtucuman.netlify.app/.netlify/functions/server/feedback?status=approved&participant_id=${participant.id}&quantity_votes=${orderData.quantity}&payment_id=${payment_id}&merchant_order_id=${merchant_order_id}`);
          setResData(response.data)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
      getResponse()
  }, [])

  return (
    <div>
      {/* <img src={participant.photo} alt="participant"/>
      {participant.name} */}
      <div className="w-full flex justify-center items-center h-screen ">
        <div className="w-full max-w-md bg-white text-center py-3 shadow-2xl rounded-sm">
          <h1 className="text-3xl">Tu voto fue aprobado</h1>
          <h5 className="text-xl">5 Votos añadidos a</h5>
          <img className="py-2" src={participant.photo} alt="logo"/>
          <h1 className="text-3xl my-2">{`${participant.name} ${participant.lastName}`}</h1>
          <div className="my-2">
            <Link to={`/`} className="bg-[#0f0d25] text-white px-5 py-2 rounded-full hover:bg-[#0f0d257c]">
              <span> Volver </span>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};


export default Success;