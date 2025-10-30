const API_URL = "http://localhost:8080/api/livros"
const tabela = document.getElementById("tabelaLivros")

document.getElementById("novoLivroBtn").addEventListener("click", () => {
  window.location.href = "../Tela_Cadastro/cadastro.html"
})
document.getElementById("estoqueBtn").addEventListener("click", () => {
  window.location.href = "../Tela_Estoque/estoque.html"
})

async function carregarLivros() {
  const token = localStorage.getItem("token")
  if (!token) return (window.location.href = "../Tela_Login/login.html")

  const res = await fetch(API_URL)
  const data = await res.json()
  if (data.livros) {
    tabela.innerHTML = data.livros.map(livro => `
      <tr>
        <td>${livro.id}</td>
        <td>${livro.titulo}</td>
        <td>
          <button onclick="editar(${livro.id})">✏️</button>
          <button onclick="deletar(${livro.id})">🗑️</button>
        </td>
      </tr>
    `).join("")
  }
}

async function deletar(id) {
  if (confirm("Deseja excluir este livro?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    carregarLivros()
  }
}

function editar(id) {
  localStorage.setItem("livroEdit", id)
  window.location.href = "../Tela_Cadastro/cadastro.html"
}

carregarLivros()
