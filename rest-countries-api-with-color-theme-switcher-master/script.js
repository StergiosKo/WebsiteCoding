const CountriesApi = function(selector){
    const countriesDataUrl = "https://restcountries.com/v3.1/all";
    const countriesContainer = document.querySelector(selector);
    const regionFilterItems = document.querySelectorAll('.dropdown-content > li');
    const searchInput = document.querySelector('#searchInput');
    const lightModeButton = document.querySelector('#lightModeButton');

    async function createAllCountries(){
        const res = await fetch(countriesDataUrl);
    
        let countriesData = await res.json();
        countriesData.forEach(country => {
            createCountry(country);
        });
    }

    async function createCountry(countryData) {

        let html = `<div class='country' data-cca2=${countryData.cca2}>
            <img src=${countryData.flags.svg}>
            <div>
                <h1>${countryData.name.common}</h1>
                <ul>
                <li><h2>Population</h2><p>${countryData.population}</p></li>
                <li class='region'><h2>Region</h2><p>${countryData.region}</p></li>
                <li><h2>Capital</h2><p>${countryData.capital}</p></li>
                </ul>
            </div>
        </div>`;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        document.querySelector(`[data-cca2=${countryData.cca2}]`).addEventListener('click', function(){
            var para = new URLSearchParams();
            para.append("country", countryData.cca2);
            location.href = "details.html?" + para.toString();
        })
     }

    function toggleLightDarkMode(){
        var body = document.querySelector('body');
        if (body.getAttribute('data-theme') == 'default'){
            body.removeAttribute('data-theme');
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('mode', 'light');
        }
        else{
            body.removeAttribute('data-theme');
            body.setAttribute('data-theme', 'default');
            localStorage.setItem('mode', 'dark');
        }
    }
    
    function filterByRegion(region){
        countriesContainer.innerHTML = '';
    
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
            let inputText = searchInput.value.toLowerCase();
    
            // Can add if input text length > 3
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

    const init = function () {
        
        createAllCountries();

        // Region Filter
        regionFilterItems.forEach(element => {
            element.addEventListener('click', (evt) => filterByRegion(element.textContent));
            element.addEventListener('click', function(){
                removeActiveItem();
                element.classList.add('active');
            })
        });

        // Search Function
        
        searchInput.addEventListener('keyup', searchFunction);

        // Light Mode
        lightModeButton.addEventListener('click', (evt) => toggleLightDarkMode())

        // Should change with local storage
        if (localStorage.getItem('mode') == 'light'){
            toggleLightDarkMode();
        }
    }

    init();

    // If another object required access to methods
    // return {
    //     filterByRegion
    // }
}

let ccapi = new CountriesApi('#countries-container');