import {Card, Col, Image, Row, Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DefaultApi} from "./generated/openapi";
import Navheader from "./navbarheader";

export default function Gameview() {
    let { id } = useParams();

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
    const item = games.filter(x=> x.id.toString() === id);
if(item.length === 0){
    console.log("NOT LOADED")
    return (
        <div className="selection">
            <Spinner animation="border" role="status" >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
const Tableforview = () =>
    <>
        <Navheader/>
<h1>Game Specs</h1>
    <table className="tg">

        <thead>
        <tr>
            <th className="tg-tu1s">id</th>
            <th className="tg-0pky">{item[0].id}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className="tg-0pky">name</td>
            <td className="tg-kjmd">{item[0].name}</td>
        </tr>
        <tr>
            <td className="tg-0pky">category</td>
            <td className="tg-kjmd">{item[0].category}</td>
        </tr>
        <tr>
            <td className="tg-0pky">crossplay</td>
            <td className="tg-kjmd">{item[0].crossplay}</td>
        </tr>
        <tr>
            <td className="tg-0lax">downloads</td>
            <td className="tg-0lax">{item[0].downloads}</td>
        </tr>
        <tr>
            <td className="tg-0lax">image</td>
            <td className="tg-0lax">{item[0].image}</td>
        </tr>
        <tr>
            <td className="tg-0lax">publisherId</td>
            <td className="tg-0lax">{item[0].publisherId}</td>
        </tr>
        <tr>
            <td className="tg-0lax">rating</td>
            <td className="tg-0lax">{item[0].rating}</td>
        </tr>
        <tr>
            <td className="tg-0lax">releaseDate</td>
            <td className="tg-0lax">{item[0].realeaseDate}</td>
        </tr>
        <tr>
            <td className="tg-0lax">size</td>
            <td className="tg-0lax">{item[0].size}</td>
        </tr>

        </tbody>
    </table>
        <Image href={item[0].image}></Image>
    </>
    return (
        <Tableforview/>
    );
}