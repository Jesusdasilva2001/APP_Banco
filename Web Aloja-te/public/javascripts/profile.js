window.onload = async function() {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) { throw result.err; }
        window.utilizador = utilizador;
        document.getElementById('utilizador').textContent = "Hello "+windows.utlizador.name;
     } catch (err) {
        console.log(err);
        // alert("something went wrong!")

    }
}

async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err) 
            throw result.err || { err: "Not successful" }
        window.location.pathname = "/index.html";
    } catch (err) {
        console.log(err);
        // alert("something went wrong!");
    }    
}