import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAllCities } from "./Services/CityService"; // Import the service for fetching cities
import { addDog } from "./Services/DogService"; // Import the service for adding a dog

function AddDog() {
  const [cities, setCities] = useState([]);
  const [dog, setDog] = useState({});
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedCities = await getAllCities();
        setCities(fetchedCities);

        setDog({
          name: "",
          cityId: 0,
          walkerId: null,
        });
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initialize();
  }, []);

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  const handleCityChange = (evt) => {
    const cityId = parseInt(evt.target.value, 10);
    setDog((prevDog) => ({
      ...prevDog,
      cityId,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await addDog(dog);
      console.log("Dog added successfully:", response);
      // Navigate to the dog details page
      navigate(`/dogdetails/${response.id}`);
    } catch (error) {
      console.error("Error adding the dog:", error);
    }
  };

  return (
    <Container className="primary-box mt-4">
      <Row className="mt-2">
        <Col className="my-2 mx-auto fs-3" md={8}>
          <Form onSubmit={handleSubmit}>
            {/* Dog Name Input */}
            <Form.Group controlId="dogName">
              <Form.Label>Dog Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                className="fs-4"
                value={dog.name || ""}
                onChange={handleTextChange}
              />
            </Form.Group>

            {/* City Dropdown */}
            <Form.Group controlId="dogCity" className="mt-2 mb-2">
              <Form.Label>City</Form.Label>
              <Form.Select
                className="fs-4"
                value={dog.cityId || ""}
                onChange={handleCityChange}
              >
                <option value="" disabled>
                  Select a city
                </option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" className="btn btn-warning fs-3 my-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddDog;
