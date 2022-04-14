import {Button, Container,Row,Col, Card,Form, Image, Navbar, Table} from "react-bootstrap";
import logo from './logo.png'
import {useEffect, useState} from "react";
import GameGetter, {Person} from "./Api";
import Navheader from "./navbarheader";

function PonyTBody({versionId}) {
    return (
        <Container>
            <Row>
                <GameGetter/>
            </Row>
        </Container>
    )
}

// function NewPonyTFoot({onUpdate}) {
//     const [newName, setNewName] = useState("")
//     const [newBirthday, setNewBirthday] = useState("")
//     const handleAddPony = event => {
//         event.preventDefault();
//
//     }
//     return (
//         <tr>
//             <td>
//                 <Form.Label className="visually-hidden" htmlFor="inputPonyName">Ponyname</Form.Label>
//                 <Form.Control id="inputPonyName" placeholder="Dixie" value={newName} onChange={e => setNewName(e.target.value)} />
//             </td>
//             <td>
//                 <Form.Label className="visually-hidden" htmlFor="inputPonyBirthday">Birthday</Form.Label>
//                 <Form.Control id="inputPonyBirthday" placeholder="2000-01-31" value={newBirthday}
//                               onChange={e => setNewBirthday(e.target.value)} />
//             </td>
//             <td>
//                 <Button type="submit" variant="secondary" onClick={handleAddPony}>Add Pony</Button>
//             </td>
//         </tr>
//
//     )
// }

function PonyTable() {
    const [id, setId] = useState(0)
    const onUpdate = () => {
        setId(id + 1);
    }
    return (
        <div>
            <h2 >Newest</h2>



            <PonyTBody/>
        </div>
    )
}

function App() {
    return (
        <>
            <Navheader/>
            <Container>
                <PonyTable />
            </Container>
        </>
    );
}

export default App;
