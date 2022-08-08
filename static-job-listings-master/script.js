const button = document.querySelector("#testButton");
const jobArray = Array.from(document.querySelectorAll('.job-listing'));

button.addEventListener('click', function(){

    jobArray.forEach(element => {
        element.style.display = 'none';
    })

    let filterData = Array.from(document.querySelectorAll('#filter>div>ul>li'));
    // filterData.forEach(aData => {
    //     console.log(aData.dataset);
    //     let dataFinds = document.querySelectorAll(aData.dataset);
    //     dataFinds.forEach(element => {
    //         element.parentElement.parentElement.display = 'block'
    //     });
    // });
    let dataFinds = Array.from(document.querySelectorAll('.job-listing ul [data-role-type="frontend"]'));
    dataFinds.forEach(element => {
        console.log(element.parentElement.parentElement)
        element.parentElement.parentElement.style.display = 'block';
    });
})