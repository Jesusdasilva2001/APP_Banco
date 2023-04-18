const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbUtilizadorToUtilizador(dbUtilizador)  {
    let utilizador = new utilizador();
    utilizador.id = dbUtilizador.id;
    utilizador.username = dbUtilizador.username;
    utilizador.email = dbUtilizador.email;
    return utilizador;
}

class utilizador {
    constructor(id, username, password, email, token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.token = token;
    }
    export() {
        let utilizador=new utilizador();
        utilizador.username = this.username;
        utilizador.email = this.email;
        return utilizador; 
    }


    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from utilizador where id=$1", [id]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let dbUtilizador = dbUtilizadores[0];
            return { status: 200, result: 
                new User(dbUtilizador.id,dbUtilizador.username,dbUtilizador.password, dbUtilizador.email, dbUtilizador.token)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async signup(utilizador) {
        try {
            let dbResult =
                await pool.query("Select * from utilizador where username=$1", [username]);
            let dbUtilizadores = dbResult.rows;
            if (dbUtilizadores.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "username",
                        msg: "That name already exists"
                    }]
                };
            let encpass = await bcrypt.hash(utilizador.password,saltRounds);   
            dbResult = await pool.query(`Insert into utilizador (username, password)
                       values ($1,$2)`, [utilizador.username, encpass]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
 

    static async checkLogin(utilizador) {
        try {
            let dbResult =
                await pool.query("Select * from utilizador where username=$1", [username]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUtilizador = dbUtilizadores[0]; 
            let isPassword = await bcrypt.compare(dbUtilizador.username, dbUtilizador.password);
            if (!isPassword) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
           
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
                await pool.query(`Update utilizador set token=$1 where id = $2`,
                [utilizador.token,utilizador.id]);
            return { status: 200, result: {msg:"Token saved!"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getUserByToken(token) {
        try {
            let dbResult =
                await pool.query(`Select * from utilizador where token = $1`,[token]);
            let dbUtilizadores = dbResult.rows;
            if (!dbUtilizadores.length)
                return { status: 403, result: {msg:"Invalid authentication!"}} ;
            let user = dbUtilizadorToUtilizador(dbUtilizador[0]);
            return { status: 200, result: user} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = utilizador;