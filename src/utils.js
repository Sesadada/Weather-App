import { tempDom } from './dom';

const farToC = (num) => ((num - 32) * (5 / 9)).toFixed(2);

const CenToF = (num) => ((num * (9 / 5) + 32)).toFixed(2);

const getCityApi = (x) => `https://api.openweathermap.org/data/2.5/weather?q=${x}&units=metric&appid=eadfc0930f2a58b518778194a8e7f4cf `;

const whichT = (country, t) => (country === 'US' ? `Temperature: ${CenToF(t)} F` : `Temperature: ${t} C`);

const checkT = (str) => {
  const actualT = str[str.length - 1];
  return actualT === 'C' ? ' C to F' : ' F to C';
};

const changeT = (str) => {
  const result = str.textContent.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g).map((v) => +v);
  const tempNum = result[0];

  const actualT = str.textContent[str.textContent.length - 1];
  if (actualT === 'C') {
    tempDom.textContent = `Temperature: ${CenToF(tempNum)} F`;
  } else {
    tempDom.textContent = `Temperature: ${farToC(tempNum)} C`;
  }
};

const formatDate = (n) => {
  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  return months[n];
};

const importAll = (r) => {
  const images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const unixReader = (timeStamp, offset) => {
  const localStamp = timeStamp + (offset);
  const dateObject = new Date(localStamp * 1000);
  const result = dateObject.toLocaleString('en-GB').slice(12, 17);
  return result;
};
const placeHolder = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
const dayImages = importAll(require.context('./images/Day', false, /\.(png|jpe?g|svg)$/));
const nightImages = importAll(require.context('./images/Night', false, /\.(png|jpe?g|svg)$/));

const difference = (num) => {
  const d = new Date();
  const n = d.getTimezoneOffset();
  const final = n / 60;
  return final < 0 ? num - Math.abs(final) : num + final;
};

const decider = (time, sun, set, off) => {
  const newTime = Math.abs(time.replace(':', '.'));
  const newSun = difference(Math.abs(unixReader(sun, off).replace(':', '.')));
  const newSet = difference(Math.abs(unixReader(set, off).replace(':', '.')));
  if (newTime > newSun && newTime < newSet) {
    return dayImages;
  }
  return nightImages;
};

export {
  farToC, CenToF, getCityApi, whichT, changeT, checkT, formatDate, importAll,
  unixReader, decider, placeHolder,
};
