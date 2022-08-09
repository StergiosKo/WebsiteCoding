const button = document.querySelector("#test-button");
const clearFilterButton = document.querySelector("#clear-button");

///// JSON

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

button.addEventListener('click', function(){
    document.querySelector("#jobs").innerHTML = '';
    test();
})


clearFilterButton.addEventListener('click', function(){
    document.querySelector("#jobs").innerHTML = '';
    loadJobs(jobs);
})

function test(){
    let newJobs = jobs.filter(function(item){
        return (item.role == "Frontend" && item.languages.includes("CSS") && item.languages.includes("JavaScript"))
    })
    loadJobs(newJobs);
}

function applyFilters(){
    let filterList = document.querySelectorAll("#filter > div > ul > li");
    console.log(filterList);
    filterList.forEach(element => {
        console.log(element)
    });
}

function addFilter(string){
    // let filterList = document.querySelector("#filter > div > ul");
    // let elLi = document.createElement('li');
    // let elP = document.createElement('p');
    // elP.textContent = string;
    // elLi.appendChild(elP);
    // let elImg = document.createElement('img');
    // elImg.src = 'images/icon-remove.svg';
    // elLi.appendChild(elImg);

    // filterList.appendChild(elLi);
    console.log("ok")
}


function loadJobs(jobsArray){
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
            <ul class="employee-description">
                <li> ${item.postedAt} </li>
                <li> ${item.contract} </li>
                <li> ${item.location} </li>
            </ul> 
            <ul class="roles-languages">
                
                <li> ${item.role} </li>
    
                <li> ${item.level} </li>
    
    
                <li> ${item.languages[0]} </li>
                ${item.languages[1] ? `<li> ${item.languages[1]} </li>` : ''}
                ${item.languages[2] ? `<li> ${item.languages[2]} </li>` : ''}
                ${item.tools[0] ? `<li> ${item.tools[0]} </li>` : ''}
                ${item.tools[1] ? `<li> ${item.tools[1]} </li>` : ''}
    
            </ul>
            </div>`;
            
    })
    displayJobs = displayJobs.join("");
    console.log("creating...");
  
    document.querySelector("#jobs").innerHTML = displayJobs;
    
}

