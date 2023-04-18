async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let result = await requestLogin(email,password);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";    
        } else {
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "/login.html";
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}