let url = document.location.origin;

async function getData(url = "") {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',        
        credentials: 'omit',
        headers: {
            'Content-Type': 'text/html'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return await response.text();
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
    } else {
        query = "/Views/Registration.php";
    }
    getData(url + query)
        .then((data) => {
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                result.innerHTML = data;
                result.className = "form-center";
            } else {
                result = document.querySelector("div[class='form-center']");
                result.innerHTML = data;
                if(name === "signin") {
                    let script = document.querySelector("#sign");
                    if(script) script.remove();
                    script = document.createElement('script');
                    script.id = "sign";
                    script.src = "/js/authScript.js";
                    document.body.append(script);
                } else {
                    let script = document.querySelector("#sign");
                    if(script) script.remove();
                    script = document.createElement('script');
                    script.id = "sign";
                    script.src = "/js/registrationScript.js";
                    document.body.append(script);
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
let buttonSignup = document.querySelector("nav form button[name='signup']");
if(buttonSignin !== null) buttonSignin.addEventListener("click", buttonClick);
if(buttonSignup !== null) buttonSignup.addEventListener("click", buttonClick);

