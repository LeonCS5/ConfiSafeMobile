-- =========================
-- ConfiSafeDB v0.3
-- ultima modificação 24/04/26
-- =========================
CREATE DATABASE confisafeDB;
USE confisafeDB;

-- =========================
-- TABELAS
-- =========================

CREATE TABLE DEPARTAMENTO (
    id_departamento INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE CARGO (
    id_cargo INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE GESTOR (
    id_gestor INT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    perfil VARCHAR(100)
);

CREATE TABLE EPI (
    id_epi INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    ca VARCHAR(100) UNIQUE
);

CREATE TABLE AMBIENTE (
    id_ambiente INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

CREATE TABLE FUNCIONARIO (
    id_funcionario INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) UNIQUE,
    id_cargo INT,
    id_departamento INT,
    status VARCHAR(50),
    tag_rfid VARCHAR(100) UNIQUE,
    FOREIGN KEY (id_cargo) REFERENCES CARGO(id_cargo),
    FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento)
);

CREATE TABLE AMBIENTE_EPI (
    id_ambiente INT,
    id_epi INT,
    PRIMARY KEY (id_ambiente, id_epi),
    FOREIGN KEY (id_ambiente) REFERENCES AMBIENTE(id_ambiente),
    FOREIGN KEY (id_epi) REFERENCES EPI(id_epi)
);

CREATE TABLE SENSOR_IOT (
    id_sensor INT PRIMARY KEY,
    codigo_mac VARCHAR(100) UNIQUE,
    tipo VARCHAR(100),
    id_ambiente INT,
    FOREIGN KEY (id_ambiente) REFERENCES AMBIENTE(id_ambiente)
);

CREATE TABLE EVENTO_IOT (
    id_evento INT PRIMARY KEY,
    id_sensor INT,
    id_funcionario INT,
    data_hora TIMESTAMP,
    status_conformidade VARCHAR(100),
    detalhe_infracao VARCHAR(255),
    FOREIGN KEY (id_sensor) REFERENCES SENSOR_IOT(id_sensor),
    FOREIGN KEY (id_funcionario) REFERENCES FUNCIONARIO(id_funcionario)
);

CREATE TABLE FUNCIONARIO_EPI (
    id_entrega INT PRIMARY KEY,
    id_funcionario INT,
    id_epi INT,
    id_gestor_entregou INT,
    data_entrega DATE,
    data_devolucao DATE,
    FOREIGN KEY (id_funcionario) REFERENCES FUNCIONARIO(id_funcionario),
    FOREIGN KEY (id_epi) REFERENCES EPI(id_epi),
    FOREIGN KEY (id_gestor_entregou) REFERENCES GESTOR(id_gestor)
);

CREATE TABLE OCORRENCIA (
    id_ocorrencia INT PRIMARY KEY,
    id_funcionario INT,
    id_ambiente INT,
    id_gestor_responsavel INT,
    data_hora TIMESTAMP,
    tipo VARCHAR(100),
    descricao TEXT,
    status VARCHAR(50),
    FOREIGN KEY (id_funcionario) REFERENCES FUNCIONARIO(id_funcionario),
    FOREIGN KEY (id_ambiente) REFERENCES AMBIENTE(id_ambiente),
    FOREIGN KEY (id_gestor_responsavel) REFERENCES GESTOR(id_gestor)
);

-- =========================
-- INSERTS (10 POR TABELA)
-- =========================

INSERT INTO DEPARTAMENTO VALUES
(1,'Produção'),
(2,'RH'),
(3,'TI'),
(4,'Logística'),
(5,'Qualidade'),
(6,'Manutenção'),
(7,'Segurança'),
(8,'Financeiro'),
(9,'Compras'),
(10,'Jurídico');

INSERT INTO CARGO VALUES
(1,'Operador'),
(2,'Analista'),
(3,'Supervisor'),
(4,'Gerente'),
(5,'Técnico'),
(6,'Assistente'),
(7,'Engenheiro'),
(8,'Coordenador'),
(9,'Diretor'),
(10,'Estagiário');

INSERT INTO GESTOR VALUES
(1,'João Silva','joao@email.com','123','admin'),
(2,'Maria Souza','maria@email.com','123','gestor'),
(3,'Carlos Lima','carlos@email.com','123','gestor'),
(4,'Ana Paula','ana@email.com','123','gestor'),
(5,'Bruno Alves','bruno@email.com','123','gestor'),
(6,'Fernanda Rocha','fernanda@email.com','123','gestor'),
(7,'Ricardo Dias','ricardo@email.com','123','gestor'),
(8,'Patricia Gomes','patricia@email.com','123','gestor'),
(9,'Lucas Martins','lucas@email.com','123','gestor'),
(10,'Juliana Costa','juliana@email.com','123','gestor');

INSERT INTO EPI VALUES
(1,'Capacete','Cabeça','CA1'),
(2,'Luva','Mão','CA2'),
(3,'Óculos','Olhos','CA3'),
(4,'Bota','Pés','CA4'),
(5,'Máscara','Respiração','CA5'),
(6,'Protetor Auricular','Ouvido','CA6'),
(7,'Cinto','Segurança','CA7'),
(8,'Avental','Corpo','CA8'),
(9,'Respirador','Respiração','CA9'),
(10,'Viseira','Face','CA10');

INSERT INTO AMBIENTE VALUES
(1,'Fábrica','Área produtiva'),
(2,'Escritório','Administrativo'),
(3,'Almoxarifado','Estoque'),
(4,'Laboratório','Testes'),
(5,'Obra','Construção'),
(6,'Oficina','Reparos'),
(7,'Campo','Externo'),
(8,'Sala TI','Servidores'),
(9,'Recepção','Entrada'),
(10,'Treinamento','Cursos');

INSERT INTO FUNCIONARIO VALUES
(1,'Pedro','111',1,1,'ativo','RF1'),
(2,'Lucas','222',2,2,'Ativo','RF2'),
(3,'Ana','333',3,3,'Ativo','RF3'),
(4,'Julia','444',4,4,'Ativo','RF4'),
(5,'Carlos','555',5,5,'Ativo','RF5'),
(6,'Paula','666',6,6,'Ativo','RF6'),
(7,'Bruno','777',7,7,'Ativo','RF7'),
(8,'Marcos','888',8,8,'Ativo','RF8'),
(9,'Fernanda','999',9,9,'Ativo','RF9'),
(10,'Rafaela','000',10,10,'Ativo','RF10');

INSERT INTO SENSOR_IOT VALUES
(1,'MAC1','Temp',2),
(2,'MAC2','Temp',2),
(3,'MAC3','RFID',3),
(4,'MAC4','RFID',4),
(5,'MAC5','RFID',5),
(6,'MAC6','RFID',6),
(7,'MAC7','RFID',7),
(8,'MAC8','RFID',8),
(9,'MAC9','RFID',9),
(10,'MAC10','RFID',10);

INSERT INTO EVENTO_IOT VALUES
(1,1,1,NOW(),'OK',''),
(2,2,2,NOW(),'OK',''),
(3,3,3,NOW(),'Falha','Sem EPI'),
(4,4,4,NOW(),'OK',''),
(5,5,5,NOW(),'OK',''),
(6,6,6,NOW(),'Falha','Sem capacete'),
(7,7,7,NOW(),'OK',''),
(8,8,8,NOW(),'OK',''),
(9,9,9,NOW(),'OK',''),
(10,10,10,NOW(),'OK','');

INSERT INTO FUNCIONARIO_EPI VALUES
(1,1,1,1,CURDATE(),NULL),
(2,2,2,2,CURDATE(),NULL),
(3,3,3,3,CURDATE(),NULL),
(4,4,4,4,CURDATE(),NULL),
(5,5,5,5,CURDATE(),NULL),
(6,6,6,6,CURDATE(),NULL),
(7,7,7,7,CURDATE(),NULL),
(8,8,8,8,CURDATE(),NULL),
(9,9,9,9,CURDATE(),NULL),
(10,10,10,10,CURDATE(),NULL);

INSERT INTO OCORRENCIA VALUES
(1,1,1,1,NOW(),'Infração','Sem EPI','aberta'),
(2,2,2,2,NOW(),'Alerta','Teste','aberta'),
(3,3,3,3,NOW(),'Infração','Erro','fechada'),
(4,4,4,4,NOW(),'Alerta','Teste','aberta'),
(5,5,5,5,NOW(),'Infração','Erro','aberta'),
(6,6,6,6,NOW(),'Alerta','Teste','fechada'),
(7,7,7,7,NOW(),'Infração','Erro','aberta'),
(8,8,8,8,NOW(),'Alerta','Teste','aberta'),
(9,9,9,9,NOW(),'Infração','Erro','fechada'),
(10,10,10,10,NOW(),'Alerta','Teste','aberta');


-- =========================
-- SUBSELECTS
-- =========================

-- FUNCIONARIO (SUBSELECT 1)
INSERT INTO FUNCIONARIO
SELECT
11,
'João Pedro',
'12345678901',
(SELECT id_cargo FROM CARGO WHERE nome = 'Operador'),
(SELECT id_departamento FROM DEPARTAMENTO WHERE nome = 'Produção'),
'Ativo',
'RF11';

-- AMBIENTE_EPI (SUBSELECT 2)
INSERT INTO AMBIENTE_EPI
SELECT
(SELECT id_ambiente FROM AMBIENTE WHERE nome = 'Fábrica'),
(SELECT id_epi FROM EPI WHERE nome = 'Capacete');

-- SENSOR_IOT (SUBSELECT 3)
INSERT INTO SENSOR_IOT
SELECT
11,
'MAC11',
'RFID',
(SELECT id_ambiente FROM AMBIENTE WHERE nome = 'Fábrica');

-- EVENTO_IOT (SUBSELECT 4)
INSERT INTO EVENTO_IOT
SELECT
11,
(SELECT id_sensor FROM SENSOR_IOT WHERE codigo_mac = 'MAC11'),
(SELECT id_funcionario FROM FUNCIONARIO WHERE nome = 'João Pedro'),
NOW(),
'OK',
'';

-- FUNCIONARIO_EPI (SUBSELECT 5)
INSERT INTO FUNCIONARIO_EPI
SELECT
11,
(SELECT id_funcionario FROM FUNCIONARIO WHERE nome = 'João Pedro'),
(SELECT id_epi FROM EPI WHERE nome = 'Capacete'),
(SELECT id_gestor FROM GESTOR WHERE nome_completo = 'João Silva'),
CURDATE(),
NULL;

-- OCORRENCIA (SUBSELECT 6)
INSERT INTO OCORRENCIA
SELECT
11,
(SELECT id_funcionario FROM FUNCIONARIO WHERE nome = 'João Pedro'),
(SELECT id_ambiente FROM AMBIENTE WHERE nome = 'Fábrica'),
(SELECT id_gestor FROM GESTOR WHERE nome_completo = 'João Silva'),
NOW(),
'Infração',
'Sem uso de capacete',
'aberta';

-- =========================
-- UPDATE
-- =========================
UPDATE FUNCIONARIO SET status='Inativo' WHERE id_funcionario=10;
UPDATE EPI SET tipo='Proteção Respiratória' WHERE id_epi=5;
UPDATE AMBIENTE SET descricao='Área crítica' WHERE id_ambiente BETWEEN 1 AND 3;
UPDATE GESTOR SET perfil='admin' WHERE id_gestor IN (1,2);
UPDATE FUNCIONARIO SET nome='Pedro Santos' WHERE id_funcionario=1;

-- =========================
-- DELETE
-- =========================
DELETE FROM OCORRENCIA WHERE id_ocorrencia=10;
DELETE FROM EVENTO_IOT WHERE id_evento=10;
DELETE FROM FUNCIONARIO_EPI WHERE id_entrega=10;
DELETE FROM SENSOR_IOT WHERE id_sensor=10;
DELETE FROM FUNCIONARIO WHERE id_funcionario=10;

-- =========================
-- INNER JOIN
-- =========================

SELECT f.nome, c.nome AS cargo
FROM FUNCIONARIO f
INNER JOIN CARGO c ON f.id_cargo = c.id_cargo;

SELECT f.nome, d.nome AS departamento
FROM FUNCIONARIO f
INNER JOIN DEPARTAMENTO d ON f.id_departamento = d.id_departamento;

SELECT f.nome, e.nome AS epi
FROM FUNCIONARIO_EPI fe
INNER JOIN FUNCIONARIO f ON fe.id_funcionario = f.id_funcionario
INNER JOIN EPI e ON fe.id_epi = e.id_epi;

SELECT s.tipo, a.nome
FROM SENSOR_IOT s
INNER JOIN AMBIENTE a ON s.id_ambiente = a.id_ambiente;

SELECT o.tipo, f.nome
FROM OCORRENCIA o
INNER JOIN FUNCIONARIO f ON o.id_funcionario = f.id_funcionario;

-- =========================
-- VIEWS
-- =========================

CREATE VIEW vw_funcionario_cargo AS
SELECT f.nome, c.nome AS cargo
FROM FUNCIONARIO f
INNER JOIN CARGO c ON f.id_cargo = c.id_cargo;

CREATE VIEW vw_funcionario_departamento AS
SELECT f.nome, d.nome AS departamento
FROM FUNCIONARIO f
INNER JOIN DEPARTAMENTO d ON f.id_departamento = d.id_departamento;

CREATE VIEW vw_entrega_epi AS
SELECT f.nome, e.nome AS epi
FROM FUNCIONARIO_EPI fe
INNER JOIN FUNCIONARIO f ON fe.id_funcionario = f.id_funcionario
INNER JOIN EPI e ON fe.id_epi = e.id_epi;

CREATE VIEW vw_sensor_ambiente AS
SELECT s.tipo, a.nome
FROM SENSOR_IOT s
INNER JOIN AMBIENTE a ON s.id_ambiente = a.id_ambiente;

CREATE VIEW vw_ocorrencia_funcionario AS
SELECT o.tipo, f.nome
FROM OCORRENCIA o
INNER JOIN FUNCIONARIO f ON o.id_funcionario = f.id_funcionario;

-- =========================
-- CONSULTAS (VIEWS + FUNÇÕES)
-- =========================

-- COUNT com VIEW
SELECT COUNT(*) AS total_funcionarios
FROM vw_funcionario_cargo;

-- GROUP BY + COUNT
SELECT cargo, COUNT(*) AS quantidade
FROM vw_funcionario_cargo
GROUP BY cargo;

-- GROUP BY + ORDER BY
SELECT departamento, COUNT(*) AS total
FROM vw_funcionario_departamento
GROUP BY departamento
ORDER BY total DESC;

-- COUNT com filtro
SELECT COUNT(*) AS total_infracoes
FROM vw_ocorrencia_funcionario
WHERE tipo = 'Infração';

-- IN
SELECT nome
FROM vw_funcionario_departamento
WHERE nome IN ('Pedro Santos','Lucas');

-- BETWEEN
SELECT nome, epi
FROM vw_entrega_epi
WHERE epi BETWEEN 'A' AND 'M';

-- MIN e MAX
SELECT MIN(nome) AS primeiro_nome, MAX(nome) AS ultimo_nome
FROM vw_funcionario_cargo;

-- SUM 
SELECT SUM(id_funcionario) AS soma_ids
FROM FUNCIONARIO;

-- AVG 
SELECT AVG(id_funcionario) AS media_ids
FROM FUNCIONARIO;
