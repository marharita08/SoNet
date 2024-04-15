import {useEffect, useState} from "react";
import {GetCountries} from "react-country-state-city";

export const useLocationCountry = () => {

  const [country, setCountry] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        GetCountries().then(
          (countries) => {
            let minDistance = 1000;
            let nearestCountry;
            countries.forEach(c => {
              const {latitude: lat, longitude: lon} = c;
              const distance = Math.abs(lat - latitude) + Math.abs(lon - longitude);
              if (distance < minDistance) {
                minDistance = distance;
                nearestCountry = c;
              }
            });
            setCountry(nearestCountry.id);
          }
        );
      });
    }
  }, []);

  return country;
}
