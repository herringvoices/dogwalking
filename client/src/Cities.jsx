import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllCities, addCity } from "./Services/CityService";
import CityItem from "./CityItem"; // A CityItem component similar to DogItem

function Cities() {
  const [cities, setCities] = useState([]); // State for list of cities
  const [city, setCity] = useState(""); // State for new city input

  const getAndSetCities = () => {
    getAllCities().then(setCities); // Fetch cities and set state
  };

  useEffect(() => {
    getAndSetCities(); // Fetch cities on component mount
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value); // Update city state with input value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const newCity = { name: city }; // Create new city object
      await addCity(newCity); // Add city via API
      setCity(""); // Reset the input field
      getAndSetCities(); // Refresh city list
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <Container className="primary-box mt-4">
      <Col>
        <Row>
          <h2>Cities</h2>
          {cities.map((cityItem) => (
            <CityItem
              city={cityItem}
              key={cityItem.id}
              getAndSet={getAndSetCities}
            />
          ))}
        </Row>
        <Row className="mt-4">
          <fieldset className="w-100">
            <legend>Don’t see your city?</legend>
            <Form
              onSubmit={handleSubmit}
              className="d-flex align-items-center mb-4"
            >
              <Col md={{ offset: 2, span: 4 }}>
                <Form.Control
                  type="text"
                  placeholder="Enter City Name Here"
                  value={city}
                  onChange={handleInputChange}
                  className="me-2 fs-4"
                />
              </Col>
              <Col>
                <Button type="submit" className="btn btn-warning fw-bold fs-4">
                  Add City
                </Button>
              </Col>
            </Form>
          </fieldset>
        </Row>
      </Col>
    </Container>
  );
}

export default Cities;
