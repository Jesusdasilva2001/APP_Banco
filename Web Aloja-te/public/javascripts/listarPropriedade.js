function populatePropriedades(propriedades) {
    let container = document.getElementById("shoplists");
    for (let prop of propriedades) {
        let li = document.createElement("li");
        li.textContent = prop.name;
        li.onclick = () => { openPropriedade(prop.id);};
        container.appendChild(li);
    }
}

function openPropriedade(id) {
    sessionStorage.setPropriedade("propriedadetId",id);
    window.location.pathname = "listarPropriedade.html";
}

function populatePropriedades(propriedades) {
    let container = document.getElementById("propriedades");
    for (let it of propriedades) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        if (it.img) {
            img.src = it.img;
        } else {
            img.src = "https://images.unsplash.com/photo-1501080254287-69204825cf5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODB8fGhvdXNlJTIwaW4lMjBsaXNib258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
            img.src = "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVudCUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
        }   
        li.appendChild(img);
        let sec = document.createElement("div");
        li.appendChild(sec);
        // For the div
        let name = document.createElement("");
        name.textContent = it.type;
        sec.appendChild(type);
        let apartment = document.createElement("p");
        apartment.textContent = ``;
        sec.appendChild(apartment);
        container.appendChild(li);
    }
}