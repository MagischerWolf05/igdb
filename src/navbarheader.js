import {Container, Image, Navbar} from "react-bootstrap";
import logo from "./logo.png";

export default  function Navheader() {
    const s = () => {

    }
    return(
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>
                    <a href="/">
                    <Image src={logo} alt="" width={150} height={72}  />{' '}
                    </a>
                </Navbar.Brand>
                <Navbar.Text>
                    <a href="./crud">Sign in</a>
                </Navbar.Text>
            </Container>
        </Navbar>

    )
}