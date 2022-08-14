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
    countriesContainer.appendChild(parentDiv);

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
    let countriesRegions = countriesContainer.querySelectorAll('div.country > div > ul > li.region > p');

    if (region != 'All'){
        countriesRegions.forEach(element => {
            if (element.textContent !== region){
                element.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
            }
            else{
                element.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
            }
        });
    }
    else{
        countriesRegions.forEach(element => {
            element.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
        });
    }

}

