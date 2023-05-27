async function index() {
  try{
    const propertyType = document.getElementById('property-type').value;
    const tipologia = document.getElementById('tipologia').value;
    const escolhaUmPais = document.getElementById('escolha-um-país').value;
    const distrito = document.getElementById('distrito').value;
    const concelho = document.getElementById('concelho').value;
    const freguesia = document.getElementById('freguesia').value;
    const objectivo = document.getElementById('objectivo').value;
    const estado = document.getElementById('estado').value;
    const price = document.getElementById('price').value;
    const area = document.getElementById('area').value;

    const msgDOM = document.getElementById("msgDOM");
  
    const url = `http://localhost:8080/search?propertyType=${propertyType}&tipologia=${tipologia}&escolhaUmPais=${escolhaUmPais}&distrito=${distrito}&concelho=${concelho}&freguesia=${freguesia}&objectivo=${objectivo}&estado=${estado}&price=${price}&area=${area}`;

    const encodedUrl = encodeURI(url);
    const listarPropriedade = `<a href="${encodedUrl}">${encodedUrl}</a>`;

    // Pedido ao servidor
    // tratar resultado
    console.log(listarPropriedade.html);
    if (res.successful) {
      msgDOM.textContent = "submete successfully";
    } else {
      msgDOM.textContent = "Was not able to submete this information";
      window.location.pathname = "./listarPropriedade"; 
    }        
  }catch (err) {
      console.log(err);
      msgDOM.textContent = "An error occurred";   
  }
 

}