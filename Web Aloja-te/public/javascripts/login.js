async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        let result = await requestLogin(email,pass);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong email or pass";    
        } else {
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "./index.html";
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}