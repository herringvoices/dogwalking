import { Button, Col, Row } from "react-bootstrap";

function DogItem({ dog }) {
  return (
    <Col xs={10} className="dark-list mx-auto my-2 p-3">
      <Row className="d-flex justify-content-around">
        <Col>{dog.name}</Col>
        <Col xs={1}>
          <Button className="btn btn-warning fw-bold">X</Button>
        </Col>
      </Row>
    </Col>
  );
}

export default DogItem;
