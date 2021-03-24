import css from './style.css';
import { clientCountry as fetchClientCity } from './fetchingInfo';
import buildingDom from './building';
import {
  cityInput, search, changeTemp, tempDom,
} from './dom';
import { changeT, checkT } from './utils';

cityInput.value = '';

search.addEventListener('click', () => {
  buildingDom(cityInput.value, 'n');
  cityInput.value = '';
});

cityInput.addEventListener('click', () => {
  cityInput.placeholder = '';
});

cityInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopImmediatePropagation();
    buildingDom(cityInput.value, 'n');
    cityInput.value = '';
  }
});

changeTemp.addEventListener('click', () => {
  changeT(tempDom);
  changeTemp.textContent = checkT(tempDom.textContent);
});

fetchClientCity().then((data) => {
  buildingDom(data, 'y');
});

/*
buildingDom has 2 parameters: the first one is the fetched data object,
the second one is a flag "y" or "n" to define whether it has to be
applied locally or not
*/
