// Função para buscar os livros
async function getBooks() {
  try {
    const response = await axios.get('http://localhost:8800/books'); 
    const books = response.data;
    renderBooks(books);
  } catch (error) {
    console.error('Erro ao buscar os livros:', error)
  }
   
  }
  
  // Função para renderizar os livros na div
  function renderBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // Limpar conteúdo anterior
    books.forEach(book => {
        const releaseYear = new Date(book.lancamento).getFullYear(); 
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-container');
        bookDiv.innerHTML = `
        <div class="info-box">
          <div class="info-header">
            <div class="info-title">TÍTULO</div>
            <div class="info-title">AUTOR</div>
            <div class="info-title">LANÇAMENTO</div>
            <div class="info-title">DISPONÍVEL</div>
          </div>
          <div class="info-data">
            <div class="info-text">${book.nome}</div>
            <div class="info-text">${book.autor}</div>
            <div class="info-text">${releaseYear}</div>
            <div class="info-text info-text-with-buttons">
              ${book.disponivel ? 'Sim' : 'Não'}
              <div class="action-buttons">
                <button class="edit-btn" onclick="openEditModal('${book.id}')">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" onclick="showDeleteModal('${book.id}')">
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
                <button class="details-btn" onclick="showBookDetails('${book.id}')">
                <i class="fa-solid fa-info-circle"></i> <!-- Apenas o emoji -->
              </button>
              </div>
            </div>
          </div>
        </div>
      `;      
        container.appendChild(bookDiv);
    });
}
  
  // Função para buscar por título
  async function searchBooks() {
    try {
      const searchValue = document.getElementById('search').value.toLowerCase();
      const response = await axios.get('http://localhost:8800/books'); 
      const books = response.data;
      const filteredBooks = books.filter(book => 
        book.nome.toLowerCase().includes(searchValue)
      );
      renderBooks(filteredBooks);
    } catch (error) {
      console.error('Erro ao buscar livros por título:', error)
    }
    
  }
  
  // Buscar os livros ao carregar a página
  document.addEventListener('DOMContentLoaded', getBooks);


  // Função para abrir o modal de Disponibilidade
// Abre o modal de edição
async function openEditModal(id) {
  try {
    const response = await axios.get(`http://localhost:8800/books/${id}`);
    const book = response.data;

    document.getElementById('editId').value = book.id;
    document.getElementById('editNome').value = book.nome;
    document.getElementById('editAutor').value = book.autor;
    document.getElementById('editLancamento').value = book.lancamento;
    document.getElementById('editDisponivel').value = book.disponivel;

    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao abrir modal:', error);
  }
}

// Fecha o modal
function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

// Salvar edição
document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const id = document.getElementById('editId').value;
  const updatedBook = {
    nome: document.getElementById('editNome').value,
    autor: document.getElementById('editAutor').value,
    lancamento: document.getElementById('editLancamento').value,
    disponivel: document.getElementById('editDisponivel').value === 'true'
  };

  // ver se foi preenchido o emprestimo
  // se foi, precisa salvar no banco de dados
  const emprestimoSection = document.getElementById('emprestimoSection')
  const emprestimoNome = emprestimoSection.querySelector('input[name=nome]').value
  if (emprestimoNome) {
    updatedBook['emprestimo'] = {
      nome: emprestimoNome,
      endereco: emprestimoSection.querySelector('input[name=endereco]').value,
      telefone: emprestimoSection.querySelector('input[name=telefone]').value,
      cpf: emprestimoSection.querySelector('input[name=cpf]').value,
      dataEmprestimo: emprestimoSection.querySelector('input[name=dataEmprestimo]').value,
      dataDevolucao: emprestimoSection.querySelector('input[name=dataDevolucao]').value
    }
  }

  try {
    await axios.put(`http://localhost:8800/books/${id}`, updatedBook);
    closeEditModal();
    getBooks(); // Atualiza a lista
  } catch (error) {
    console.error('Erro ao salvar edição:', error);
  }
});

