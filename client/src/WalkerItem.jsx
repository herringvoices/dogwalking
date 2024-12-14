import { Button, Col, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteWalker } from "./Services/WalkerService";
import { updateDog } from "./Services/DogService"; // Service for updating dog
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function WalkerItem({ walker, getAndSet, dogs, walkerCities }) {
  const [show, setShow] = useState(false); // Modal visibility state
  const [dogSelection, setDogSelection] = useState([]); // Dogs available for assignment
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = () => {
    // 1. Get the cities assigned to this walker
    const thisWalkerCities = walkerCities?.filter(
      (wc) => wc.walkerId === walker.id
    );

    // 2. Filter dogs based on:
    // - The dog is in one of the walker's cities
    // - The dog is not already assigned to this walker
    const dogsAvailable = dogs?.filter(
      (dog) =>
        thisWalkerCities?.some((wc) => wc.cityId === dog.cityId) &&
        dog.walkerId !== walker.id
    );

    setDogSelection(dogsAvailable || []); // Set available dogs
    setShow(true); // Show the modal
  };

  const handleDogSelection = async (dogId) => {
    try {
      // 1. Assign the walker to the dog
      const selectedDog = dogs.find((dog) => dog.id === dogId);
      const updatedDog = { ...selectedDog, walkerId: walker.id };

      await updateDog(dogId, updatedDog); // Update the dog via API
      console.log(`Dog ID ${dogId} assigned to Walker ID ${walker.id}`);

      // 2. Navigate to the dog's details page
      navigate(`/dogdetails/${dogId}`);
    } catch (error) {
      console.error(`Error assigning walker to dog ID ${dogId}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWalker(walker.id); // Call the walker delete service
      getAndSet(); // Refresh the list
    } catch (error) {
      console.error(`Failed to delete walker with ID ${walker.id}:`, error);
    }
  };

  return (
    <>
      <Col xs={9} className="dark-list mx-auto my-3 p-3">
        <Row className="d-flex justify-content-around">
          <Col>
            <Link
              className="text-light"
              to={`./edit/${walker.id}`}
              style={{ textDecoration: "none" }}
            >
              {walker.name}
            </Link>
          </Col>
          <Col xs={2}>
            <Button className="btn btn-warning fw-bold" onClick={handleShow}>
              Add Dog
            </Button>
          </Col>
          <Col xs={1}>
            <Button className="btn btn-warning fw-bold" onClick={handleDelete}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </Button>
          </Col>
        </Row>
      </Col>

      {/* Modal for displaying available dogs */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available Dogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dogSelection.length > 0 ? (
            <Row>
              {dogSelection.map((dog) => (
                <Col xs={12} className="my-2" key={dog.id}>
                  <Button
                    className="btn btn-warning w-100"
                    onClick={() => handleDogSelection(dog.id)}
                  >
                    {dog.name}
                  </Button>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No dogs available for this walker.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WalkerItem;
