import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteWalker } from "./Services/WalkerService"; // Adjusted service for walkers
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WalkerItem({ walker, getAndSet }) {
  const handleDelete = async () => {
    try {
      await deleteWalker(walker.id); // Call the walker delete service
      getAndSet(); // Refresh the list
    } catch (error) {
      console.error(`Failed to delete walker with ID ${walker.id}:`, error);
    }
  };

  return (
    <Col xs={9} className="dark-list mx-auto my-3 p-3">
      <Row className="d-flex justify-content-around">
        <Col>
          <Link
            className="text-light"
            to={`./edit/${walker.id}`} // Adjusted link to walker details
            style={{ textDecoration: "none" }}
          >
            {walker.name} {/* Display walker name */}
          </Link>
        </Col>
        <Col xs={2}>
          <Button
            className="btn btn-warning fw-bold"
            //   onClick={handleDelete}
          >
            Assign Dog
            {/* Trash can icon */}
          </Button>
        </Col>
        <Col xs={1}>
          <Button className="btn btn-warning fw-bold" onClick={handleDelete}>
            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            {/* Trash can icon */}
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default WalkerItem;
