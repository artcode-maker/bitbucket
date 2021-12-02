async function sendQuery(url = "") {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',        
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return await response.text();
}

let sendQuery = "/Views/Delete.php";
postData(document.location.origin + query)
    .then((data) => {
        if(data.delete === "success") {
            alert("Account is deleted!");
            document.URL = "/";
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