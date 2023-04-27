async function signup() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        let res = await requestSignup(name, email, pass);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
        } else {
            msgDOM.textContent = "Was not able to register";
            window.location.pathname = "../login.html";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}