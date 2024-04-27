import {useEffect, useState} from "react";
import {GetCountries, GetState, GetCity} from "react-country-state-city";

export const useLocations = () => {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryId, setCountryId] = useState();

  const parseResults = (results) => {
    return results.map(result => ({
      label: result.name,
      value: result.id
    }));
  };

  useEffect(() => {
    GetCountries().then(
      (results) => setCountries(parseResults(results))
    );
  }, []);

  const onCountryChange = (countryId) => {
    setCountryId(countryId);
    GetState(countryId).then(
      (results) => setStates(parseResults(results))
    );
  };

  const onStateChange = (stateId) => {
    GetCity(countryId, stateId).then(
      (results) => setCities(parseResults(results))
    );
  };

  return {locations: {countries, states, cities,}, onStateChange, onCountryChange};
}
