-- None at the moment,utilizadores must be created using the API because of the bcrypt

INSERT INTO propriedades (tipo, endereco, quartos, banheiros, garagens, area, preco) VALUES 
('Casa', 'Rua A, 123', 3, 2, 2, 200, 1000000.00),
('Apartamento', 'Rua B, 456', 2, 1, 1, 80, 500000.00),
('Sítio', 'Estrada C, Km 10', 5, 3, 0, 500, 1500000.00);


INSERT INTO utilizadores (username, email, password) VALUES 
('João Silva', 'joao.silva@example.com', '123456'),
('Maria Santos', 'maria.santos@example.com', 'abcdef');


INSERT INTO contratos (propriedade_id, cliente_id, tipo_contrato, data_inicio, data_fim, valor_total, status) VALUES 
(1, 1, 'Venda', '2022-01-01', NULL, 1000000.00, 'Finalizado'),
(2, 2, 'Arrendamento', '2022-02-01', '2023-02-01', 20000.00, 'Ativo'),
(3, 1, 'Venda', '2022-03-01', NULL, 1500000.00, 'Em andamento');

INSERT INTO pagamentos (contrato_id, valor, data_pagamento, tipo_pagamento) VALUES 
(2, 5000.00, '2022-02-10', 'Boleto'),
(2, 5000.00, '2022-03-10', 'Boleto'),
(2, 5000.00, '2022-04-10', 'Boleto'),
(2, 5000.00, '2022-05-10', 'Boleto'),
(2, 5000.00, '2022-06-10', 'Boleto'),
(2, 2000.00, '2022-07-10', 'Cartão de Crédito');

INSERT INTO fotos (propriedade_id, descricao, url) VALUES 
(1, 'Fachada', 'https://example.com/propriedades/1/fachada.jpg'),
(1, 'Quarto 1', 'https://example.com/propriedades/1/quarto1.jpg'),
(1, 'Quarto 2', 'https://example.com/propriedades/2/quarto2.jpg'),
