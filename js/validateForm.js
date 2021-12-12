async function validateForm(isRegistration) {
    let formInputs = document.querySelectorAll("div[class='form-center'] form > div > div > input");
    let isPassedValidation = true;

    formInputs.forEach(function(input) {
        if(input.getAttribute("name") === "inputConfirmPassword") { /*Do nothing*/ }
        else {
            let options = { name: input.getAttribute("name") };
            if(!inputValidator(input, options)) isPassedValidation = false;
        }
    });

    if(isPassedValidation) {
        password = document.querySelector("div[class='form-center'] form input[name='inputPassword']");
        passwordControl = document.querySelector("div[class='form-center'] form input[name='inputConfirmPassword']");
        if(passwordControl) {
            if(password.value !== passwordControl.value) {
                passwordControl.classList.add("invalid");
                if(passwordControl.classList.contains("valid")) passwordControl.classList.remove("valid");
                alert("Repeated password is not match with inputed password. Please check your password");
                return false;
            } else if(passwordControl.classList.contains("invalid")) {
                passwordControl.classList.remove("invalid");
                if(passwordControl.classList.contains("valid")) passwordControl.classList.add("valid");
            }
        }
    }

    if(isPassedValidation && isRegistration) {
        login = document.querySelector("input[name='inputLogin']");
        email = document.querySelector("input[name='inputEmail']");
        query = "/Views/CheckRegistration.php";
        let sendData = {};
        sendData.inputLogin = document.querySelector("input[name='inputLogin']").value;
        sendData.inputEmail = document.querySelector("input[name='inputEmail']").value;
        await isRegistred(document.location.origin + query, sendData)
            .then((data) => {
                let jsonData = null;
                try {
                    jsonData = JSON.parse(data);
                } catch {
                    //
                }
                if(jsonData !== null) {
                    if(jsonData.loginExists) {
                        login.classList.add("invalid");
                        if(login.classList.contains("valid")) login.classList.remove("valid");
                        alert("Login is not availible");
                        isPassedValidation = false;
                        return;
                    } else if(login.classList.contains("invalid")) {
                        login.classList.remove("invalid");
                        if(login.classList.contains("valid")) login.classList.add("valid");
                    }
    
                    if(jsonData.emailExists) {
                        email.classList.add("invalid");
                        if(email.classList.contains("valid")) email.classList.remove("valid");
                        alert("Email is not availible");
                        isPassedValidation = false;
                        return;
                    } else if(email.classList.contains("invalid")) {
                        email.classList.remove("invalid");
                        if(email.classList.contains("valid")) email.classList.add("valid");
                    }
                }

            },
            error => {
                //
            });
    }

    return isPassedValidation;
}

async function isRegistred(url = "", data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',        
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.text();
}

// 1 arg - array of errors, 2 arg - error, 3 arg - error message, 4arg - options, 5 arg - add (true) or delete (false)
function toggleValidation(arrOfErrors, error, errMsg, options, isAdd) {
    if(isAdd) {
        error.messageArray.push(errMsg);
        let index = arrOfErrors.findIndex(err => err.name === options.name);
        if(index < 0) {
            arrOfErrors.push(error);
        }
    } else {
        let index = arrOfErrors.findIndex(err => err.name === options.name);
        if(index >= 0) {
            let indexOfErrorMessage = arrOfErrors[index].messageArray.findIndex((msg) => {
                msg === errMsg;
            });
            if(indexOfErrorMessage >= 0) {
                arrOfErrors[index].messageArray.splice(indexOfErrorMessage, indexOfErrorMessage);
            }
        }
    }
    return arrOfErrors;
}

function sendMessage(input, divNotice, errors) {
    let isPassedValidation = true;
    if(errors.length > 0) {
        divNotice.textContent = "";
        input.classList.add("invalid");
        let ul = document.createElement('ul');
        for (let index = 0; index < errors.length; index++) {
            const errMsgs = errors[index].messageArray;
            for (let i = 0; i < errMsgs.length; i++) {
                const msg = errMsgs[i];
                let li = document.createElement('li');
                li.textContent = msg;
                ul.append(li);
            }
        }
        divNotice.append(ul);
        divNotice.classList.add("invalid-feedback");
        input.classList.remove("valid");
        isPassedValidation = false;
    } else {
        input.classList.remove("invalid");
        divNotice.textContent = "";
        divNotice.classList.remove("invalid-feedback");
        input.classList.add("valid");
    }

    return isPassedValidation;
}

function inputValidator(input, options) {
    let setOfErrors = new Array();
    let error = { name: "", messageArray: [] };
    let errorMessage;
    let parentElement = input.closest("div");
    let divNotice = parentElement.nextElementSibling;

    // Login validation
    if(options.name === "inputLogin") {
        error.name = options.name;

        // Empty string
        errorMessage = "Please provide a Login";
        if(input.value === "") {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // String's length
        errorMessage = "Max length is 10";
        if(input.value.length > 10) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        errorMessage = "Min length is 6";
        if(input.value.length <= 5) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Spaces
        errorMessage = "Spaces are not allowed";
        if(/\s/.test(input.value)) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }
    }

    // Password validation
    if(options.name === "inputPassword") {
        error.name = options.name;

        // Empty string
        errorMessage = "Please provide a Password";
        if(input.value === "") {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // String's length
        errorMessage = "Max length is 15";
        if(input.value.length > 15) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        errorMessage = "Min length is 6";
        if(input.value.length <= 5) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Spaces
        errorMessage = "Spaces are not allowed";
        if(/\s/.test(input.value)) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Has special character
        errorMessage = "Password should have at least one special character, one digit and one letter";
        if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(input.value))) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }
    }

    // Name validation
    if(options.name === "inputName") {
        error.name = options.name;

        // Empty string
        errorMessage = "Please provide a Name";
        if(input.value === "") {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // String's length
        errorMessage = "Max length is 10";
        if(input.value.length > 10) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        errorMessage = "Min length is 2";
        if(input.value.length <= 1) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Spaces
        errorMessage = "Spaces are not allowed";
        if(/\s/.test(input.value)) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }
    }

    // Email validation
    if(options.name === "inputEmail") {
        error.name = options.name;

        // Empty string
        errorMessage = "Please provide a Email";
        if(input.value === "") {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // String's length
        errorMessage = "Max length is 20";
        if(input.value.length > 20) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        errorMessage = "Min length is 6";
        if(input.value.length <= 6) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Spaces
        errorMessage = "Spaces are not allowed";
        if(/\s/.test(input.value)) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }

        // Correct email address
        errorMessage = "Input correct email address";
        if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.value)) {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, true);
        } else {
            setOfErrors = toggleValidation(setOfErrors, error, errorMessage, options, false);
        }
    }

    return sendMessage(input, divNotice, setOfErrors);
}

