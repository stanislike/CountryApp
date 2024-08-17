// https://restcountries.com/v3.1/all
const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let country = [];
let sortMethod = "maxToMin";

const fetchCountries = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (country = data));

  displayCountries();
  console.log(country);
};

const displayCountries = async () => {
  countriesContainer.innerHTML = country
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map((country) => {
      return `
        <div class="card">
        <img src=${country.flags.svg} alt=${country.flags.alt} >
        <h2>${country.translations.fra.common}</h2>
        <h4>${country.capital}</h4>
        <p>Population : ${country.population.toLocaleString()}</p>
        
        </div>
        `;
    })
    .join("");
};

window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", displayCountries);

inputRange.addEventListener("input", () => {
  displayCountries();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    displayCountries();
  });
});