let bookIdToDelete = null; // Variável para armazenar o ID do livro a ser excluído

function showDeleteModal(id) {
  bookIdToDelete = id;
  const modal = document.getElementById('deleteModal');
  modal.classList.add('show');
  modal.classList.remove('hide');
}

function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  modal.classList.add('hide');
  modal.classList.remove('show');

  // Delay para ocultar completamente após animação
  setTimeout(() => {
    bookIdToDelete = null;
    modal.style.display = 'block'; //força o sumiço do modal caso o css falhe
  }, 300); // tempo igual à transição CSS
}


document.getElementById('confirmDelete').onclick = async function () {
  try {
    await axios.delete(`http://localhost:8800/books/${bookIdToDelete}`);

    closeDeleteModal(); // Fecha o modal primeiro
    console.log('deletado com sucesso')

    setTimeout(() => {
      showMessage('Livro excluído com sucesso!'); // Só mostra a mensagem depois de fechar
      getBooks(); // Atualiza a lista de livros depois
    }, 500); // espera 500ms para a animação do modal terminar

  } catch (error) {
    console.error('Erro ao excluir o livro:', error);
    closeDeleteModal(); // Fecha o modal também em caso de erro
    setTimeout(() => {
      showMessage('Erro ao tentar excluir o livro.', 5000);
    }, 500);
  }
};

document.getElementById('cancelDelete').onclick = function() {
  closeDeleteModal();
};

function showMessage(text, duration = 5000) {
  const messageDiv = document.getElementById('message');
  
  if (!messageDiv) {
    console.error('Elemento #message não encontrado!');
    return;
  }

  messageDiv.textContent = text;
  messageDiv.classList.add('show');

  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => {
      messageDiv.textContent = '';
    }, 500); // espera a animação terminar
  }, duration);
}

// Section de Emprestimo de Livro

document.getElementById("editDisponivel").addEventListener("change", function () {
  const emprestimoSection = document.getElementById("emprestimoSection");

  if (this.value === "false") {
    emprestimoSection.style.display = "block";
  } else {
    emprestimoSection.style.display = "none"

    // Limpa os campos se for marcado como "Sim"
    document.getElementById("nome").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("dataEmprestimo").value = "";
    document.getElementById("dataDevolucao").value = "";
  }
});

// Função para exibir detalhes do livro emprestado em um modal
async function showBookDetails(id) {
  try {
    const response = await axios.get(`http://localhost:8800/books/${id}`);
    const book = response.data;

    // Preencher os detalhes no modal
    document.getElementById('detailsTitle').textContent = book.nome;
    document.getElementById('detailsAuthor').textContent = book.autor;
    document.getElementById('detailsYear').textContent = new Date(book.lancamento).getFullYear();
    document.getElementById('detailsAvailable').textContent = book.disponivel ? 'Sim' : 'Não';

    // Se o livro estiver emprestado, mostrar os detalhes do empréstimo
    if (!book.disponivel && book.emprestimo) {
      console.log("Dados do empréstimo:", book.emprestimo);
      document.getElementById('borrowerName').textContent = book.emprestimo.nome;
      document.getElementById('borrowerAddress').textContent = book.emprestimo.endereco;
      document.getElementById('borrowerPhone').textContent = book.emprestimo.telefone;
      document.getElementById('borrowerCPF').textContent = book.emprestimo.cpf;
      document.getElementById('borrowDate').textContent = new Date(book.emprestimo.dataEmprestimo).toLocaleDateString();
      document.getElementById('returnDate').textContent = new Date(book.emprestimo.dataDevolucao).toLocaleDateString();
      document.getElementById('loanDetails').style.display = 'block';
    } else {
      document.getElementById('loanDetails').style.display = 'none';
    }

    // Exibir o modal
    document.getElementById('detailsModal').style.display = 'block';
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error);
    alert('Erro ao buscar detalhes do livro.');
  }
}

// Função para fechar o modal
function closeDetailsModal() {
  document.getElementById('detailsModal').style.display = 'none';
}
