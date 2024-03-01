import React, { useContext, useEffect, useState } from 'react';
import { Context } from "./ContextProvider";
import axios from 'axios'
import { Link } from 'react-router-dom';
import tik from '../../img/tiktok.svg'
import face from '../../img/facebook.svg'
import insta from '../../img/instagram.svg'

import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
    CardHeader,
  } from "@material-tailwind/react";

export function ParticipantCard({ photo, name, lastName, id, facebook, instagram, tiktok }) {

    return (
      <Card
        shadow={false}
        className="relative grid w-[200px] h-[250px] items-end justify-center overflow-hidden text-center"
      >
        
            <CardHeader
            className={`absolute inset-0 m-0 h-full `}
            >
            <div className="relative h-full top-0 left-0 ">
                <img src={photo} className="h-full w-full object-cover absolute top-0 left-0 " />
            </div>
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative p-0 py-2 w-full">
            <Typography
                variant="h5"
                color="white"
                className="font-medium"
            >
                {name + ' ' + lastName}
            </Typography>

            <div className="flex z-10 justify-center gap-2" >
                {facebook && <a className="z-10" href={facebook} target="_blank"><img src={face}/></a> }
                {instagram && <a href={instagram} target="_blank"><img src={insta}/></a> }
                {tiktok && <a href={tiktok} target="_blank"><img src={tik}/></a> }
            </div >

            <Link to={`/checkout/${id}`} className="" >
                <button className="text-black bg-white w-[140px] my-2 rounded-full">
                    ¡Votalo!
                </button>
            </Link>

            </CardBody>
        
      </Card>
    );
  }

const HomePage = () => {
    //const { getParticipants, data } = useContext(Context);
    const [data, setData] = useState([]);

    const getParticipants = async (url = "http://localhost:8080/participants") => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getParticipants();
    }, []);

    useEffect(() => {
        console.log(data.participants);
    }, [data]);

    return (
        <div className="">

            <section className="min-h-screen py-8 px-8 lg:py-28">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 justify-items-center lg:grid-cols-4">
                        {data.participants && data.participants.map((props, key) => (
                        <ParticipantCard key={key} {...props} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
