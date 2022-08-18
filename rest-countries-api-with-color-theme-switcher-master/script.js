const countriesDataUrl = "https://restcountries.com/v3.1/all";
const greeceUrl = "https://restcountries.com/v3.1/alpha/gr";

const countriesContainer = document.querySelector('#countries-container');


async function createAllCountries(){
    const res = await fetch(countriesDataUrl);

    let countriesData = await res.json();
    countriesData.forEach(country => {
        createCountry(country);
    });
}

createAllCountries();

async function createCountry(countryData) {

    // Parent
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('country');
    parentDiv.setAttribute('data-region-filter', 'true');
    parentDiv.setAttribute('data-name-filter', 'true');
    parentDiv.addEventListener('click', function(){
        // sessionStorage.setItem('countryName' ,countryData.cca2);
        // location.href = 'details.html?country=' + countryData.cca2;
        var para = new URLSearchParams();
        para.append("country", countryData.cca2);
        location.href = "details.html?" + para.toString();
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
        body.setAttribute('data-theme', 'light');
        sessionStorage.setItem('mode', 'light');
    }
    else{
        body.removeAttribute('data-theme');
        body.setAttribute('data-theme', 'default');
        sessionStorage.setItem('mode', 'dark');
    }
}

function filterByRegion(region){
    countriesContainer.innerHTML = '';
    let searchInput = document.querySelector('#searchInput');

    if (region !== 'All'){

        
        if (!searchInput.value){
            fetch('https://restcountries.com/v3.1/region/' + region.toLowerCase())
            .then(res =>{return res.json()})
            .then(data=>{
                data.forEach(country => {
                    createCountry(country);
                })
            })
            .catch(error=>console.log(error))
        }
        else{
            searchFunction();
        }

    }
    else{
        if (!searchInput.value){
            createAllCountries()
        }
        else{
            searchFunction();
        }
    }
    // showCountries();

}


function searchFunction(){

    //Delaying the function execute
    if (this.timer) {
        window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(function() {
    
        //Execute the function code here...
        countriesContainer.innerHTML = '';
        // removeActiveItem()
        let regionFilter = document.querySelector('.active');
        if (regionFilter !== null) {regionFilter = regionFilter.textContent}
        let inputText = document.querySelector('#searchInput').value.toLowerCase();

        if(inputText != ''){
        
            fetch('https://restcountries.com/v3.1/name/' + inputText)
            .then(res =>{return res.json()})
            .then(data=>{
                data.forEach(country => {
                    if (regionFilter != 'All' && regionFilter != null){
                        if (regionFilter == country.region){
                            createCountry(country);
                        }
                    }
                    else{
                        createCountry(country);
                    }
                    
                })
            })
            .catch(error=>console.log(error))
        }
        else{
            createAllCountries()
        }

    
    }, 500);
}

// function showCountries(){
//     let countries = document.querySelectorAll(".country");

//     countries.forEach(element => {
//         if (element.dataset.regionFilter == 'true' && element.dataset.nameFilter == 'true'){
//             element.style.display = 'block';
//         }
//         else{
//             element.style.display = 'none';
//         }
//     });
// }

function removeActiveItem(){
    let getElemWithClass = document.querySelector('.active');
    if (getElemWithClass !== null) {
      getElemWithClass.classList.remove('active');
    }
}

//get all the elements list-group-item
document.querySelectorAll('ul.dropdown-content > li').forEach(function(item) {
    // iterate and add event lstener to each of them
    item.addEventListener('click', function(elem) {
      // check if any element have a class active
      // if so then remove the class from it
      removeActiveItem()
      //add the active class to the element from which click event triggered
      item.classList.add('active')
  
    })
})

if (sessionStorage.getItem('mode') == 'light'){
    toggleLightDarkMode();
}