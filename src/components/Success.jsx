import React, {useEffect, useState } from 'react'
import { Context } from "./ContextProvider";
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Success = () => {

  //const { id } = useParams();

  const [participant, setParticipant] = useState(JSON.parse(window.localStorage.getItem('participant')))
  const [orderData, setOderData] = useState(JSON.parse(window.localStorage.getItem('orderData')))
  const [resData, setResData] = useState('')

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const payment_id = urlParams.get('payment_id');


  const getResponse = async (  ) => {
      try {
          const response = await axios.get(`https://backghtucuman.netlify.app/.netlify/functions/server/feedback?status=approved&participant_id=${participant.id}&quantity_votes=${orderData.quantity}&payment_id=${payment_id}`);
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
      <img src={participant.photo} alt="participant"/>
      {participant.name}
    </div>
  );
};


export default Success;