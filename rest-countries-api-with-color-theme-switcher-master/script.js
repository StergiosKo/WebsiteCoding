const countriesDataUrl = "https://restcountries.com/v3.1/all";
const greeceUrl = "https://restcountries.com/v3.1/alpha/gr";

const countriesContainer = document.querySelector('#countries-container');

let allData = {};

fetch(countriesDataUrl)
.then(data =>{return data.json()})
.then(res=>{console.log(res)})
.catch(error=>console.log(error))

let grData = {};

// async function foo() {
//     const res = await fetch(greeceUrl)
  
//     grData = await res.json();
  
//     console.log(grData)
// }
  
// foo();

async function createAllCountries(){
    const res = await fetch(countriesDataUrl);

    let countriesData = await res.json();
    countriesData.forEach(country => {
        createCountry(country);
    });
}

createAllCountries();

async function createCountry(countryData) {
    // const res = await fetch(url)
  
    // grData = await res.json();
    // grData = grData[0];
    // console.log(grData)

    // Parent
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('country');
    parentDiv.setAttribute('data-region-filter', 'true');
    parentDiv.setAttribute('data-name-filter', 'true');
    parentDiv.addEventListener('click', function(){
        sessionStorage.setItem('countryName' ,countryData.cca2);
        location.href = 'details.html';
    })
    countriesContainer.appendChild(parentDiv);

    // Should put parameters in url instead of sessionstorage

    // Image
    let flagImg = document.createElement('img');
    flagImg.src = countryData.flags.svg;
    parentDiv.appendChild(flagImg);

    // Text Container
    let textContainerDiv = document.createElement('div')
    parentDiv.append(textContainerDiv);

    // Country Name
    let nameHeader = document.createElement('h1');
    nameHeader.textContent = countryData.name.common;
    textContainerDiv.appendChild(nameHeader);

    // Ul
    let ulist = document.createElement('ul');
    textContainerDiv.appendChild(ulist);

    // Population
    let populLi = document.createElement('li');
    let populHeader = document.createElement('h2');
    populHeader.textContent = 'Population:';
    populLi.appendChild(populHeader);

    let populNumber = document.createElement('p');
    populNumber.textContent = countryData.population.toLocaleString('en-UK').replaceAll(',','.');
    populLi.appendChild(populNumber);
    ulist.appendChild(populLi);

    // Region
    let regionLi = document.createElement('li');
    regionLi.classList.add('region')
    let regionHeader = document.createElement('h2');
    regionHeader.textContent = 'Region:';
    regionLi.appendChild(regionHeader);

    let regionName = document.createElement('p');
    regionName.textContent = countryData.region;
    regionLi.appendChild(regionName);
    ulist.appendChild(regionLi);

    // Capital
    let capitalLi = document.createElement('li');
    let capitalHeader = document.createElement('h2');
    capitalHeader.textContent = 'Capital:';
    capitalLi.appendChild(capitalHeader);

    let capitalName = document.createElement('p');
    capitalName.textContent = countryData.capital;
    capitalLi.appendChild(capitalName);
    ulist.appendChild(capitalLi);
  
}

// createCountry(greeceUrl);


function toggleLightDarkMode(){
    var body = document.querySelector('body');
    if (body.getAttribute('data-theme') == 'default'){
        body.removeAttribute('data-theme');
        body.setAttribute('data-theme', 'light')
    }
    else{
        body.removeAttribute('data-theme');
        body.setAttribute('data-theme', 'default')
    }
}

function filterByRegion(region){
    let countries = countriesContainer.querySelectorAll('div.country');

    if (region != 'All'){
        countries.forEach(element => {
            regionName = element.querySelector('div > ul > li.region > p');
            if (regionName.textContent !== region){
                element.dataset.regionFilter = 'false';
            }
            else{
                element.dataset.regionFilter = 'true';
            }
        });
    }
    else{
        countries.forEach(element => {
            element.dataset.regionFilter = 'true';
        });
    }
    showCountries();

}

function searchFunction(){
    let inputText = document.querySelector('#searchInput').value.toUpperCase();
    let countries = document.querySelectorAll(".country");
    
    countries.forEach(element => {
        let name = element.querySelector("h1");
        name = name.textContent;
        if (name.toUpperCase().indexOf(inputText) > -1){
            element.dataset.nameFilter = 'true';
        }
        else{
            element.dataset.nameFilter = 'false';
        }
    });
    showCountries();
}

function showCountries(){
    let countries = document.querySelectorAll(".country");

    countries.forEach(element => {
        if (element.dataset.regionFilter == 'true' && element.dataset.nameFilter == 'true'){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
}

//get all the elements with calss list-group-item
document.querySelectorAll('ul.dropdown-content > li').forEach(function(item) {
    // iterate and add event lstener to each of them
    item.addEventListener('click', function(elem) {
      // check if any element have a class active
      // if so then remove the class from it
      let getElemWithClass = document.querySelector('.active');
      if (getElemWithClass !== null) {
        getElemWithClass.classList.remove('active');
      }
      //add the active class to the element from which click event triggered
      item.classList.add('active')
  
    })
  })