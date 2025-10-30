const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir tipo de movimentação
const inserirTipoMovimentacao = async (dados) => {
  try {
    const sql = `INSERT INTO tipo_movimentacao (tipo) VALUES (?)`
    const result = await prisma.$executeRawUnsafe(sql, dados.tipo)
    return !!result
  } catch (error) {
    console.error("inserirTipoMovimentacao erro:", error)
    return false
  }
}

// Atualizar tipo de movimentação
const updateTipoMovimentacao = async (dados) => {
  try {
    const sql = `UPDATE tipo_movimentacao SET tipo=? WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, dados.tipo, dados.id)
    return !!result
  } catch (error) {
    console.error("updateTipoMovimentacao erro:", error)
    return false
  }
}

// Excluir tipo de movimentação
const deleteTipoMovimentacao = async (id) => {
  try {
    const sql = `DELETE FROM tipo_movimentacao WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, id)
    return !!result
  } catch (error) {
    console.error("deleteTipoMovimentacao erro:", error)
    return false
  }
}

// Selecionar todos
const selectAllTipoMovimentacao = async () => {
  try {
    const sql = `SELECT * FROM tipo_movimentacao`
    const result = await prisma.$queryRawUnsafe(sql)
    return result
  } catch (error) {
    console.error("selectAllTipoMovimentacao erro:", error)
    return false
  }
}

// Selecionar por ID
const selectTipoMovimentacaoById = async (id) => {
  try {
    const sql = `SELECT * FROM tipo_movimentacao WHERE id=?`
    const result = await prisma.$queryRawUnsafe(sql, id)
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("selectTipoMovimentacaoById erro:", error)
    return null
  }
}

module.exports = {
  inserirTipoMovimentacao,
  updateTipoMovimentacao,
  deleteTipoMovimentacao,
  selectAllTipoMovimentacao,
  selectTipoMovimentacaoById
}
