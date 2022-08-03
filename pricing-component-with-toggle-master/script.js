$monthly=false;

const monthPrices = document.getElementsByClassName("monthly");
const anuallyPrices = document.getElementsByClassName("anually");

const button = document.getElementById("buttonChangePeriod");

button.addEventListener('click', buttonPressed)

function buttonPressed(){
    $monthly = !$monthly;
    changePeriodInfo();
}

function changePeriodInfo(){
    if($monthly){
        Array.from(monthPrices).forEach(element => {
            element.style.display = "block";
        });

        Array.from(anuallyPrices).forEach(element => {
            element.style.display = "none";
        });
    }
    else {
        Array.from(monthPrices).forEach(element => {
            element.style.display = "none";
        });

        Array.from(anuallyPrices).forEach(element => {
            element.style.display = "block";
        });
    }
}