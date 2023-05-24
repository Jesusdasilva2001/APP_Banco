window.onload = async function() {
    //let filter = sessionStorage.getItem("filter");
    //mandar objeto de filter    
    fetch ("http://localhost:8080/api/Propriedade").then(response => {
        response.json().then(propriedades => {
            populatePropriedades (propriedades); 
        }) .catch(error => console.log (error));

    }).catch(error => console.log (error));
}




function populatePropriedades(propriedades) {
    let container = document.getElementById("");
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
    const parentElement = document.querySelector(".box-container")
    for (const propriedade of propriedades) {
        propriedade.image = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-family-house-front-yard-106399.jpg"
        const boxElement = document.createElement("div")
        boxElement.classList.add("box")
        boxElement.innerHTML = `
            <div class="thumb">
                <p class="total-images"><i class="far fa-image"></i><span>4</span></p>
                <p class="type"><span>${propriedade.type}</span><span>sale</span></p>
                <form action="" method="post" class="save">
                    <button type="submit" name="save" class="far fa-heart"></button>
                </form>
                <img src="${propriedade.image}" alt="">
            </div>
            <h3 class="name">modern flats and appartments</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i><span>${propriedade.address}</span></p>
            <div class="flex">
                <p><i class="fas fa-bed"></i><span>${propriedade.rooms}</span></p>
                <p><i class="fas fa-bath"></i><span>${propriedade.bathroom}</span></p>
                <p><i class="fas fa-maximize"></i><span>750sqft</span></p>
            </div>
            <a href="http://localhost:8080/view_propriedade.html" class="btn">view property</a>
        `
        parentElement.appendChild(boxElement)
    }
}


