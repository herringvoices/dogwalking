import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Navbar expand="md">
          <Container>
            <Navbar.Brand href="/">
              {" "}
              <img
                src="/dogwalklogo.png" // Access the logo from the public folder
                alt="Dog Walking Logo"
                style={{
                  height: "40px", // Adjust the height
                  marginRight: "10px", // Optional: Add spacing around the logo
                }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Dogs</Nav.Link>
                <Nav.Link href="/walkers">Walkers</Nav.Link>
                <Nav.Link href="/cities">Cities</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
}

export default App;
