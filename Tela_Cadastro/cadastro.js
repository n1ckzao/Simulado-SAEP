const API_URL = "http://localhost:8080/api/livros"
const form = document.getElementById("formLivro")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const livro = {
    titulo: titulo.value,
    quantidade: parseInt(quantidade.value),
    isbn: isbn.value,
    data_publicacao: data_publicacao.value
  }

  const editId = localStorage.getItem("livroEdit")
  const method = editId ? "PUT" : "POST"
  const url = editId ? `${API_URL}/${editId}` : API_URL

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  })
  if (res.ok) {
    localStorage.removeItem("livroEdit")
    alert("Livro salvo com sucesso!")
    window.location.href = "../Tela_Principal/principal.html"
  }
})

document.getElementById("cancelar").addEventListener("click", () => {
  window.location.href = "../Tela_Principal/principal.html"
})
