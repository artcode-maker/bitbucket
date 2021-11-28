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
    } else {
        
        /*let script = document.querySelector("#sign");
        if(script) script.remove();
        script = document.createElement('script');
        script.id = "sign";
        script.src = "/js/logoutScript.js";
        document.body.append(script);*/
    }
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
    }
    getData(url + query)
        .then((data) => {
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                scriptLoader(name);
                if(name !== "logout") {
                    result.innerHTML = data;
                    result.className = "form-center";
                    //e.target.removeEventListener("click", buttonClick);
                }
            } else {
                scriptLoader(name);
                if(name !== "logout") {
                    result = document.querySelector("div[class='form-center']");
                    result.innerHTML = data;
                    //e.target.removeEventListener("click", buttonClick);
                }
            }

            if(name === "logout") {
                let jsonData = JSON.parse(data);
                if(jsonData.auth === "success") {
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
if(buttonSignup !== null) buttonSignup.addEventListener("click", buttonClick);
