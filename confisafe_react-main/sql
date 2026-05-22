-- Script de criação do banco e tabelas para importar no MySQL (phpMyAdmin)
-- Cria o banco de dados, tabelas e alguns registros de exemplo

-- 1) Cria o banco (se já existir, mantém)
CREATE DATABASE IF NOT EXISTS `confisafe_db` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE `confisafe_db`;

-- 2) Tabela empresas (corresponde à entidade Empresa.java)
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(255) NOT NULL,
  `cnpj` VARCHAR(32) NOT NULL,
  `email_corporativo` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(32) NOT NULL,
  `nome_responsavel` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(32) NOT NULL,
  `cargo` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `data_cadastro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_empresas_cnpj` (`cnpj`),
  UNIQUE KEY `uk_empresas_email` (`email_corporativo`),
  UNIQUE KEY `uk_empresas_cpf` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3) Tabela usuarios (corresponde à entidade Usuario.java)
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `nome_completo` VARCHAR(255) DEFAULT NULL,
  `cargo` VARCHAR(255) DEFAULT NULL,
  `departamento` VARCHAR(255) DEFAULT NULL,
  `telefone` VARCHAR(64) DEFAULT NULL,
  `ramal` VARCHAR(32) DEFAULT NULL,
  `foto_perfil` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuarios_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4) Inserir usuários de exemplo
INSERT INTO `usuarios` (`email`, `senha`, `nome_completo`, `cargo`, `departamento`, `telefone`, `ramal`) VALUES
('michael.coutinho@confisafe.com', 'senha123', 'Michael Coutinho', 'Técnico de Segurança', 'seguranca', '(11) 98765-4321', '2345'),
('admin@confisafe.com', 'admin123', 'Administrador', 'Administrador', 'administrativo', '', ''),
('usuario@confisafe.com', 'usuario123', 'Usuário Exemplo', 'Operador', 'producao', '', '');


-- Tabela Treinamento
-- 1) Tabela treinamento (corresponde à entidade Treinamento.java)
-- Cria a tabela treinamento (se já existir, apaga antes)
DROP TABLE IF EXISTS `treinamento`;
CREATE TABLE `treinamento` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome_funcionario` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(255) NOT NULL,
  `curso` VARCHAR(255) NOT NULL,
  `data_conclusao` DATE NOT NULL,
  `validade` DATE NOT NULL,
  `status` ENUM('VALIDO','VENCE_EM_BREVE','VENCIDO') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Adiciona alguns registros de exemplo
INSERT INTO `treinamento` 
(nome_funcionario, cargo, curso, data_conclusao, validade, status)
VALUES 
('João Silva', 'Operador', 'NR-33', '2024-01-10', '2025-01-10', 'VALIDO'),
('Maria Souza', 'Técnica', 'NR-35', '2023-12-15', '2024-12-15', 'VENCE_EM_BREVE'),
('Carlos Pereira', 'Supervisor', 'NR-10', '2022-11-20', '2023-11-20', 'VENCIDO'),
('Ana Ribeiro', 'Engenheira', 'NR-12', '2024-02-05', '2025-02-05', 'VALIDO'),
('Pedro Martins', 'Eletricista', 'NR-10', '2023-08-18', '2024-08-18', 'VENCIDO'),
('Juliana Costa', 'Auxiliar', 'NR-33', '2023-09-10', '2024-09-10', 'VENCE_EM_BREVE'),
('Rafael Lima', 'Analista', 'NR-35', '2024-03-12', '2025-03-12', 'VALIDO'),
('Beatriz Rocha', 'Supervisora', 'NR-12', '2022-10-02', '2023-10-02', 'VENCIDO'),
('Lucas Almeida', 'Técnico', 'NR-33', '2023-01-25', '2024-01-25', 'VENCIDO'),
('Fernanda Gomes', 'Operadora', 'NR-35', '2024-05-21', '2025-05-21', 'VALIDO');

-- Tabela Funcionarios
-- 1) Tabela funcionarios (corresponde à entidade Funcionarios.java)
DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE `funcionarios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(255) NOT NULL,
  `departamento` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(64) DEFAULT NULL,
  `ativo` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_funcionarios_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




