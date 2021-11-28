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

async function buttonClickEdit(e) {
    e.preventDefault();
    let elem, spinner, query;
    elem = document.querySelector("div[class='logo-center']");
    spinner = document.querySelector("#tmplSpinner");    
    query = "/Views/Edit.php";
    let sendData = {};
    sendData.inputLogin = document.querySelector("input[name='inputLogin']").value;
    sendData.inputPassword = document.querySelector("input[name='inputPassword']").value;
    sendData.inputEmail = document.querySelector("input[name='inputEmail']").value;
    sendData.inputName = document.querySelector("input[name='inputName']").value;

    if(elem !== null) {
        elem.innerHTML = spinner.innerHTML;
        elem.className = "form-center";
    } else {
        elem = document.querySelector("div[class='form-center']");
        elem.innerHTML = spinner.innerHTML;
    }

    postData(document.location.origin + query, sendData)
        .then((data) => {
            let result = document.querySelector("div[class='logo-center']");
            if(result !== null) {
                result.innerHTML = data;
                result.className = "form-center";
            } else {
                result = document.querySelector("div[class='form-center']");
                result.innerHTML = data;
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

try { buttonEdit === 'undefined'} 
catch {
    let buttonEdit = document.querySelector("div.form-center > form > button[type='submit']");
    if(buttonEdit !== null) buttonEdit.addEventListener("click", buttonClickEdit);
} 
finally { delete buttonEdit; }
