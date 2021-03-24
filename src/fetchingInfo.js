import { getCityApi, placeHolder } from './utils';
import { img } from './dom';

const clientCountry = async () => {
  try {
    const data = await fetch('https://ipapi.co/json', { mode: 'cors' });
    const response = await data.json();
    console.log(response);
    return response.city;
  } catch (data) {
    console.log('Request failed', data);
    return 'Paris';
  }
};

const fetchTime = async (lat, lon) => {
  try {
    const timeApi = 'X7LQY2PG947X';
    const queryAdd = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApi}&format=json&by=position&lat=${lat}&lng=${lon}`;
    const response = await fetch(queryAdd, { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Rejected', err);
    return err;
  }
};

const fetching = async (city) => {
  try {
    const response = await fetch(getCityApi(city), { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('rejected', err);
    return err;
  }
};

const googleImage = async (loc) => {
  try {
    const cityName = (c) => {
      const result = c.toLowerCase();
      if (/\s/.test(result)) {
        return result.replace(/\s/g, '-');
      } return result;
    };
    const place = `https://api.teleport.org/api/urban_areas/slug:${cityName(loc)}/images/`;
    const response = await fetch(place, { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('rejected', err);
    img.src = `${placeHolder['placeholder.jpg']}`;

    return err;
  }
};

export {
  clientCountry, fetching, googleImage, fetchTime,
};
