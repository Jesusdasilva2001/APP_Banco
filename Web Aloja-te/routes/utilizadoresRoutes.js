const express = require('express');
const router = express.Router();
const Utilizador = require("../models/utilizadoresModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get authenticated utilizador");
        let result = await Utilizador.getById(req.utilizador.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let utilizador = new utilizador();
        // sendig only the name
        utilizador.name = result.result.name;
        res.status(result.status).send(utilizador);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('', async function (req, res, next) {
    try {
        console.log("Signup utilizador ");
        let utilizador = new Utilizador();
        utilizador.name = req.body.name;
        utilizador.email = req.body.email;
        utilizador.pass = req.body.pass;
        let result = await Utilizador.signup(utilizador);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/auth', auth.verifyAuth,
    async function (req, res, next) {
    try {
        console.log("Logout utilizador ");
        // this will delete everything in the cookie
        req.session = null;
        // Put database token to null (req.user token is undefined so saving in db will result in null)
        let result = await Utilizador.saveToken(req.utilizador);
        res.status(200).send({ msg: "Utilizador logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login utilizador ");
        let utilizador = new Utilizador();
        utilizador.email = req.body.email;
        utilizador.pass = req.body.pass;
        console.log(utilizador);
        let result = await Utilizador.checkLogin(utilizador);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the utilizador with the database id
        utilizador = result.result;
        let token = utils.genToken(tokenSize);
        // save token in cookie session
        req.session.token = token;
        // and save it on the database
        utilizador.token = token;
        result = await Utilizador.saveToken(utilizador);
        res.status(200).send({msg: "Successful Login!"});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;