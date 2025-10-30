const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir usuário
const inserirUsuario = async (dados) => {
  try {
    const sql = `INSERT INTO tbl_usuario (login, senha) VALUES (?, ?)`
    const result = await prisma.$executeRawUnsafe(sql, dados.login, dados.senha)
    return !!result
  } catch (error) {
    console.error("inserirUsuario erro:", error)
    return false
  }
}

// Atualizar usuário
const updateUsuario = async (dados) => {
  try {
    const sql = `UPDATE tbl_usuario SET login=?, senha=? WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, dados.login, dados.senha, dados.id)
    return !!result
  } catch (error) {
    console.error("updateUsuario erro:", error)
    return false
  }
}

// Atualizar apenas senha
const updateSenhaUsuario = async (id, novaSenha) => {
  try {
    const sql = `UPDATE tbl_usuario SET senha=? WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, novaSenha, id)
    return !!result
  } catch (error) {
    console.error("updateSenhaUsuario erro:", error)
    return false
  }
}

// Deletar usuário
const deleteUsuario = async (id) => {
  try {
    const sql = `DELETE FROM tbl_usuario WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, id)
    return !!result
  } catch (error) {
    console.error("deleteUsuario erro:", error)
    return false
  }
}

// Selecionar todos
const selectAllUsuario = async () => {
  try {
    const sql = `SELECT * FROM tbl_usuario`
    const result = await prisma.$queryRawUnsafe(sql)
    return result || []
  } catch (error) {
    console.error("selectAllUsuario erro:", error)
    return false
  }
}

// Buscar por ID
const selectUsuarioById = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_usuario WHERE id=? LIMIT 1`
    const result = await prisma.$queryRawUnsafe(sql, id)
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("selectUsuarioById erro:", error)
    return null
  }
}

// Buscar por login
const selectUsuarioByLogin = async (login) => {
  try {
    const sql = `SELECT * FROM tbl_usuario WHERE login=? LIMIT 1`
    const result = await prisma.$queryRawUnsafe(sql, login)
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("selectUsuarioByLogin erro:", error)
    return null
  }
}

// Último ID inserido
const selectLastId = async () => {
  try {
    const sql = `SELECT id FROM tbl_usuario ORDER BY id DESC LIMIT 1`
    const result = await prisma.$queryRawUnsafe(sql)
    return result && result.length > 0 ? result[0].id : null
  } catch (error) {
    console.error("selectLastId erro:", error)
    return null
  }
}

module.exports = {
  inserirUsuario,
  updateUsuario,
  updateSenhaUsuario,
  deleteUsuario,
  selectAllUsuario,
  selectUsuarioById,
  selectUsuarioByLogin,
  selectLastId
}
