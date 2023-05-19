async function addPropriedade() {
    var typology = document.getElementById('propriedade-size').value;
    var location = document.getElementById('location').value;
    var freguesia = document.getElementById('freguesia').value;
    var type = document.getElementById('type').value;
    var saleRent = document.getquerySelector('input[name="sale_rent"]:checked').value;
    var price = document.getElementById('price').value;
    var dimensions = document.getElementById('dimensions').value;
    var description = document.getElementById('description').value;



    var propriedade = {
        typology: typology, 
        location: location, 
        freguesia: freguesia, 
        type: type,  
        saleRent: saleRent, 
        price: price, 
        dimensions: dimensions,
        description: description 
    };
      
    console.log(propriedade);
} 

// Estou a associar a funcao ao evento de envio do formulario
var formulario = document.getElementById('formulario');
formulario.addEventListener("submeter", function(event) {
    event.preventDefault();
    addPropriedade();
});