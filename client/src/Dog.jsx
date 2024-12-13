import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteDog } from "./Services/DogService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DogItem({ dog, getAndSet }) {
  const handleDelete = async () => {
    try {
      await deleteDog(dog.id);
      getAndSet();
    } catch (error) {
      console.error(`Failed to delete dog with ID ${dog.id}:`, error);
    }
  };

  return (
    <Col xs={10} className="dark-list mx-auto my-2 p-3">
      <Row className="d-flex justify-content-around">
        <Col>
          <Link
            className="text-light"
            to={`/dogdetails/${dog.id}`}
            style={{ textDecoration: "none" }}
          >
            {dog.name}
          </Link>
        </Col>
        <Col xs={1}>
          <Button className="btn btn-warning fw-bold" onClick={handleDelete}>
            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default DogItem;
