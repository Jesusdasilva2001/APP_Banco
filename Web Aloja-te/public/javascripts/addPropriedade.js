
  
function validateForm() {
       const propertySize = document.getElementById("property-size").value;
       const localizacao = document.getElementById("location").value;
       const freguesia = document.getElementById("freguesia").value;
       const tipo = document.getElementById("type").value;
       let rent = "";
       if(document.getElementById("rent").value){
        rent = "rent";
       } else {
        rent = "sale";
       }
       const preco = document.getElementById("price").value;
       const dimensoes = document.getElementById("dimensions").value;
       const descricao = document.getElementById("description").value;
       const imagem = document.getElementById("pictures").value;
    
  
    // Realizar validações dos campos aqui
    if (propertySize.trim() === '') {
      alert('Por favor, inserir o tamanho da propriedade.');
      return;
    }
  
    if (localizacao.trim() === '') {
      alert('Por favor, preencha a localizacao.');
      return;
    }
  
    if (freguesia.trim() === '') {
      alert('Por favor, escolha a freguesia.');
      return;
    }
  
  
    if (tipo.trim() === '') {
      alert('Por favor, selecione o tipo de propriedade.');
      return;
    }
  
  
    if (preco.trim() === '') {
      alert('Por favor, inserir o preco.');
      return;
    }
  
    if (dimensoes.trim() === '') {
      alert('Por favor, preencha as dimensoes.');
      return;
    }
  
    if (descricao.trim() === '') {
      alert('Por favor, preencha a descricao.');
      return;
    }
    if (imagem.trim() === '') {
      alert('Por favor, inserir imagem.');
      return;
    }
  
    const propriedade = {
        propertySize,
        localizacao, 
        freguesia, 
        tipo,
        rent, 
        preco ,
        dimensoes, 
        descricao, 
        imagem
    };
  
    // Enviar a propriedade para a API
    addPropriedade(propriedade)
      .then((response) => {
        console.log(response);
        // Limpar o formulário e exibir uma mensagem de sucesso
        propriedadeForm.reset();
        alert('Propriedade feito com sucesso!');
      })
      .catch((error) => {
        console.error(error);
        // Exibir uma mensagem de erro
        alert('Ocorreu um erro. Por favor, tente novamente.');
      });
    }
  

 async function addPropriedade(propriedade) {
    return fetch('/api/propriedade', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
            },
            body: JSON.stringify(propriedade)
        })
        .then((response) => response.json())
        .catch((error) => {
        console.error(error);
            return { msg: 'Ocorrreu u erro. Por favor, tente novamente'};
    });
}
   
    

  