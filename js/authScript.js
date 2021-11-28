async function postData(url = "", data = {}) {
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

async function buttonClickAuth(e) {
    e.preventDefault();
    let elem, spinner, query;
    query = "/Views/Auth.php";
    elem = document.querySelector("div[class='logo-center']");
    spinner = document.querySelector("#tmplSpinner");  
    let sendData = {};
    sendData.inputLogin = document.querySelector("input[name='inputLogin']").value;
    sendData.inputPassword = document.querySelector("input[name='inputPassword']").value;

    if(elem !== null) {
        elem.innerHTML = spinner.innerHTML;
        elem.className = "form-center";
    } else {
        elem = document.querySelector("div[class='form-center']");
        elem.innerHTML = spinner.innerHTML;
    }

    postData(document.location.origin + query, sendData)
        .then((data) => {
            let jsonData = JSON.parse(data);
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                result.innerHTML = jsonData['Status'];
                if(jsonData['auth'] == true) {
                    buttonLogout = document.querySelector("nav form button[name='signin']");
                    buttonLogout.innerText  = "Log out";
                    buttonLogout.setAttribute("name", "logout");
                }
                result.className = "form-center";
            } else {
                result = document.querySelector("div[class='form-center']");
                result.innerHTML = jsonData['Status'];
                if(jsonData['auth'] == true) {
                    buttonLogout = document.querySelector("nav form button[name='signin']");
                    buttonLogout.innerText  = "Log out";
                    buttonLogout.setAttribute("name", "logout");
                    //buttonLogout.removeEventListener("click", buttonClick);
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

try { buttonAuth === 'undefined'}
catch {
    let buttonAuth = document.querySelector("div.form-center > form > button[type='submit']");
    if(buttonAuth !== null) buttonAuth.addEventListener("click", buttonClickAuth);
}
finally { delete buttonAuth; }

