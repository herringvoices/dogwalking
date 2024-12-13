import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllWalkers } from "./Services/WalkerService"; // Import the service for fetching walkers
import WalkerItem from "./WalkerItem"; // Import the WalkerItem component
import CitiesDropdown from "./CitiesDropdown";
import { getAllCities } from "./Services/CityService";
import { getAllWalkerCities } from "./Services/WalkerCityService";

function Walkers() {
  const [walkers, setWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [cities, setCities] = useState([]);
  const [walkerCities, setWalkerCities] = useState([]);
  const getAndSetWalkers = () => {
    getAllWalkers().then(setWalkers);
  };
  const getAndSetCities = () => {
    getAllCities().then(setCities);
  };
  const getAndSetWalkerCities = () => {
    getAllWalkerCities().then(setWalkerCities);
  };

  useEffect(() => {
    getAndSetWalkers();
    getAndSetCities();
    getAndSetWalkerCities();
  }, []);

  useEffect(() => {
    if (cityId) {
      setFilteredWalkers(
        walkers.filter((walker) =>
          walkerCities.some(
            (wc) => wc.cityId === cityId && wc.walkerId === walker.id
          )
        )
      );
    } else {
      setFilteredWalkers(walkers);
    }
  }, [cityId, walkers, walkerCities]);

  return (
    <Container className="primary-box mt-4">
      <Col className="p-3">
        <CitiesDropdown
          className="my-3"
          cities={cities}
          setCityId={setCityId}
        />
      </Col>
      <Col>
        <Row>
          {filteredWalkers.map((walker) => (
            <WalkerItem
              walker={walker}
              key={walker.id}
              getAndSet={getAndSetWalkers}
            />
          ))}
        </Row>
      </Col>
    </Container>
  );
}

export default Walkers;
