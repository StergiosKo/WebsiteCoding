const button = document.querySelector("#testButton");
const jobArray = Array.from(document.querySelectorAll('.job-listing'));

button.addEventListener('click', function(){
    let filterData = Array.from(document.querySelectorAll('#filter>div>ul'));
    jobArray.forEach(element => {
        if (hasAllFilterData(element, filterData)){
            element.style.display = 'none';
        }
        else element.style.display = 'block';
    })
})

function hasAllFilterData(jobElement, filterData){
    let listItemsData = jobElement.querySelectorAll('ul>li');
    filterData.forEach(element => {
        if(!hasSpecificFilterData(listItemsData, element)){
            return false;
        }
    });
    return true;
}

function hasSpecificFilterData(elements, data){
    elements.forEach(element => {
        console.log(element);
        if (element.hasAttribute(data)){
            return true;
        }
    });
    return false;
}