import React, {useEffect, useState} from 'react';
import data from "bootstrap/js/src/dom/data";
import {Button, Container, Row, Col, Card, Form, Image, Navbar, Table, Spinner} from "react-bootstrap";
import {DefaultApi} from "./generated/openapi";

    export default function GameGetter() {

        const [games,setGames] = useState([]);

     useEffect(()=> {
         const test = new DefaultApi;
         test.getGames().then(gamedata =>
             setGames(gamedata)
         );
     },[setGames])

        if (games.length === 0){
            console.log("NOT LOADED")
            return (
                <div className="selection">
                    <Spinner animation="border" role="status" >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        console.log(games)
        const gamesaslist
            = games.map((game)=>
                <Col key={game.id}>
                    <Card style={{width: '14rem'}}>
                        <Card.Img variant="top" src={"https://source.unsplash.com/300x300/?" + game.name + ""}/>
                        <Card.Body>
                            <span className="fa fa-star checked"/>{game.rating}
                            <Card.Title>{game.name}</Card.Title>
                            <Card.Text>
                                {/*{data.ReleaseDate.toISOString().split("T")[0]}*/}
                            </Card.Text>
                            <a href={"/game/"+ game.id}>
                            <button type="button" className="btn btn-primary btn-circle.btn-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path
                                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </button>
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
        );
        console.log(gamesaslist)
        return (

           <Row>{gamesaslist}</Row>
        );
    }
