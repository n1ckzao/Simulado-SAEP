const DAOUsuario = require("../../model/DAO/usuario/usuarioDAO.js")
const message = require("../../module/config.js")

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_forte"

const inserirUsuario = async (usuario, contentType) => {
  try {
    if (!contentType.includes("application/json")) return message.ERROR_CONTENT_TYPE

    if (!usuario.login || usuario.login.length > 45 || !usuario.senha || usuario.senha.length < 6)
      return message.ERROR_REQUIRED_FIELDS

    const hash = await bcrypt.hash(usuario.senha, 10)
    const result = await DAOUsuario.inserirUsuario({ ...usuario, senha: hash })

    if (result) {
      const lastId = await DAOUsuario.selectLastId()
      return { status: true, status_code: 201, usuarioID: lastId }
    } else {
      return message.ERROR_INTERNAL_SERVER_MODEL
    }
  } catch (error) {
    console.error("inserirUsuario erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const loginUsuario = async (dadosBody) => {
  try {
    const { login, senha } = dadosBody
    if (!login || !senha) return message.ERROR_REQUIRED_FIELDS

    const usuario = await DAOUsuario.selectUsuarioByLogin(login)
    if (!usuario) return message.ERROR_NOT_FOUND

    const match = await bcrypt.compare(senha, usuario.senha)
    if (!match) return { status_code: 401, message: "Senha incorreta" }

    const token = jwt.sign({ id: usuario.id, login: usuario.login }, JWT_SECRET, { expiresIn: "2h" })

    return { status: true, status_code: 200, message: "Login bem-sucedido", token }
  } catch (error) {
    console.error("loginUsuario erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const listarUsuario = async () => {
  try {
    const result = await DAOUsuario.selectAllUsuario()
    if (result.length > 0) return { status: true, status_code: 200, usuarios: result }
    return message.ERROR_NOT_FOUND
  } catch (error) {
    console.error("listarUsuario erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

const excluirUsuario = async (id) => {
  try {
    if (!id || isNaN(id)) return message.ERROR_REQUIRED_FIELDS

    const existe = await DAOUsuario.selectUsuarioById(id)
    if (!existe) return message.ERROR_NOT_FOUND

    const result = await DAOUsuario.deleteUsuario(id)
    return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
  } catch (error) {
    console.error("excluirUsuario erro:", error)
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

module.exports = { 
    inserirUsuario, 
    loginUsuario, 
    listarUsuario, 
    excluirUsuario 
}
