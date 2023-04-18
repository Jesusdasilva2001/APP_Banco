async function signup() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("passsword").value;
        let res = await requestRegister(username,email,password);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
        } else {
            msgDOM.textContent = "Was not able to register";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}