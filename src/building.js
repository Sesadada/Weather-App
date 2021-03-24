import {
  cityDom, countryDom, tempDom, hDom, timeDom, img, changeTemp, dayDom, desDom, wIcon, body,
} from './dom';
import { fetching as fetchCity, googleImage, fetchTime } from './fetchingInfo';
import {
  whichT, checkT, formatDate, decider, placeHolder,
} from './utils';

const lookup = require('country-code-lookup');

const buildingDom = (city, local) => {
  fetchCity(city).then((info) => {
    const { sunrise } = info.sys;
    const { sunset } = info.sys;
    const weatherDes = `${info.weather[0].description}`;
    const newDes = weatherDes.replace(/\s/g, '-');
    const weatherIcon = info.weather[0].icon;
    desDom.textContent = weatherDes;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    wIcon.src = iconUrl;
    const cityLon = info.coord.lon;
    const cityLat = info.coord.lat;
    const countryCode = info.sys.country;
    const countryExtended = lookup.byIso(`${countryCode}`).country;
    cityDom.textContent = info.name;
    countryDom.textContent = countryExtended;
    hDom.textContent = `Humidity: ${info.main.humidity} %`;
    const fixedTemp = info.main.temp;
    tempDom.textContent = local === 'y' ? whichT(countryCode, fixedTemp) : `Temperature: ${fixedTemp} C`;
    changeTemp.textContent = checkT(tempDom.textContent);
    fetchTime(cityLat, cityLon).then((data) => {
      const offSet = data.gmtOffset;
      const timeStr = data.formatted;
      const space = timeStr.indexOf(' ');
      const timeDef = timeStr.slice(space + 1).slice(0, 5);
      const day = timeStr.slice(0, space);
      dayDom.textContent = `${day.slice(8)} of ${formatDate(parseInt(day.slice(5, 7), 10))}, ${day.slice(0, 4)}`;
      timeDom.textContent = timeDef;
      body.style.backgroundImage = `url('${decider(timeDef, sunrise, sunset, offSet)[`${newDes}.jpg`]}')`;
    }).catch((err) => console.log('err', err));
    googleImage(city).then((im) => {
      img.src = im.photos[0].image.web;
    }).catch((err) => {
      console.log(err);
      img.src = `${placeHolder['placeholder.jpg']}`;
    });
  });
};

export default buildingDom;
