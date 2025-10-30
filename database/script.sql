create database db_lionbook;
use db_lionbook;

-- Tabela de Usuário
CREATE TABLE tbl_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

-- Tabela de Tipo de Movimentação
CREATE TABLE tipo_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
);

-- Tabela de Livro
CREATE TABLE tbl_livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    data_publicacao DATE,
    quantidade INT,
    isbn VARCHAR(45)
);

-- Tabela de Movimentação
CREATE TABLE tbl_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_movimentacao INT,
    id_usuario INT,
    quantidade INT,
    data_movimentacao DATE,
    id_livro INT,
    FOREIGN KEY (id_movimentacao) REFERENCES tipo_movimentacao(id),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro(id)
);

-- Inserir tipos de movimentação padrão
INSERT INTO tipo_movimentacao (tipo) VALUES ('Entrada'), ('Saída');