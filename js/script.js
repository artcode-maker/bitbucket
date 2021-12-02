let url = document.location.origin;

async function getData(url = "") {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',        
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/html'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return await response.text();
}

function scriptLoader(name) {
    if(name === "signin") {
        let script = document.querySelector("#sign");
        if(script) script.remove();
        script = document.createElement('script');
        script.id = "sign";
        script.src = "/js/authScript.js";
        document.body.append(script);
    } else if(name === "signup") {
        let script = document.querySelector("#sign");
        if(script) script.remove();
        script = document.createElement('script');
        script.id = "sign";
        script.src = "/js/registrationScript.js";
        document.body.append(script);
    } else if(name === "edit") {
        let script = document.querySelector("#sign");
        if(script) script.remove();
        script = document.createElement('script');
        script.id = "sign";
        script.src = "/js/editScript.js";
        document.body.append(script);
    } else if(name === "delete") {
        let script = document.querySelector("#sign");
        if(script) script.remove();
        script = document.createElement('script');
        script.id = "sign";
        script.src = "/js/deleteScript.js";
        document.body.append(script);
    }
    let validateScript = document.querySelector("#validate");
    if(validateScript) validateScript.remove();
    validateScript = document.createElement('script');
    validateScript.id = "validate";
    validateScript.src = "/js/validateForm.js";
    document.body.append(validateScript);
}

async function buttonClick(e) {
    e.preventDefault();
    let query, name, elem, spinner;
    name = e.currentTarget.getAttribute("name");
    elem = document.querySelector("div[class='logo-center']");
    spinner = document.querySelector("#tmplSpinner");
    if(elem !== null) {
        elem.innerHTML = spinner.innerHTML;
        elem.className = "form-center";
    } else {
        elem = document.querySelector("div[class='form-center']");
        elem.innerHTML = spinner.innerHTML;
    }
    if(name === "signin") {
        query = "/Views/Auth.php";
    } else if(name === "signup") {
        query = "/Views/Registration.php";
    } else if(name === "logout") {
        query = "/Views/Logout.php";
    } else if(name === "edit") {
        query = "/Views/Edit.php";
    } else if(name === "delete") {
        query = "/Views/Delete.php";
    }
    getData(url + query)
        .then((data) => {
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                scriptLoader(name);
                if(name !== "logout" && name !== "delete") {
                    result.innerHTML = data;
                    result.className = "form-center";
                }
            } else {
                scriptLoader(name);
                if(name !== "logout" && name !== "delete") {
                    result = document.querySelector("div[class='form-center']");
                    result.innerHTML = data;
                }
            }

            if(name === "logout") {
                let jsonData = JSON.parse(data);
                if(jsonData.auth === "success") {
                    document.location.href = "/";
                }
            }
            if(name === "delete") {
                let jsonData = JSON.parse(data);
                if(jsonData.delete === "success") {
                    alert("Account is deleted!");
                    document.location.href = "/";
                }
            }
        },
        error => {
            let errorMessage = "Произошла ошибка. Повторите попытку.";
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                result.textContent = errorMessage;
            } else {
                result = document.querySelector("div[class='form-center']");
                result.textContent = errorMessage;
            }
        });
}


let buttonSignin = document.querySelector("nav form button[name='signin']");
if(buttonSignin === null) {
    // buttonSignin is for log out now
    buttonSignin = document.querySelector("nav form button[name='logout']");
    if(buttonSignin !== null) buttonSignin.addEventListener("click", buttonClick);
} else {
    buttonSignin.addEventListener("click", buttonClick);
}

let buttonSignup = document.querySelector("nav form button[name='signup']");
if(buttonSignup === null) {
    // buttonSignup is for edit now
    buttonSignup = document.querySelector("nav form button[name='edit']");
    if(buttonSignup !== null) buttonSignup.addEventListener("click", buttonClick);
} else {
    buttonSignup.addEventListener("click", buttonClick);
}

let buttonDelete = document.querySelector("nav form button[name='delete']");
if(buttonDelete !== null) buttonDelete.addEventListener("click", buttonClick);
