import {Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DefaultApi} from "./generated/openapi";

export default function Gameview() {
    let { id } = useParams();



    const [games,setGames] = useState();

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
const tableforview = () =>
    
    <table className="tg">
        <thead>
        <tr>
            <th className="tg-tu1s">id</th>
            <th className="tg-0pky">{games.id}</th>[
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className="tg-0pky">name</td>
            <td className="tg-kjmd">{games.name}</td>
        </tr>
        <tr>
            <td className="tg-0pky">category</td>
            <td className="tg-kjmd">{games.category}</td>
        </tr>
        <tr>
            <td className="tg-0pky">crossplay</td>
            <td className="tg-kjmd">{games.crossplay}</td>
        </tr>
        <tr>
            <td className="tg-0lax">downloads</td>
            <td className="tg-0lax">{games.downloads}</td>
        </tr>
        <tr>
            <td className="tg-0lax">image</td>
            <td className="tg-0lax">{games.image}</td>
        </tr>
        <tr>
            <td className="tg-0lax">publisherId</td>
            <td className="tg-0lax">{games.publisherId}</td>
        </tr>
        <tr>
            <td className="tg-0lax">rating</td>
            <td className="tg-0lax">{games.rating}</td>
        </tr>
        <tr>
            <td className="tg-0lax">releaseDate</td>
            <td className="tg-0lax">{games.realeaseDate}</td>
        </tr>
        <tr>
            <td className="tg-0lax">size</td>
            <td className="tg-0lax">{games.size}</td>
        </tr>
        <tr>
            <td className="tg-0lax"></td>
            <td className="tg-0lax"></td>
        </tr>
        <tr>
            <td className="tg-0lax"></td>
            <td className="tg-0lax"></td>
        </tr>
        </tbody>
    </table>

    return (
        <tableforview/>
    );
}