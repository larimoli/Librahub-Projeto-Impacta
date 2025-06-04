// Obtendo os elementos do DOM
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const form = document.querySelector(".cadastro form");

// Criando um elemento para exibir mensagens de feedback
const messageBox = document.createElement("div");
messageBox.style.position = "absolute";
messageBox.style.top = "10%";
messageBox.style.left = "50%";
messageBox.style.transform = "translateX(-50%)";
messageBox.style.padding = "10px 20px";
messageBox.style.borderRadius = "5px";
messageBox.style.fontSize = "16px";
messageBox.style.fontWeight = "bold";
messageBox.style.display = "none"; // Começa oculto
document.body.appendChild(messageBox);

// Função para exibir mensagem de feedback
function showMessage(message, isSuccess) {
    messageBox.textContent = message;
    messageBox.style.backgroundColor = isSuccess ? "#4CAF50" : "#FF5733"; // Verde para sucesso, vermelho para erro
    messageBox.style.color = "#fff";
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

// Abrir o modal
openModalButton.addEventListener('click', () => {
    modal.style.display = "block";
});

// Fechar o modal
closeModalButton.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal clicando fora dele
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Captura o envio do formulário
form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtendo os valores dos campos corretamente
    const titulo = document.querySelector("input[name='titulo']").value.trim();
    const autor = document.querySelector("input[name='autor']").value.trim();
    const lancamento = document.querySelector("input[name='lancamento']").value.trim();
    const disponivel = document.querySelector("input[name='disponivel']:checked")?.value || "";

    // Verificando se todos os campos foram preenchidos
    if (titulo !== "" && autor !== "" && lancamento !== "" && disponivel !== "") {
        try {
            // Dados do livro
            const bookData = {
                nome: titulo, 
                autor: autor, 
                lancamento: lancamento, 
                disponivel: disponivel === 'sim' ? 1 : 0 // convertendo 'sim' para 1 e 'não' para 0 devido ao datetype do bd
            };
            
            // Envia os dados para o servidor usando axios
            const response = await axios.post('http://localhost:8800/books', bookData);
            console.log('Resposta do servidor:', response.data);

            // Mostrar mensagem de sucesso e resetar o formulário
            showMessage("Livro cadastrado com sucesso!", true);
            form.reset(); // Limpa os campos após o cadastro
            modal.style.display = "none"; // Fecha o modal apenas após o sucesso
            
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            if (error.response) {
                console.log('Resposta do erro:', error.response.data);
                console.log('Status do erro:', error.response.status);
            }
            if (error.response && error.response.status === 409) {
                showMessage("Livro já cadastrado", false);
            } else {
                showMessage("Erro ao cadastrar livro. Tente novamente.", false);
            }
        }        
    } else {
        showMessage("Erro ao cadastrar livro. Preencha todos os campos.", false);
    }
});

