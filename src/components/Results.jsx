import React, { useContext, useEffect, useState } from 'react';
import { Context } from "./ContextProvider";
import axios from 'axios';
import { Link } from 'react-router-dom';
import tik from '../../img/tiktok.svg';
import face from '../../img/facebook.svg';
import insta from '../../img/instagram.svg';
import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
    CardHeader,
} from "@material-tailwind/react";

const Results = () => {
    const [data, setData] = useState([]);

    const getParticipants = async (url = "http://localhost:8080/participants") => {
        try {
            const response = await axios.get(url);
            // Ordenar los participantes por quantity_votes de manera descendente
            const sortedParticipants = response.data.participants.sort((a, b) => b.quantity_votes - a.quantity_votes);
            setData(sortedParticipants);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getParticipants();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="">
            <section className="min-h-screen py-8 px-8 lg:py-28">
                <div className="bg-white p-3 container mx-auto max-w-[400px]">
                    <table className="bg-white w-full p-3">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Votos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((participant, key) => (
                                <tr key={key}>
                                    <td>{key + 1 + '°'}</td>
                                    <td>{participant.name + ' ' + participant.lastName}</td>
                                    <td>{participant.quantity_votes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Results;
