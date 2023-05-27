
async function requestPropriedades () {
    try {
        const response = await fetch('/api/propriedades/');
        const result = await response.json();
        return {
            succesful: response.status === 200,
            unaunthenticated: response.status === 401,
            propriedades: result
        };
    } catch (err) {
        console.log(err);
        return { err: err };
    }
}


async function requestAddPropriedades(
    type,
    apartment,
    rooms,
    bathroom,
    price,
    address,
    garages,
    area,
    coordenadas
) {
    try {
        const response = await fetch(`/api/propriedade`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
           method: "POST",
           body: JSON.stringify({
                type: type,
                apartment: apartment,
                rooms: rooms,
                bathroom: bathroom,
                price: price,
                address: address,
                garages: garages,
                area: area,
                coordenadas: coordenadas
           }) 
        });

        return { successful: response.status === 200};
    } catch (err) {
        console.log(err);
        return { err: err};
    }
}

async function requestAddPropriedades() {
    try {
      const response = await fetch('/api/addPropriedade');
      const result = await response.json();
      return { successful: response.status === 200, data: result };
    } catch (err) {
      console.log(err);
      return { err: err };
    }
  }

