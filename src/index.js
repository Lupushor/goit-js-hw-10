var debounce = require('lodash.debounce');

import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const searchText = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchText.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch() {
  const trim = searchText.value.trim();
  onClear();

  if (trim !== '') {
    fetchCountries(trim).then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        onRenderCountryList(data);
      } else if (data.length === 1) {
        onRenderCountry(data);
      } else if (data.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
  }
}

function onRenderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li class ="country">
                   <div class ="title">
                  <img src="${country.flags.svg}" alt="${country.name.official}" width="40" height="30" />
                    <p>${country.name.official}</p>
                    </div>
              </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function onRenderCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
                  <div class ="title">
                  <img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="40" height="30" />
                    <p>${country.name.official}</p>
                    </div>
                      <p><b>Capital</b>: ${country.capital}</p>
                      <p><b>Population</b>: ${country.population}</p>
                      <p><b>Languages</b>: ${Object.values(
                        country.languages
                      )}</p>
                </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function onClear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
