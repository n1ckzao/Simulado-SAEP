const DAOTipoMov = require("../../model/DAO/tipoMovimentacao/tipoMovimentacaoDAO.js")
const message = require("../../module/config.js")

// Inserir tipo de movimentação
const inserirTipoMovimentacao = async (dados, contentType) => {
  try {
    if (!contentType.includes("application/json")) return message.ERROR_CONTENT_TYPE
    if (!dados.tipo || dados.tipo.length > 45) return message.ERROR_REQUIRED_FIELDS

    const result = await DAOTipoMov.inserirTipoMovimentacao(dados)
    if (result) {
      const lastId = await DAOTipoMov.selectLastId()
      return { status: true, status_code: 201, id_tipo_movimentacao: lastId }
    } else {
      return message.ERROR_INTERNAL_SERVER_MODEL
    }
  } catch (error) {
    console.error("inserirTipoMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Atualizar tipo
const atualizarTipoMovimentacao = async (id, dados, contentType) => {
  try {
    if (!contentType.includes("application/json")) return message.ERROR_CONTENT_TYPE
    if (!dados.tipo || dados.tipo.length > 45) return message.ERROR_REQUIRED_FIELDS

    const existe = await DAOTipoMov.selectTipoMovimentacaoById(id)
    if (!existe) return message.ERROR_NOT_FOUND

    dados.id = id
    const result = await DAOTipoMov.updateTipoMovimentacao(dados)
    return result ? message.SUCESS_UPDATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("atualizarTipoMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Listar todos os tipos
const listarTipoMovimentacao = async () => {
  try {
    const result = await DAOTipoMov.selectAllTipoMovimentacao()
    if (result && result.length > 0) {
      return { status: true, status_code: 200, tipos: result }
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    console.error("listarTipoMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar por ID
const buscarTipoMovimentacao = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS

    const result = await DAOTipoMov.selectTipoMovimentacaoById(id)
    if (result) {
      return { status: true, status_code: 200, tipo_movimentacao: result }
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    console.error("buscarTipoMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Excluir tipo
const excluirTipoMovimentacao = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS

    const existe = await DAOTipoMov.selectTipoMovimentacaoById(id)
    if (!existe) return message.ERROR_NOT_FOUND

    const result = await DAOTipoMov.deleteTipoMovimentacao(id)
    return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("excluirTipoMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  inserirTipoMovimentacao,
  atualizarTipoMovimentacao,
  listarTipoMovimentacao,
  buscarTipoMovimentacao,
  excluirTipoMovimentacao
}
