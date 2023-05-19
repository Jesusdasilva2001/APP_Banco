const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbUtilizadorToUtilizador(dbUtilizador)  {
    let utilizador = new Utilizador();
    utilizador.id = dbUtilizador.usr_id;
    utilizador.name = dbUtilizador.usr_name;
    return utilizador;
}

class Utilizador {
    constructor(id, name, pass, token) {
        this.id = id;
        this.name = name;
        this.pass = pass;
        this.token = token;
    }
    export() {
        let utilizador=new Utilizador();
        utilizador.name = this.name;
        return utilizador; 
    }


    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from utilizador where usr_id=$1", [id]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let dbUtilizador = dbUtilizadores[0];
            return { status: 200, result: 
                new Utilizador(dbUtilizador.id,dbUtilizador.usr_name,dbUtilizador.usr_pass, dbUtilizador.usr_token, dbUtilizador.usr_email)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async signup(utilizador) {
        try {
            let dbResult =
                await pool.query("Select * from utilizador where usr_name=$1", [utilizador.name]);
            let dbUtilizadores = dbResult.rows;
            if (dbUtilizadores.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "That name already exists"
                    }]
                };
                console.log(utilizador);
            let encpass = await bcrypt.hash(utilizador.pass,saltRounds);   
            dbResult = await pool.query(`Insert into utilizador (usr_name, usr_pass, usr_email)
                       values ($1,$2,$3)`, [utilizador.name, encpass, utilizador.email]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
 

    static async checkLogin(utilizador) {
        try {
            let dbResult =
                await pool.query("Select * from utilizador where usr_email=$1", [utilizador.email]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length)
                return { status: 401, result: { msg: "Wrong email or pass!"}};
            let dbUtilizador = dbUtilizadores[0];  
            let isPass = await bcrypt.compare(utilizador.pass,dbUtilizador.usr_pass);
            if (!isPass) 
                return { status: 401, result: { msg: "Wrong email or pass!"}};
           
            return { status: 200, result: dbUtilizadorToUtilizador(dbUtilizador) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }


    }

    // No verifications. Only to use internally
    static async saveToken(utilizador) {
        try {
            let dbResult =
                await pool.query(`Update utilizador set usr_token=$1 where usr_id = $2`,
                [utilizador.token,utilizador.id]);
            return { status: 200, result: {msg:"Token saved!"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    

    
    static async getUtilizadorByToken(token) {
        try {
            let dbResult =
                await pool.query(`Select * from utilizador where usr_token = $1`,[token]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length)
                return { status: 403, result: {msg:"Invalid authentication!"}} ;
            let utilizador = dbUtilizadorToUtilizador(dbUtilizadores[0]);
            return { status: 200, result: utilizador} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = Utilizador;