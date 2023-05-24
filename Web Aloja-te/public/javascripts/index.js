
/*function filterItems() {
  const propriedadeType = document.getElementById("propriedadeType").value;
  const price = document.getElementById("price").value;
  const area = document.getElementById("area").value;
  const tipologia = document.getElementById("tipologia").value;
  const portugal = document.getElementById("portugal").value;
  const distrito = document.getElementById("distrito").value;
  const concelho = document.getElementById("concelho").value;
  const freguesia = document.getElementById("freguesia").value;
  const objectivo = document.getElementById("objectivo").value;
  const estado = document.getElementById("estado").value;

  const filters = {
    propriedadeType,
    price,
    area,
    tipologia,
    portugal,
    distrito,
    concelho,
    freguesia,
    objectivo,
    estado

  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/filter", true);
  xhr.setRequestHeader("Content-type", "application/json");
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.Done) {
      if (xhr.status === 200) {
        const items = JSON.parse(xhr.responseText);
      } else {
        console.log("Error:" + xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(filters));
}*/