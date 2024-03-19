

const form = document.getElementById("form")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmpassword = document.getElementById("confirmpassword")

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
    let letterOnlyRegex = /^[A-Za-z\s]*$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordUppercase = /^(?=.*?[A-Z])/;
    let passwordLower = /^(?=.*?[a-z])/;
    let passwordDigit = /^(?=.*?[0-9])/;
    let passwordSpecial = /^(?=.*?[#?!@$%^&*-])/;

    const firstnamevalue = firstname.value.trim();
    const lastnamevalue = lastname.value.trim();
    const emailvalue = email.value.trim();
    const passwordvalue = password.value.trim();
    const confirmpasswordvalue = confirmpassword.value.trim();
    let hasError = false; 

    if (firstnamevalue === '') {
        setError(firstname, "Field is required");
        hasError = true;
    } else if (!letterOnlyRegex.test(firstnamevalue)) {
        setError(firstname, "Field is required");
        hasError = true;
    } else {
        setError(firstname, "");
    }

    if (lastnamevalue === '') {
        setError(lastname, "Field is required");
        hasError = true;
    } else if (!letterOnlyRegex.test(lastnamevalue)) {
        setError(lastname, "Field is required");
        hasError = true;
    } else {
        setError(lastname, "");
    }

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

    if (confirmpasswordvalue === '') {
        setError(confirmpassword, 'Field is required');
        hasError = true;
    } else if (confirmpasswordvalue !== passwordvalue) {
        setError(confirmpassword, 'Passwords do not match');
        hasError = true;
    } else {
        setError(confirmpassword, '');
    }

    return hasError; 
}
