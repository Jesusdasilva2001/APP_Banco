const express = require('express');
const router = express.Router();
const utilizador = require("../models/utilizadoresModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get authenticated utilizador");
        let result = await utilizador.getById(req.utilizador.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let utilizador= new utilizador();
        // sendig only the name
        utilizador.username = result.result.username;
        res.status(result.status).send(utilizador);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('', async function (req, res, next) {
    try {
        console.log("Register utilizador ");
        let utilizador = new utilizador();
        utilizador.username = req.body.username;
        utilizador.email = req.body.email;
        utilizador.password = req.body.password;
        let result = await utilizador.signup(utilizador);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Logout utilizador ");
        // this will delete everything in the cookie
        req.session = null;
        // Put database token to null (req.user token is undefined so saving in db will result in null)
        let result = await utilizador.saveToken(req.utilizador);
        res.status(200).send({ msg: "Useer logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login utilizador");
        let utilizador = new utilizador();
        utilizador.setUsername = (req.body.username); 
        utilizador.setEmail = (req.body.email);
        utilizador.setPassword = (req.body.password);
        let result = await utilizador.checkLogin(utilizador);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the user with the database id
        utilizador = result.result;
        let token = utils.genToken(tokenSize);
        // save token in cookie session
        req.session.token = token;
        // and save it on the database
        utilizador.token = token;
        result = await utilizador.saveToken(utilizador);
        res.status(200).send({msg: "Successful Login!"});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;