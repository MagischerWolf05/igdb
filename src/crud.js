import React, {useEffect, useState} from 'react';

import Navheader from  './navbarheader';
import './crud.css';

import Gametable from "./tablegame";
import Publishertable from "./tablepublisher";
// Component's Base CSS
export default function Tablecrud() {
return <>
    <Navheader/>
    <Gametable/>
    <Publishertable/>
</>
}



