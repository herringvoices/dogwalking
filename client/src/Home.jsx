import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useEffect, useState } from "react";
import { getAllDogs } from "./Services/DogService";
import DogItem from "./Dog";

function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getAllDogs().then(setDogs);
  }, []);

  return (
    <Container className="primary-box mt-4">
      <Col>
        <Row>
          {dogs.map((dog) => (
            <DogItem dog={dog} key={dog.id} />
          ))}
        </Row>
        <Row>
          <Col className="mx-auto my-3" xs={6}>
            <Link to="/adddog" style={{ textDecoration: "none" }}>
              <Button className="btn btn-warning fw-bold fs-4">
                Add a Dog
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Home;
