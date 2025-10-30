const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Registrar movimentação (entrada / saída)
const registrarMovimentacao = async (dados) => {
  try {
    const sql = `
      INSERT INTO tbl_movimentacao 
      (id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro)
      VALUES (?, ?, ?, NOW(), ?)
    `
    const result = await prisma.$executeRawUnsafe(
      sql,
      dados.id_movimentacao,
      dados.id_usuario,
      dados.quantidade,
      dados.id_livro
    )

    // Atualiza estoque conforme tipo de movimentação
    if (result) {
      if (dados.id_movimentacao === 1) {
        await prisma.$executeRawUnsafe(
          `UPDATE tbl_livro SET quantidade = quantidade + ? WHERE id = ?`,
          dados.quantidade,
          dados.id_livro
        )
      } else if (dados.id_movimentacao === 2) {
        await prisma.$executeRawUnsafe(
          `UPDATE tbl_livro SET quantidade = quantidade - ? WHERE id = ? AND quantidade >= ?`,
          dados.quantidade,
          dados.id_livro,
          dados.quantidade
        )
      }
    }

    return !!result
  } catch (error) {
    console.error("registrarMovimentacao erro:", error)
    return false
  }
}

// Listar todas as movimentações
const selectAllMovimentacao = async () => {
  try {
    const sql = `
      SELECT m.id, t.tipo AS tipo_movimentacao, u.login AS usuario, 
             l.titulo AS livro, m.quantidade, m.data_movimentacao
      FROM tbl_movimentacao AS m
      INNER JOIN tipo_movimentacao AS t ON m.id_movimentacao = t.id
      INNER JOIN tbl_usuario AS u ON m.id_usuario = u.id
      INNER JOIN tbl_livro AS l ON m.id_livro = l.id
      ORDER BY m.data_movimentacao DESC
    `
    const result = await prisma.$queryRawUnsafe(sql)
    return result
  } catch (error) {
    console.error("selectAllMovimentacao erro:", error)
    return false
  }
}

// Buscar movimentação por ID
const selectMovimentacaoById = async (id) => {
  try {
    const sql = `
      SELECT m.id, t.tipo AS tipo_movimentacao, u.login AS usuario, 
             l.titulo AS livro, m.quantidade, m.data_movimentacao
      FROM tbl_movimentacao AS m
      INNER JOIN tipo_movimentacao AS t ON m.id_movimentacao = t.id
      INNER JOIN tbl_usuario AS u ON m.id_usuario = u.id
      INNER JOIN tbl_livro AS l ON m.id_livro = l.id
      WHERE m.id = ?
    `
    const result = await prisma.$queryRawUnsafe(sql, id)
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("selectMovimentacaoById erro:", error)
    return null
  }
}

// Excluir movimentação
const deleteMovimentacao = async (id) => {
  try {
    const sql = `DELETE FROM tbl_movimentacao WHERE id=?`
    const result = await prisma.$executeRawUnsafe(sql, id)
    return !!result
  } catch (error) {
    console.error("deleteMovimentacao erro:", error)
    return false
  }
}

module.exports = {
  registrarMovimentacao,
  selectAllMovimentacao,
  selectMovimentacaoById,
  deleteMovimentacao
}
