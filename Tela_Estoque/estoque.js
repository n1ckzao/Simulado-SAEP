const API_URL_LIVROS = "http://localhost:8080/api/livros"
const API_URL_TIPOS = "http://localhost:8080/api/tipos-movimentacao"
const API_URL_MOV = "http://localhost:8080/api/movimentacoes"

async function carregarSelects() {
  const livros = await (await fetch(API_URL_LIVROS)).json()
  const tipos = await (await fetch(API_URL_TIPOS)).json()

  livro.innerHTML = livros.livros.map(l => `<option value="${l.id}">${l.titulo}</option>`).join("")
  tipoMov.innerHTML = tipos.tipos.map(t => `<option value="${t.id}">${t.tipo}</option>`).join("")
}

document.getElementById("formMov").addEventListener("submit", async (e) => {
  e.preventDefault()
  const dados = {
    id_movimentacao: parseInt(tipoMov.value),
    id_usuario: 1, // pegar do token futuramente
    id_livro: parseInt(livro.value),
    quantidade: parseInt(quantidade.value)
  }

  const res = await fetch(API_URL_MOV, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })

  if (res.ok) {
    alert("Movimentação registrada com sucesso!")
    window.location.href = "../Tela_Principal/principal.html"
  }
})

document.getElementById("cancelar").addEventListener("click", () => {
  window.location.href = "../Tela_Principal/principal.html"
})

carregarSelects()
