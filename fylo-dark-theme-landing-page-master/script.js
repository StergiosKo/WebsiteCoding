const buttonEmail = document.querySelector("#email-button")

buttonEmail.addEventListener('click', function(){
    let text = document.querySelector("#emailInput").value;
    let errorMessage = document.querySelector("#error-message");
    if (text == ""){
        errorMessage.innerHTML = "Email address is empty";
    }
    else if (!text.includes("@gmail.com")){
        errorMessage.innerHTML = "Please enter a valid email address";
    }
})