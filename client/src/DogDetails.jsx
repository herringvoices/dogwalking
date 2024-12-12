import { useEffect, useState } from "react";
import { getAllDogs } from "./Services/DogService";
import { getAllCities } from "./Services/CityService";
import { getAllWalkers } from "./Services/WalkerService";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DogDetails() {
  let { dogId } = useParams();
  dogId = parseInt(dogId);

  const [dog, setDog] = useState({});
  const [city, setCity] = useState({});
  const [walker, setWalker] = useState({});
  const getAndSetData = async () => {
    try {
      const dogs = await getAllDogs();
      const filteredDog = dogs.find((item) => item.id === dogId);
      setDog(filteredDog);

      if (filteredDog) {
        const cities = await getAllCities();
        const filteredCity = cities.find(
          (item) => item.id === filteredDog.cityId
        );
        setCity(filteredCity);

        const walkers = await getAllWalkers();
        const filteredWalker = walkers.find(
          (item) => item.id === filteredDog.walkerId
        );
        setWalker(filteredWalker);
      }
    } catch (error) {
      console.error("Error fetching or setting data:", error);
    }
  };
  useEffect(() => {
    getAndSetData();
  }, [dogId]);
  return (
    <Container className="primary-box mt-4">
      <Row className="mt-2">
        <Col className="my-2">
          <h2 className="text-start">Dog Name:</h2>
          <div className="dark-list text-start p-2 fs-3">{dog?.name}</div>
        </Col>
      </Row>
      <Row>
        <Col className="my-2">
          <h2 className="text-start">Dog City:</h2>
          <div className="dark-list text-start p-2 fs-3">{city?.name}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2 mb-4">
          <h2 className="text-start">Dog Walker:</h2>
          <div className="dark-list text-start p-2 fs-3">
            {walker ? walker?.name : "None Assigned"}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DogDetails;
