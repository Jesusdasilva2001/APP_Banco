const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbPropriedadeToPropriedade(dbPropriedade)  {
    let propriedade = new Propriedade();
    propriedade.id = dbPropriedade.id;
    propriedade.type = dbPropriedade.type;
    propriedade.apartment = dbPropriedade.apartment;
    propriedade.rooms = dbPropriedade.rooms;
    propriedade.bathroom = dbPropriedade.bathroom;
    propriedade.price = dbPropriedade.price;
    propriedade.address = dbPropriedade.address;
    propriedade.garages = dbPropriedade.garages;
    propriedade.area = dbPropriedade.area;
    propriedade.coordenadas = dbPropriedade.coordenadas;
    return propriedade;
}

class Propriedade {
    constructor(id, type, apartment, rooms, bathroom, price, address, garages, area, coordenadas) {
        this.id = id;
        this.type = type;
        this.apartment = apartment;
        this.rooms = rooms;
        this.bathroom = bathroom;
        this.price = price;
        this.address = address;
        this.garages = garages;
        this.area = area;
        this.coordenadas = coordenadas;
    }
    export() {
        let propriedade=new Propriedade();
        propriedade.type = this.type;
        propriedade.apartment = this.apartment;
        propriedade.rooms = this.rooms;
        propriedade.bathroom = this.bathroom;
        propriedade.price = this.price;
        propriedade.address = this.address;
        propriedade.garages = this.garages;
        propriedade.area = this.area;
        propriedade.coordenadas = this.coordenadas
        return propriedade; 
    }

    static async getAll() {
        try {
            let dbResult = await pool.query("SELECT * from propriedades");
            let dbPropriedades = dbResult.rows;
            if (!dbPropriedades.length){
                return { status: 401, result: { msg: "Wrong!"}};
            }
            let propriedades = [];
            for( let prop of dbPropriedades) {
                propriedades.push(dbPropriedadeToPropriedade(prop));
            }
                return { status: 404, result:{msg: ""} } ;
            let dbPropriedade = dbPropriedades[0];
            return { status: 200, result: propriedades}
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async getPropriedadesByAll() {
        try {
            let dbResult =
                await pool.query(`Select * from propriedades`);
            let dbPropriedades = dbResult.rows;
            if (!dbPropriedades.length)
                return { status: 403, result: {msg:""}} ;
            let propriedade = dbPropriedadeToPropriedade(dbPropriedades[0]);
            return { status: 200, result: propriedade} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async addPropriedade() {
        try {
           
            let dbResult = await pool.query(
                `Insert into propriedade(it_prop_id,it_type,it_apartment, it_rooms,it_bathroom, it_price, it_address, it_garages, it_area, it_coordenadas)
                 values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [propriedadeId, type, apartment, rooms, bathroom, price, address, garages, area, coordenadas]);
            return {status:200, result: dbResult};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }
}

module.exports = Propriedade;