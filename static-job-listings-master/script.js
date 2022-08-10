const clearFilterButton = document.querySelector("#clear-button");
const filterContainer = document.querySelector("#filter");

const roles = ['Frontend', 'Backend', 'Fullstack'];
const level = ['Junior', 'Midweight', 'Senior'];
const languages = ['Python', 'Ruby', 'JavaScript', 'HTML', 'CSS'];
const tools = ['React', 'Sass', 'Vue', 'Django', 'RoR'];


filterContainer.style.display = 'none';


// JSON

const jobs = [
    {
      "id": 1,
      "company": "Photosnap",
      "logo": "./images/photosnap.svg",
      "new": true,
      "featured": true,
      "position": "Senior Frontend Developer",
      "role": "Frontend",
      "level": "Senior",
      "postedAt": "1d ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["HTML", "CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 2,
      "company": "Manage",
      "logo": "./images/manage.svg",
      "new": true,
      "featured": true,
      "position": "Fullstack Developer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1d ago",
      "contract": "Part Time",
      "location": "Remote",
      "languages": ["Python"],
      "tools": ["React"]
    },
    {
      "id": 3,
      "company": "Account",
      "logo": "./images/account.svg",
      "new": true,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2d ago",
      "contract": "Part Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    },
    {
      "id": 4,
      "company": "MyHome",
      "logo": "./images/myhome.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "5d ago",
      "contract": "Contract",
      "location": "USA Only",
      "languages": ["CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 5,
      "company": "Loop Studios",
      "logo": "./images/loop-studios.svg",
      "new": false,
      "featured": false,
      "position": "Software Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript"],
      "tools": ["Ruby", "Sass"]
    },
    {
      "id": 6,
      "company": "FaceIt",
      "logo": "./images/faceit.svg",
      "new": false,
      "featured": false,
      "position": "Junior Backend Developer",
      "role": "Backend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "UK Only",
      "languages": ["Ruby"],
      "tools": ["RoR"]
    },
    {
      "id": 7,
      "company": "Shortly",
      "logo": "./images/shortly.svg",
      "new": false,
      "featured": false,
      "position": "Junior Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["HTML", "JavaScript"],
      "tools": ["Sass"]
    },
    {
      "id": 8,
      "company": "Insure",
      "logo": "./images/insure.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["Vue", "Sass"]
    },
    {
      "id": 9,
      "company": "Eyecam Co.",
      "logo": "./images/eyecam-co.svg",
      "new": false,
      "featured": false,
      "position": "Full Stack Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "3w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript", "Python"],
      "tools": ["Django"]
    },
    {
      "id": 10,
      "company": "The Air Filter Company",
      "logo": "./images/the-air-filter-company.svg",
      "new": false,
      "featured": false,
      "position": "Front-end Dev",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "1mo ago",
      "contract": "Part Time",
      "location": "Worldwide",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    }
]



window.addEventListener("DOMContentLoaded", loadJobs(jobs));


clearFilterButton.addEventListener('click', function(){
    document.querySelector("#filter > div > ul").innerHTML = '';
    document.querySelector("#jobs").innerHTML = '';
    loadJobs(jobs);
    filterContainer.style.display = 'none';
})

function applyFilters(){
    let newJobs = [...jobs];
    let filterList = document.querySelectorAll("#filter > div > ul > li > p");
    filterList.forEach(element => {
        if (roles.includes(element.innerHTML)){
          newJobs = newJobs.filter(function(item){
            return (item.role == element.innerHTML);
          })
        }

        if (level.includes(element.innerHTML)){
          newJobs = newJobs.filter(function(item){
            return (item.level == element.innerHTML);
          })
        }

        if (languages.includes(element.innerHTML)){
          newJobs = newJobs.filter(function(item){
            return (item.languages.includes(element.innerHTML));
          })
        }

        if (tools.includes(element.innerHTML)){
          newJobs = newJobs.filter(function(item){
            return (item.tools.includes(element.innerHTML));
          })
        }

    });
    loadJobs(newJobs);
}

function addFilter(button){
  document.querySelector("#filter").style.display = 'block';
  // Button that initiated function
  string = button.innerHTML;

  // Check if there is already that filter and if true exit function

  var duplication = false;
  document.querySelectorAll("#filter > div > ul > li > p").forEach(element => {
    if (string == element.innerHTML){
      duplication = true;
    }
  });
  if (duplication) {return;}

  // Creating elements to add in HTML
  let filterList = document.querySelector("#filter > div > ul");
  let elLi = document.createElement('li');
  let elP = document.createElement('p');
  

  // Text of filter
  elP.textContent = string;
  elLi.appendChild(elP);

  // Delete image on filter that will remove filter when clicked
  let elImg = document.createElement('img');
  elImg.src = 'images/icon-remove.svg';
  elImg.addEventListener('click', function(){
    elImg.parentElement.remove();
    applyFilters();

    // If filter container doesn't have more filters hide it

    if (!filterList.children.length >= 1){
      filterContainer.style.display = 'none';
    }
  })

  // Finishing appending
  elLi.appendChild(elImg);
  filterList.appendChild(elLi);

  applyFilters();
}


function loadJobs(jobsArray){
  // Creating job divs in HTML based on the current job Array given after being modified by filters
    let displayJobs = jobsArray.map(function(item){
        return `<div ${item.featured ? `class="job-listing featured"` : `class="job-listing"`}>
            <img src=${item.logo} alt=${item.logo}>
            <div class="first-row">
                <h2> ${item.company} </h2>
                <ul>
                ${item.new ? '<li class="ef-new effect"> New!</li>' : ''}
                ${item.featured ? '<li class="ef-featured effect"> Feature!</li>' : ''}
                </ul>
            </div>
            <h2> ${item.position} </h2>
            <ul class="contract-info">
                <li> ${item.postedAt} </li>
                <li> ${item.contract} </li>
                <li> ${item.location} </li>
            </ul> 
            <ul class="filter-data-container">
                
                <li>${item.role}</li>
    
                <li>${item.level}</li>
    
    
                <li>${item.languages[0]}</li>
                ${item.languages[1] ? `<li>${item.languages[1]}</li>` : ''}
                ${item.languages[2] ? `<li>${item.languages[2]}</li>` : ''}
                ${item.tools[0] ? `<li>${item.tools[0]}</li>` : ''}
                ${item.tools[1] ? `<li>${item.tools[1]}</li>` : ''}
    
            </ul>
            </div>`;
            
    })
    displayJobs = displayJobs.join("");;
  
    document.querySelector("#jobs").innerHTML = displayJobs;
    
    // Adding functionality on list items that can be clicked to add filters
    buttons = document.querySelectorAll(".job-listing > .filter-data-container > li");
    buttons.forEach(element => {
      element.addEventListener('click', (evt) => addFilter(element))
    });
    
}

