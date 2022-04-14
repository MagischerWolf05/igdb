import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tablecrud from "./crud";
import Gameview from "./gameview"
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/crud" element={<Tablecrud/>} />
            <Route path="/game/{id}" element={<Gameview/>} />
            <Route  path="/game/:snackid" element={<Gameview/>} />
        </Routes>
    </BrowserRouter>
, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
