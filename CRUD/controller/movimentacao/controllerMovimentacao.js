const DAOMovimentacao = require("../../model/DAO/movimentacao/movimentacaoDAO.js")
const message = require("../../module/config.js")

// Registrar movimentação (Entrada / Saída)
const registrarMovimentacao = async (dados, contentType) => {
  try {
    if (!contentType || !contentType.includes("application/json")) {
      return message.ERROR_CONTENT_TYPE // 415
    }

    if (
      !dados.id_movimentacao || isNaN(dados.id_movimentacao) ||
      !dados.id_usuario || isNaN(dados.id_usuario) ||
      !dados.id_livro || isNaN(dados.id_livro) ||
      !dados.quantidade || isNaN(dados.quantidade)
    ) {
      return message.ERROR_REQUIRED_FIELDS // 400
    }

    // Executa a movimentação (entrada ou saída)
    const result = await DAOMovimentacao.registrarMovimentacao(dados)

    if (result) {
      return {
        status: true,
        status_code: 201,
        message: "Movimentação registrada com sucesso!"
      }
    } else {
      return message.ERROR_INTERNAL_SERVER_MODEL
    }
  } catch (error) {
    console.error("registrarMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Listar todas as movimentações
const listarMovimentacoes = async () => {
  try {
    const result = await DAOMovimentacao.selectAllMovimentacao()
    if (result && result.length > 0) {
      return {
        status: true,
        status_code: 200,
        movimentacoes: result
      }
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    console.error("listarMovimentacoes erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Buscar movimentação por ID
const buscarMovimentacao = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS

    const result = await DAOMovimentacao.selectMovimentacaoById(id)
    if (result) {
      return {
        status: true,
        status_code: 200,
        movimentacao: result
      }
    } else {
      return message.ERROR_NOT_FOUND
    }
  } catch (error) {
    console.error("buscarMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

// Excluir movimentação
const excluirMovimentacao = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS

    const existe = await DAOMovimentacao.selectMovimentacaoById(id)
    if (!existe) return message.ERROR_NOT_FOUND

    const result = await DAOMovimentacao.deleteMovimentacao(id)
    return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("🔥 excluirMovimentacao erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = {
  registrarMovimentacao,
  listarMovimentacoes,
  buscarMovimentacao,
  excluirMovimentacao
}
