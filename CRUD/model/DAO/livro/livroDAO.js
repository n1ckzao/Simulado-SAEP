const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirLivro = async (dados) => {
  try {
    const sql = `INSERT INTO tbl_livro (titulo, data_publicacao, quantidade, isbn) VALUES (?, ?, ?, ?)`
    const result = await prisma.$executeRawUnsafe(sql, dados.titulo, dados.data_publicacao, dados.quantidade, dados.isbn)
    return !!result
  } catch (error) {
    console.error("inserirLivro erro:", error)
    return false
  }
}

const updateLivro = async (dados) => {
  try {
    const sql = `UPDATE tbl_livro SET titulo=?, data_publicacao=?, quantidade=?, isbn=? WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, dados.titulo, dados.data_publicacao, dados.quantidade, dados.isbn, dados.id)
    return !!result
  } catch (error) {
    console.error("updateLivro erro:", error)
    return false
  }
}

const deleteLivro = async (id) => {
  try {
    const sql = `DELETE FROM tbl_livro WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, id)
    return !!result
  } catch (error) {
    console.error("deleteLivro erro:", error)
    return false
  }
}

const selectAllLivro = async () => {
  try {
    const sql = `SELECT * FROM tbl_livro`
    const result = await prisma.$queryRawUnsafe(sql)
    return result
  } catch (error) {
    console.error("selectAllLivro erro:", error)
    return false
  }
}

const selectLivroById = async (id) => {
  try {
    const sql = `SELECT * FROM tbl_livro WHERE id=?`
    const result = await prisma.$queryRawUnsafe(sql, id)
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("selectLivroById erro:", error)
    return null
  }
}

const selectLivroByTitulo = async (titulo) => {
  try {
    const sql = `SELECT * FROM tbl_livro WHERE titulo LIKE ?`
    const result = await prisma.$queryRawUnsafe(sql, `%${titulo}%`)
    return result
  } catch (error) {
    console.error("selectLivroByTitulo erro:", error)
    return null
  }
}

module.exports = {
  inserirLivro,
  updateLivro,
  deleteLivro,
  selectAllLivro,
  selectLivroById,
  selectLivroByTitulo
}
