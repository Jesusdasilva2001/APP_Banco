create database alojate
-- Create the database with the name: alojate


create table utilizador (
    usr_id int not null auto_increment,
    usr_name varchar(60) not null,
    usr_email varchar(100) not null,
    usr_pass varchar(100) not null,
    usr_token varchar(200),
    primary key (usr_id)
);

create table propriedades (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    quartos INTEGER NOT NULL,
    banheiros INTEGER NOT NULL,
    garagens INTEGER NOT NULL,
    area INTEGER NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    primary key (id_propriedades)
);

create table contratos (
    id SERIAL PRIMARY KEY,
    propriedade_id INTEGER REFERENCES propriedades(id),
    cliente_id INTEGER REFERENCES clientes(id),
    tipo_contrato VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    primary key (id_contratos)
);

create table pagamentos (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER REFERENCES contratos(id),
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento DATE NOT NULL,
    tipo_pagamento VARCHAR(20) NOT NULL,
    primary key (id_pagamentos)
);

create table fotos (
    id SERIAL PRIMARY KEY,
    propriedade_id INTEGER REFERENCES propriedades(id),
    descricao VARCHAR(200),
    url VARCHAR(200) NOT NULL,
    primary key (id_fotos)
);

create table recursos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    primary key (id_recursos)
);

create table propriedade_recursos (
    id SERIAL PRIMARY KEY,
    propriedade_id INTEGER REFERENCES propriedades(id),
    recurso_id INTEGER REFERENCES recursos(id),
    primary key (id_propriedade_recursos)
);

create table reserva (
    id SERIAL PRIMARY KEY,
    propriedade_id INTEGER REFERENCES propriedades(id),
    cliente_id INTEGER REFERENCES clientes(id),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    primary key (id_reserva)
);