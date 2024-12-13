import Dropdown from "react-bootstrap/Dropdown";

function CitiesDropdown({ cities, setCityId }) {
  const handleSelect = (eventKey) => {
    const selectedCityId = parseInt(eventKey, 10); // Convert eventKey to number
    setCityId(selectedCityId);
  };

  return (
    <Dropdown onSelect={handleSelect} >
      <Dropdown.Toggle variant="warning" size="lg" id="dropdown-basic">
        Select a City
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {cities.map((city) => (
          <Dropdown.Item key={city.id} eventKey={city.id}>
            {city.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CitiesDropdown;
