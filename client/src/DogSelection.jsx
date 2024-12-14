import { useState } from "react";

function DogSelection({ walker, walkerCities, setDogSelection }) {
  const [dogs, setDogs] = useState([]);
  const handleDogSelection = () => {
    
    setDogSelection(dogs.filter(d => d.walkerId === walker.id && d.some));
  };
  return <>DogSelection Component</>;
}

export default DogSelection;
