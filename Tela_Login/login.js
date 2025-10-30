const API_URL = "http://localhost:8080/api/login"

document.getElementById("btnLogin").addEventListener("click", async () => {
  const login = document.getElementById("login").value.trim()
  const senha = document.getElementById("senha").value.trim()
  const msg = document.getElementById("msg")

  if (!login || !senha) {
    msg.textContent = "Preencha todos os campos!"
    return
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha })
    })
    const data = await response.json()

    if (data.status) {
      localStorage.setItem("token", data.token)
      window.location.href = "../Tela_Principal/principal.html"
    } else {
      msg.textContent = data.message || "Usuário ou senha incorretos!"
    }
  } catch (error) {
    msg.textContent = "Erro de conexão com o servidor!"
  }
})
