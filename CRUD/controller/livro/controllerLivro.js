const DAOLivro = require("../../model/DAO/livro/livroDAO.js")
const message = require("../../module/config.js")

const inserirLivro = async (livro, contentType) => {
  try {
    if (!contentType.includes("application/json")) return message.ERROR_CONTENT_TYPE
    if (!livro.titulo || livro.titulo.length > 100) return message.ERROR_REQUIRED_FIELDS

    const result = await DAOLivro.inserirLivro(livro)
    return result ? message.SUCCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("inserirLivro erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const listarLivro = async () => {
  try {
    const result = await DAOLivro.selectAllLivro()
    return result && result.length > 0 ? { status: true, status_code: 200, livros: result } : message.ERROR_NOT_FOUND
  } catch (error) {
    console.error("listarLivro erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const buscarLivro = async (titulo) => {
  try {
    const result = await DAOLivro.selectLivroByTitulo(titulo)
    return result && result.length > 0 ? { status: true, status_code: 200, livros: result } : message.ERROR_NOT_FOUND
  } catch (error) {
    console.error("buscarLivro erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const atualizarLivro = async (id, livro, contentType) => {
  try {
    if (!contentType.includes("application/json")) return message.ERROR_CONTENT_TYPE

    const existe = await DAOLivro.selectLivroById(id)
    if (!existe) return message.ERROR_NOT_FOUND

    livro.id = id
    const result = await DAOLivro.updateLivro(livro)
    return result ? message.SUCESS_UPDATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("atualizarLivro erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const excluirLivro = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS
    const existe = await DAOLivro.selectLivroById(id)
    if (!existe) return message.ERROR_NOT_FOUND
    const result = await DAOLivro.deleteLivro(id)
    return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("excluirLivro erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = { inserirLivro, listarLivro, buscarLivro, atualizarLivro, excluirLivro }
