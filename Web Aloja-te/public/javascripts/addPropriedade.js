async function addPropriedade() {
    try{
        var type = document.getElementById('propriedade-size').value;
        var apartment = document.getElementById('apartment').value;
        var rooms = document.getElementById('rooms').value;
        var bathroom = document.getElementById('bathroom').value;
        var price = document.getElementById('price').value;
        var address = document.getElementById('address').value;
        var garages = document.getElementById('garages').value;
        var area = document.getElementById('area').value;
        var coordenadas = document.getElementById('coordenadas').value;
        var alugada = document.getElementById('alugada').value;
        var comprada = document.getElementById('comprada').value;
        var vendida = document.getElementById('vendida').value;
        var imagem = document.getElementById('imagem').value;

        let res = await addPropriedade(type, apartment, rooms, bathroom, price,address, garages, area,coordenadas,alugada, comprada,vendida, imagem ) 
        
    }catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
   

}

// Estou a associar a funcao ao evento de envio do formulario
var formulario = document.getElementById('formulario');
formulario.addEventListener("submeter", function(event) {
    event.preventDefault();
    addPropriedade();
});



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
            window.location.pathname = "./login.html";
            window.location.pathname = "./index2.html";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}