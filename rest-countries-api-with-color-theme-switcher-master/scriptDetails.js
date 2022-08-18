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

// var startingCountry = sessionStorage.getItem("countryName");

// Add api data to html file

async function displayCountry() {
    let params = new URLSearchParams(window.location.search)
    let countryUrl = params.get('country')

    const res = await fetch("https://restcountries.com/v3.1/alpha/" + countryUrl)
  
    let countryData = await res.json();
  
    countryData = countryData[0];


    // console.log(countryUrl);
    
    document.querySelector('#country-flag').src = countryData.flags.svg
    
    document.querySelector("#official-name").textContent = countryData.name.common;
    
    document.querySelector("#native-name").textContent = Object.values(countryData.name.nativeName)[0].common;
    
    document.querySelector("#population").textContent = countryData.population.toLocaleString('en-UK').replaceAll(',','.');
    
    document.querySelector("#region").textContent = countryData.region;

    document.querySelector("#sub-region").textContent = countryData.subregion;
    
    document.querySelector("#capital").textContent = countryData.capital;
    
    document.querySelector("#top-level-domain").textContent = countryData.tld;
    
    // Currencies
    let currencies = [];
    for(var el in countryData.currencies){
        currencies.push(countryData.currencies[el].name);
    }
    let currenciesString = currencies.join(', ');
    document.querySelector("#currencies").textContent = currenciesString;

    // Languages
    let languages = [];
    for(var el in countryData.languages){
        languages.push(countryData.languages[el]);
    }
    let languagesString = languages.join(', ');
    document.querySelector("#languages").textContent = languagesString;

    // Borders
    bordersContainer = document.querySelector('#borders-container');
    if (countryData.borders !== undefined){
        countryData.borders.forEach(element => {

            let countryListItem = document.createElement('li');
            countryListItem.classList.add('details-button');
            bordersContainer.appendChild(countryListItem);
    
            fetch("https://restcountries.com/v3.1/alpha/" + element)
            .then((response) => response.json())
            .then((data) => countryListItem.textContent = data[0].name.common)
            .then((data) => countryListItem.addEventListener('click', function(){
                sessionStorage.setItem('countryName' ,data.cca2);
                var url = new URL(window.location);
                var search_params = url.searchParams;
                search_params.set('country', element);
                var new_url = url.toString();
                location.href = new_url;
            }));     
        });
    }

}

if (sessionStorage.getItem('mode') == 'light'){
    toggleLightDarkMode();
}

displayCountry();

// Should return to last page with history
function returnMain(){
    var para = new URLSearchParams();
    if (document.querySelector('body').getAttribute('data-theme') == 'light'){
        para.append("light-mode", 'true');
    }
    location.href = "index.html?" + para.toString();
}

