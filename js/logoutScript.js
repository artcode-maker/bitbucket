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

let query = "/Views/Logout.php";
postData(document.location.origin + query, JSON.stringify({"auth":"logout"}))
    .then((data) => {
        if(data.auth === "success") {
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


