
const findElement = (element, parent = document) => {
  return parent.querySelector(element);
};

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    renderCountries(data, elCards);
    btnSearch.addEventListener("click", (evt)=>{
      const searchedArray = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.name.common.toLowerCase().includes(elInput.value.toLowerCase())  ){
          searchedArray.push(element);
        }
      }
      renderCountries(searchedArray, elCards);
    });
});

const elCards = findElement(".cards");;
const elTemplate = findElement("#template").content;
const elInput = findElement("#input");
const btnSearch = findElement("#search");

function renderCountries(array, parent) {
  parent.innerHTML = null;
  const fragment = document.createDocumentFragment();
  array.forEach((country) => {
    const newCard = elTemplate.cloneNode(true);
    const img = findElement(".card-img-top", newCard);
    const title = findElement(".card-title", newCard);
    img.src = country.flags.png;
    title.textContent = country.name.common;

    fragment.appendChild(newCard);
  });
  parent.appendChild(fragment);
}




