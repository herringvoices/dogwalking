import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAllWalkers, updateWalker } from "./Services/WalkerService"; // Import updateWalker
import { getAllCities } from "./Services/CityService";
import {
  getAllWalkerCities,
  deleteWalkerCity,
  addWalkerCity,
} from "./Services/WalkerCityService"; // Import delete and add services

function EditWalker() {
  const [cities, setCities] = useState([]);
  const [walkerCities, setWalkerCities] = useState([]);
  const [walkerCitiesToDelete, setWalkerCitiesToDelete] = useState([]); // Keep track of deletions
  const [walker, setWalker] = useState({});
  const navigate = useNavigate(); // Initialize navigate hook
  let { walkerId } = useParams();
  walkerId = parseInt(walkerId);

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedCities = await getAllCities();
        setCities(fetchedCities);

        const walkers = await getAllWalkers();
        const filteredWalker = walkers.find((item) => item.id === walkerId);
        setWalker(filteredWalker);

        const allWalkerCities = await getAllWalkerCities();
        const filteredWalkerCities = allWalkerCities.filter(
          (wc) => wc.walkerId === walkerId
        );
        setWalkerCities(filteredWalkerCities);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initialize();
  }, [walkerId]);

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    setWalker((prevWalker) => ({
      ...prevWalker,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (cityId, isChecked) => {
    if (isChecked) {
      // Add the new association to walkerCities
      setWalkerCities((prevWalkerCities) => [
        ...prevWalkerCities,
        { walkerId, cityId },
      ]);
    } else {
      // Remove the association and track it for deletion
      const walkerCityToRemove = walkerCities.find(
        (wc) => wc.cityId === cityId && wc.walkerId === walkerId
      );
      if (walkerCityToRemove) {
        setWalkerCitiesToDelete((prev) => [...prev, walkerCityToRemove]); // Track for deletion
      }
      setWalkerCities((prevWalkerCities) =>
        prevWalkerCities.filter((wc) => wc.cityId !== cityId)
      );
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // 1. Update the walker
      await updateWalker(walker.id, walker);
      console.log("Walker updated successfully:", walker);

      // 2. Delete walkerCities marked for deletion
      for (const walkerCity of walkerCitiesToDelete) {
        await deleteWalkerCity(walkerCity.id);
        console.log(
          `WalkerCity with ID ${walkerCity.id} deleted successfully.`
        );
      }

      // 3. Add new walkerCities (excluding their IDs)
      for (const walkerCity of walkerCities) {
        if (!walkerCity.id) {
          const newWalkerCity = {
            walkerId: walkerCity.walkerId,
            cityId: walkerCity.cityId,
          };
          await addWalkerCity(newWalkerCity);
          console.log("New WalkerCity added:", newWalkerCity);
        }
      }

      // 4. Navigate to /walkers after all operations are complete
      console.log("All operations completed successfully. Redirecting...");
      navigate("/walkers");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container className="primary-box mt-4">
      <Row className="mt-2">
        <Col className="my-2 mx-auto fs-3" md={6}>
          <Form onSubmit={handleSubmit}>
            {/* Walker Name Input */}
            <Form.Group controlId="walkerName">
              <Form.Label>Walker Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                className="fs-4"
                value={walker.name || ""}
                onChange={handleTextChange}
              />
            </Form.Group>

            {/* Cities Checkboxes */}
            <Row className="mt-4">
              <Form.Label className="fs-4">Assign Cities:</Form.Label>
              {cities.map((city) => {
                const isChecked = walkerCities.some(
                  (wc) => wc.cityId === city.id
                );
                return (
                  <Col key={city.id} xs={12} md={6}>
                    <Form.Check
                      type="checkbox"
                      label={city.name}
                      checked={isChecked}
                      onChange={(e) =>
                        handleCheckboxChange(city.id, e.target.checked)
                      }
                      className="fs-5"
                    />
                  </Col>
                );
              })}
            </Row>
            <Row className="mt-4">
              <Col>
                <button type="submit" className="btn btn-warning fs-4">
                  Update
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditWalker;
