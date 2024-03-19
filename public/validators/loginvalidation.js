const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

form.addEventListener("submit", e => {
    // e.preventDefault();
    // alert("submitted")
    if(!validateInputs()){
        form.submit()
        console.log("no")
    
    }else{
        e.preventDefault();
        console.log("hi")
    }
   
    

});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".forValidation")
    errorDisplay.innerText = message
}

const validateInputs = () => {
   
    // let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let passwordUppercase = /^(?=.*?[A-Z])/;
    let passwordLower = /^(?=.*?[a-z])/;
    let passwordDigit = /^(?=.*?[0-9])/;
    let passwordSpecial = /^(?=.*?[#?!@$%^&*-])/;

    
    const emailvalue = email.value.trim();
    const passwordvalue = password.value.trim();
   
    let hasError = false; 

   
    if (emailvalue === '') {
        setError(email, 'Field is required');
        hasError = true;
    } else if (!emailRegex.test(emailvalue)) {
        setError(email, 'Invalid email address');
        hasError = true;
    // } else if (emailvalue.indexOf('@') === -1) {
    //     setError(email, 'Email address must contain "@" symbol');
    //     hasError = true;
    }else {
        setError(email, '');
    }

    if (passwordvalue === '') {
        setError(password, 'Field is required');
        hasError = true;
    } else if (passwordvalue.length < 4) {
        setError(password, 'Password must be at least 4 characters in length');
        hasError = true;
    } else if (!passwordUppercase.test(passwordvalue)) {
        setError(password, 'Password must contain at least one uppercase letter [A-Z]');
        hasError = true;
    } else if (!passwordLower.test(passwordvalue)) {
        setError(password, 'Password must contain at least one lowercase letter [a-z]');
        hasError = true;
    } else if (!passwordSpecial.test(passwordvalue)) {
        setError(password, 'Password must contain at least one special character');
        hasError = true;
    } else if (!passwordDigit.test(passwordvalue)) {
        setError(password, 'Password must contain at least one numeric value [0-9]');
        hasError = true;
    } else {
        setError(password, '');
    }

    

    return hasError; 
}
