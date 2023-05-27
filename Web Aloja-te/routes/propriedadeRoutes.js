const express = require('express');
const router = express.Router();
const Propriedades = require("../models/propriedadeModel");
const auth = require("../middleware/auth");

//?propriedadeType=apartamento&price=1000
router.get('/', async function (req, res, next){
    try {
        let result = await Propriedades.getAll(req.query);
        console.log("Get all propriedades");
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('', async function (req, res, next) {
    try {
        console.log(" ");
        let propriedade = new Propriedades();
        propriedade.type = req.body.type;
        propriedade.apartment = req.body.apartment;
        propriedade.rooms = req.body.rooms;
        propriedade.bathroom = req.body.bathroom;
        propriedade.price = req.body.price;
        propriedade.address = req.body.address;
        propriedade.garages = req.body.garages;
        propriedade.area = req.body.area;
        propriedade.coordenadas = req.body.coordenadas;
        propriedade.alugada = req.body.alugada;
        propriedade.comprada = req.body.comprada;
        propriedade.vendida = req.body.vendida;
        propriedade.imagem = req.body.imagem;
        let result = await Propriedades.addPropriedade(propriedade);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



router.get('/filter', async function (req, res, next){
    //?propriedadeType=apartamento&price=1000
    try {
        let query = 'SELECT * FROM propriedades WHERE 1 = 1';
        if (filters.propriedadeType) {
            query += `AND propriedade.type = '${filters.propriedadeType}'`;
        }
        if (filters.price) {
            query += `AND price <= '${filters.price}'`;
        }
        if (filters.area) {
            query += `AND area <= '${filters.area}'`;
        }
        if (filters.tipologia) {
            query += `AND tipologia = '${filters.tipologia}'`;
        }
        if (filters.portugal) {
            query += `AND portugal = '${filters.portugal}'`;
        }
        if (filters.distrito) {
            query += `AND distrito = '${filters.distrito}'`;
        }
        if (filters.concelho) {
            query += `AND concelho = '${filters.concelho}'`;
        }
        if (filters.freguesia) {
            query += `AND freguesia = '${filters.freguesia}'`;
        }
        if (filters.objectivo) {
            query += `AND objectivo = '${filters.objectivo}'`;
        }
        if (filters.estado) {
            query += `AND estado = '${filters.estado}'`;
        }
        
        let result = await Propriedades.getAll();
        console.log("Get all propriedades");
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        else{
            res.status(result.status).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});




router.post('/', auth.verifyAuth, async function (req, res, next) {
    try {
      console.log("Add new propriedade");
      const {
        propertySize,
        localizacao, 
        freguesia, 
        tipo,
        saleRent, 
        preco ,
        dimensoes, 
        descricao, 
        imagem
      } = req.body;
  
      const result = await Propriedade.addPropriedade(
        propertySize,
        localizacao, 
        freguesia, 
        tipo,
        saleRent, 
        preco ,
        dimensoes, 
        descricao, 
        imagem
      );
  
      res.status(result.status).send(result.result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

module.exports = router;