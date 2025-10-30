const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

// Importando todas as controllers
const usuarioController = require("./controller/usuario/usuarioController.js")
const livroController = require("./controller/livro/livroController.js")
const tipoMovimentacaoController = require("./controller/tipoMovimentacao/tipoMovimentacaoController.js")
const movimentacaoController = require("./controller/movimentacao/movimentacaoController.js")

// Cria instância do servidor Express
const app = express()

// Middlewares globais
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Porta do servidor
const PORT = process.env.PORT || 8080

// =============================
// ROTA PRINCIPAL
// =============================
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "🚀 API do Sistema de Gestão de Acervo (SGA) está rodando!"
  })
})

// =============================
// ROTAS DE USUÁRIO
// =============================
app.post("/api/usuarios", async (req, res) => {
  const result = await usuarioController.inserirUsuario(req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.get("/api/usuarios", async (req, res) => {
  const result = await usuarioController.listarUsuario()
  res.status(result.status_code || 500).json(result)
})

app.get("/api/usuarios/:id", async (req, res) => {
  const result = await usuarioController.buscarUsuario(req.params.id)
  res.status(result.status_code || 500).json(result)
})

app.put("/api/usuarios/:id", async (req, res) => {
  const result = await usuarioController.atualizarUsuario(req.params.id, req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.put("/api/usuarios/:id/senha", async (req, res) => {
  const result = await usuarioController.atualizarSenhaUsuario(req.params.id, req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.delete("/api/usuarios/:id", async (req, res) => {
  const result = await usuarioController.excluirUsuario(req.params.id)
  res.status(result.status_code || 500).json(result)
})

app.post("/api/login", async (req, res) => {
  const result = await usuarioController.loginUsuario(req.body)
  res.status(result.status_code || 500).json(result)
})

// =============================
// ROTAS DE LIVROS
// =============================
app.get("/api/livros", async (req, res) => {
  const result = await livroController.listarLivros()
  res.status(result.status_code || 500).json(result)
})

app.get("/api/livros/:id", async (req, res) => {
  const result = await livroController.buscarLivro(req.params.id)
  res.status(result.status_code || 500).json(result)
})

app.post("/api/livros", async (req, res) => {
  const result = await livroController.inserirLivro(req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.put("/api/livros/:id", async (req, res) => {
  const result = await livroController.atualizarLivro(req.params.id, req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.delete("/api/livros/:id", async (req, res) => {
  const result = await livroController.excluirLivro(req.params.id)
  res.status(result.status_code || 500).json(result)
})

// =============================
// ROTAS DE TIPO DE MOVIMENTAÇÃO
// =============================
app.get("/api/tipos-movimentacao", async (req, res) => {
  const result = await tipoMovimentacaoController.listarTipos()
  res.status(result.status_code || 500).json(result)
})

app.get("/api/tipos-movimentacao/:id", async (req, res) => {
  const result = await tipoMovimentacaoController.buscarTipo(req.params.id)
  res.status(result.status_code || 500).json(result)
})

// =============================
// ROTAS DE MOVIMENTAÇÃO
// =============================
app.get("/api/movimentacoes", async (req, res) => {
  const result = await movimentacaoController.listarMovimentacoes()
  res.status(result.status_code || 500).json(result)
})

app.get("/api/movimentacoes/:id", async (req, res) => {
  const result = await movimentacaoController.buscarMovimentacao(req.params.id)
  res.status(result.status_code || 500).json(result)
})

app.post("/api/movimentacoes", async (req, res) => {
  const result = await movimentacaoController.registrarMovimentacao(req.body, req.headers["content-type"])
  res.status(result.status_code || 500).json(result)
})

app.delete("/api/movimentacoes/:id", async (req, res) => {
  const result = await movimentacaoController.excluirMovimentacao(req.params.id)
  res.status(result.status_code || 500).json(result)
})

// =============================
// SERVIDOR ONLINE
// =============================
app.listen(PORT, () => {
  console.log(`✅ Servidor do SGA rodando em http://localhost:${PORT}`)
})
