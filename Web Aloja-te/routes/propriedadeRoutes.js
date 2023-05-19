const express = require('express');
const router = express.Router();
const Propriedades = require("../models/propriedadeModel");
const auth = require("../middleware/auth");


router.get('/', async function (req, res, next){
    try {
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
        let result = await Propriedades(propriedade);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;