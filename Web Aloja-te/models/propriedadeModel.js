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
    propriedade.alugada = dbPropriedade.alugada;
    propriedade.comprada = dbPropriedade.comprada;
    propriedade.vendida = dbPropriedade.vendida;
    propriedade.imagem = dbPropriedade.imagem;
    return propriedade;
}

class Propriedade {
    constructor(id, type, apartment, rooms, bathroom, price, address, garages, area, coordenadas, alugada, comprada, vendida, imagem) {
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
        this.alugada = alugada;
        this.comprada = comprada;
        this.vendida = vendida;
        this.imagem = imagem;  
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
        propriedade.coordenadas = this.coordenadas;
        propriedade.alugada = this.alugada;
        propriedade.comprada = this.comprada;
        propriedade.vendida = this.vendida;
        propriedade.imagem = this.imagem;
        return propriedade; 
    }

    static async getAll(filters) {
        try {
            //verificar se o filtro existe
            //select com os parametros dos filtros
            console.log(filters)
               let query = 'SELECT * FROM propriedades WHERE  1 = 1 ';
               let params = [];
               let i = 1;
               if (filters.propriedadeType) {
                    query += `AND type = $${i++} `;
                    params.push(filters.propriedadeType);
                }
                if (filters.price) {
                    query += `AND price <= $${i++} `;
                    params.push(filters.price);
                }
                if (filters.area) {
                    query += `AND area <= $${i++} `;
                    params.push(filters.area);
                }
                if (filters.tipologia) {
                    query += `AND tipologia = $${i++}`;
                    params.push(filters.tipologia);
                }
                if (filters.portugal) {
                    query += `AND portugal = $${i++}`;
                    params.push(filters.portugal);
                }
                if (filters.distrito) {
                    query += `AND distrito = $${i++}`;
                    params.push(filters.distrito);
                }
                if (filters.concelho) {
                    query += `AND concelho = $${i++}`;
                    params.push(filters.concelho);
                }
                if (filters.freguesia) {
                    query += `AND freguesia = $${i++}`;
                    params.push(filters.freguesia);
                }
                if (filters.objectivo) {
                    query += `AND objectivo = $${i++}`;
                    params.push(filters.objectivo);
                }
                if (filters.estado) {
                    query += `AND estado = $${i++}`;
                    params.push(filters.estado);
                }
            console.log(query);
            console.log(params);
            let dbResult = await pool.query(query,params);
            let dbpropriedades = dbResult.rows;
           /* if (!dbpropriedades.length){
                return { status: 401, result: { msg: "Wrong!"}};
            }*/
            let propriedades = [];
            for( let prop of dbpropriedades) {
                propriedades.push(dbPropriedadeToPropriedade(prop));
            }
                return { status: 200, result: propriedades } ;
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



    static async addPropriedade(prop) {
        try {
          const query = `
          Insert into propriedade(it_prop_id,it_prop_Size, it_localizacao,it_freguesia, it_tipo, it_saleRent, it_preco, it_dimensoes, it_descricao, it_imagem)
          values($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
          `;
          const dbResult = await pool.query(query, [prop.Size, prop.localizacao, prop.freguesia, prop.tipo, prop.saleRent, prop.preco, prop.dimensoes, prop.descricao, prop.imagem]);
          const dbPropriedade = dbResult.rows[0];
          const propriedade = new Propriedade(
            dbPropriedade.Size,
            dbPropriedade.localizacao,
            dbPropriedade.freguesia,
            dbPropriedade.tipo,
            dbPropriedade.saleRent,
            dbPropriedade.preco,
            dbPropriedade.dimensoes,
            dbPropriedade.descricao,
            dbPropriedade.imagem
          );
          return { status: 200, result: propriedade };
        } catch (err) {
          console.log(err);
          return { status: 500, result: { msg: 'Ocorreu um erro. Por favor, tente novamente.' } };
        }
      
    }
    
}

module.exports = Propriedade;