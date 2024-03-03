import React, {useEffect, useState } from 'react'
import { Context } from "./ContextProvider";
import axios from 'axios'

const Success = () => {

    const [participant, setParticipant] = useState(JSON.parse(window.localStorage.getItem('participant')))
    const [orderData, setOderData] = useState(JSON.parse(window.localStorage.getItem('orderData')))
    const [resData, setResData] = useState('')
    const getResponse = async (  ) => {
        try {
            const response = await axios.get(`https://backghtucuman.netlify.app/.netlify/functions/server/feedback?status=approved&participant_id=${participant.id}&quantity_votes=${orderData.quantity}`);
            setResData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getResponse()
    }, [])

    useEffect(() => {
        console.log(resData)
        console.log(orderData)
    }, [resData])



    console.log(participant)
    return (
      <div>
        <img src={participant.photo} alt="participant"/>
        {participant.name}
      </div>
    );
  };


export default Success;