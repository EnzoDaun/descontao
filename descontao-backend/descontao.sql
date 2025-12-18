-- Descontão - Sistema de Cupons
CREATE DATABASE IF NOT EXISTS descontao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE descontao;

-- Categorias
CREATE TABLE categoria (
  id_categoria INTEGER PRIMARY KEY AUTO_INCREMENT,
  nom_categoria VARCHAR(25) NOT NULL
);

-- Associados
CREATE TABLE associado (
  cpf_associado BIGINT PRIMARY KEY,
  nom_associado VARCHAR(40) NOT NULL,
  dtn_associado DATE,
  end_associado VARCHAR(40),
  bai_associado VARCHAR(30),
  cep_associado VARCHAR(8),
  cid_associado VARCHAR(40),
  uf_associado CHAR(2),
  cel_associado VARCHAR(15),
  email_associado VARCHAR(50) UNIQUE NOT NULL,
  sen_associado VARCHAR(255) NOT NULL
);

-- Comércios
CREATE TABLE comercio (
  cnpj_comercio BIGINT PRIMARY KEY,
  id_categoria INTEGER NOT NULL,
  raz_social_comercio VARCHAR(50) NOT NULL,
  nom_fantasia_comercio VARCHAR(30),
  end_comercio VARCHAR(40),
  bai_comercio VARCHAR(30),
  cep_comercio VARCHAR(8),
  cid_comercio VARCHAR(40),
  uf_comercio CHAR(2),
  con_comercio VARCHAR(15),
  email_comercio VARCHAR(50) UNIQUE NOT NULL,
  sen_comercio VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Cupons
CREATE TABLE cupom (
  num_cupom VARCHAR(12) PRIMARY KEY,
  tit_cupom VARCHAR(25) NOT NULL,
  cnpj_comercio BIGINT NOT NULL,
  dta_emissao_cupom DATE NOT NULL,
  dta_inicio_cupom DATE NOT NULL,
  dta_termino_cupom DATE NOT NULL,
  per_desc_cupom DECIMAL(5,2) NOT NULL,
  FOREIGN KEY (cnpj_comercio) REFERENCES comercio(cnpj_comercio)
);

-- Cupons Associados
CREATE TABLE cupom_associado (
  id_cupom_associado INTEGER PRIMARY KEY AUTO_INCREMENT,
  num_cupom VARCHAR(12) NOT NULL,
  cpf_associado BIGINT NOT NULL,
  dta_cupom_associado DATE NOT NULL,
  dta_uso_cupom_associado DATE NULL,
  FOREIGN KEY (num_cupom) REFERENCES cupom(num_cupom),
  FOREIGN KEY (cpf_associado) REFERENCES associado(cpf_associado)
);

-- Tokens de Redefinição de Senha
CREATE TABLE password_reset_token (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(50) NOT NULL,
  user_type VARCHAR(20) NOT NULL, -- 'ASSOCIADO' ou 'COMERCIO'
  expiry_date DATETIME NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais
INSERT INTO categoria (nom_categoria) VALUES
('Alimentação'),
('Vestuário'),
('Farmácia'),
('Eletrônicos'),
('Serviços');

-- Usuários de teste
INSERT INTO associado (cpf_associado, nom_associado, email_associado, sen_associado) VALUES
(12345678901, 'João Silva', 'joao@teste.com', '123456'),
(98765432100, 'Maria Santos', 'maria@teste.com', 'senha123');

INSERT INTO comercio (cnpj_comercio, id_categoria, raz_social_comercio, nom_fantasia_comercio, email_comercio, sen_comercio) VALUES
(12345678000123, 1, 'Restaurante Bom Sabor LTDA', 'Bom Sabor', 'comercio@teste.com', 'comercio123'),
(98765432000100, 2, 'Loja de Roupas Fashion LTDA', 'Fashion Store', 'loja@teste.com', 'loja456'),
(11111111000111, 3, 'Farmácia Saúde Total LTDA', 'Saúde Total', 'farmacia@teste.com', 'farm123'),
(22222222000111, 4, 'Eletrônicos Tech Store LTDA', 'Tech Store', 'tech@teste.com', 'tech123'),
(33333333000111, 5, 'Serviços Rápidos LTDA', 'Rápidos', 'servicos@teste.com', 'serv123');

-- Cupons de exemplo para cada categoria
-- Categoria 1 - Alimentação (Bom Sabor)
INSERT INTO cupom (num_cupom, tit_cupom, cnpj_comercio, dta_emissao_cupom, dta_inicio_cupom, dta_termino_cupom, per_desc_cupom) VALUES
('ALI001234567', 'Desconto Almoço', 12345678000123, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 15.00),
('ALI009876543', 'Happy Hour', 12345678000123, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 20.00);

-- Categoria 2 - Vestuário (Fashion Store)
INSERT INTO cupom (num_cupom, tit_cupom, cnpj_comercio, dta_emissao_cupom, dta_inicio_cupom, dta_termino_cupom, per_desc_cupom) VALUES
('VES001234567', 'Desconto Verão', 98765432000100, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 25.00),
('VES009876543', 'Liquidação', 98765432000100, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 20 DAY), 30.00);

-- Categoria 3 - Farmácia (Saúde Total)
INSERT INTO cupom (num_cupom, tit_cupom, cnpj_comercio, dta_emissao_cupom, dta_inicio_cupom, dta_termino_cupom, per_desc_cupom) VALUES
('FAR001234567', 'Desconto Medicamentos', 11111111000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY), 10.00),
('FAR009876543', 'Vitaminas', 11111111000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 12.00);

-- Categoria 4 - Eletrônicos (Tech Store)
INSERT INTO cupom (num_cupom, tit_cupom, cnpj_comercio, dta_emissao_cupom, dta_inicio_cupom, dta_termino_cupom, per_desc_cupom) VALUES
('ELE001234567', 'Black Friday Tech', 22222222000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 35.00),
('ELE009876543', 'Smartphones', 22222222000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 20.00);

-- Categoria 5 - Serviços (Rápidos)
INSERT INTO cupom (num_cupom, tit_cupom, cnpj_comercio, dta_emissao_cupom, dta_inicio_cupom, dta_termino_cupom, per_desc_cupom) VALUES
('SER001234567', 'Primeira Consulta', 33333333000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 90 DAY), 50.00),
('SER009876543', 'Manutenção Express', 33333333000111, CURDATE(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 15.00);

