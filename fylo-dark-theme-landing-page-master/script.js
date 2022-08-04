// const EmailSignUp = function(){
//     let emailText = document.querySelector("#email-container").innerHTML

//     function validation(){
//         if (emailText.includes("@gmail.com")){
//             return true;
//         }
//         return false;
//     }
// }

// class EmailAdress{

//     text ="";

//     constructor(text){
//         this.text = text;
//     }

//     get valid(){
//         return this.validation;
//     }

//     validation(){
//         if (this.text.includes("@gmail.com")){
//             console.log("true")
//             return true;
//         }
//         console.log("false")
//         return false;
//     }

//     newText(){
//         this.text=document.querySelector("#email-container").innerHTML;
//     }

// }

// const email = new EmailAdress();

const buttonEmail = document.querySelector("#email-button")
buttonEmail.addEventListener('click', email.newText)