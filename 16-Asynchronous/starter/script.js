'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

const renderCountry = function (data) {
  const html = `
    <article class="country">
          <img class="country__img" src="${data[0].flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data[0].name.common}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data[0].population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data[0].languages.spa}</p>
            <p class="country__row"><span>💰</span>${
              data[0].currencies.EUR.name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// const getCountryandNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data[0]);
//     // render country 1
//     renderCountry(data);

//     // get neighbor country 2
//     const neighbor = data[0].borders?.[0];
//     if (!neighbor) return;

//     console.log(neighbor);

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2[0]);
//       renderCountry(data2);
//     });
//   });
// };

// getCountryandNeighbour('portugal');

// // callback

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//     }, 1000);
//   }, 1000);
// }, 1000);

// 1. XMLHttpRequest()

// const request = fetch(`https://restcountries.com/v3.1/name/spain`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data);
//       const neighbor = data[0].borders[0];

//       if (!neighbor) return;
//       // country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(err);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {});
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data);
      const neighbor = data[0].borders[0];
      //   const neighbor = 'ddfjifj';
      if (!neighbor) throw new Error('No neighbor found!');

      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {});
};

btn.addEventListener('click', function () {
  getCountryData('dfdsf');
});

// getCountryData('spain');

// const whereAmI = function (lat, lng) {
//   fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status}`)
//       return res.json()
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`$(err.message)`));
// };
// whereAmI(52.508, 13.381);

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise1')
// .then(res => console.log(res))
// Promise.resolve('Resolved promise2')
// .then(res => {
//   console.log(res)
// })
// console.log('Test end')

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You Win');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });

// lotteryPromise
// .then(res => console.log(res))
// .catch(err => console.error(err));

// promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2).then(() => {
//   console.log('1 second passed')
//   return wait(1)
// }).then(() => {
//   console.log('2 second passed')
//   return wait(1)
// }).then(() => {
//   console.log('3 second passed')
//   return wait(1)
// })
// .then(() => console.log('4 second passed'))

// Promise.resolve('abc').then(x => console.log(x))
// Promise.reject(new Error('Problem!')).catch(x => console.error(x))

// console.log('Getting position')

// const getPosition = function() {
//   return new Promise(function(resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     //   );
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   })
// }

// getPosition().then(pos => console.log(pos));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      // resolve img pass to the promise callback function later
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('img not found'));
    });
  });
};

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const whereAmI = async function (country) {
  // fetch(`https://restcountries.com/v3.1/name/${country}`)
  // .then(console.log(res));

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error('problem getting');
    const data = await res.json();
    renderCountry(data);
    console.log(res);
  } catch (err) {
    console.error(err);
    // reject promise returned from async function
    throw err;
  }
};

whereAmI('portugal');
console.log('First');

(async function () {
  try {
    const city = await whereAmI();
  } catch (err) {
    console.error(err.message);
  }
});

const get3Countries = async function (c1, c2, c3) {
  try {
    // const data1 = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const data2 = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const data3 = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1[0].capital, data2[0].capital, data3[0].capital);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// Promise.allSettled

// Promise.any
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.resolve('Error'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

const loadNPause = async function () {
  try {
    // load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(img);

    const imgsEL = await Promise.all(imgs);
    console.log(imgsEL);
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-2.jpg', 'img/img-2.jpg', 'img/img-1.jpg']);
