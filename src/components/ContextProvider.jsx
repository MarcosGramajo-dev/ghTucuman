import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const Context = createContext({});
const InternalProvider = ({ children, context }) => {
    const [data, setData] = useState([]);

    // Función para realizar una solicitud Axios
    const getParticipants = async (url = "https://backghtucuman.netlify.app/.netlify/functions/server/participants") => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Agregamos la función fetchData al contexto
    const updatedContext = {
        ...context, // Aquí agregamos la función al contexto
        getParticipants,
        data,      // También puedes incluir cualquier otro dato que desees compartir en el contexto
    };

    return <Context.Provider value={updatedContext}>{children}</Context.Provider>;
};

export default InternalProvider;
export { Context };
