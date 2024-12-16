import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCity } from "./Services/CityService"; // Import the deleteCity function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CityItem({ city, getAndSet }) {
  const handleDelete = async () => {
    try {
      await deleteCity(city.id); // Call the delete service
      getAndSet(); // Refresh the list of cities
    } catch (error) {
      console.error(`Failed to delete city with ID ${city.id}:`, error);
    }
  };

  return (
    <Col xs={10} className="dark-list mx-auto my-2 p-3 px-5">
      <Row className="d-flex justify-content-around">
        <Col xs={8}>
          <Link
            className="text-light"
            to={`/citydetails/${city.id}`} // Adjusted link to city details
            style={{ textDecoration: "none" }}
          >
            {city.name}
          </Link>
        </Col>
        <Col xs={1}>
          <Button
            className="mx-auto btn btn-warning fw-bold"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default CityItem;
