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
                <button class="edit-btn" onclick="openEditModal(${book.id})">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" onclick="showDeleteModal(${book.id})">
                  <i class="fa-solid fa-circle-xmark"></i>
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

  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
  }

  function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hide');
    modal.classList.remove('show');
  
    // Delay para ocultar completamente após animação
    setTimeout(() => {
      bookIdToDelete = null;
      modal.style.display = 'none'; //força o sumiço do modal caso o css falhe
    }, 300); // tempo igual à transição CSS
  }

  async function openEditModal(id) {  
    console.log('Abrindo modal para o livro ID:', id); 
  
    try {
     const response = await axios.get(`http://localhost:8800/books/${id}`);
     const book = response.data;
      
      // Verificando se os dados do livro foram recebidos corretamente
      console.log('Dados do livro:', book);
      
  
      document.getElementById('editId').value = book.id;
      document.getElementById('editNome').value = book.nome;
      document.getElementById('editAutor').value = book.autor;
      document.getElementById('editLancamento').value = book.lancamento;
      document.getElementById('editDisponivel').value = book.disponivel ? 'true' : 'false';
  
      document.getElementById('editModal').style.display = 'block';
    } catch (error) {
      console.error('Erro ao abrir modal:', error);
    }
  }
  
  document.getElementById('editForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const id = document.getElementById('editId').value;
    const updatedBook = {
      nome: document.getElementById('editNome').value,
      autor: document.getElementById('editAutor').value,
      lancamento: document.getElementById('editLancamento').value,
      disponivel: document.getElementById('editDisponivel').value === 'true'
    };
  
    try {
      await axios.put(`http://localhost:8800/books/${id}`, updatedBook);
      closeEditModal();
      getBooks(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  });
  
  async function showDeleteModal(id) {
    console.log('Exibindo modal de exclusão para ID:', id);
    bookIdToDelete = id;
    const modal = document.getElementById('deleteModal');
    modal.classList.add('show');
    modal.classList.remove('hide');
  }
  
  document.getElementById('confirmDelete').onclick = async function () {
    try {
      console.log('Tentando deletar o livro ID:', bookIdToDelete);
      await axios.delete(`http://localhost:8800/books/${bookIdToDelete}`);
  
      closeDeleteModal();
      setTimeout(() => {
        showMessage('Livro excluído com sucesso!');
        getBooks();
      }, 500);
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
      closeDeleteModal();
      setTimeout(() => {
        showMessage('Erro ao tentar excluir o livro.', 5000);
      }, 500);
    }
  };

  document.getElementById("cancelDelete").addEventListener("click", function() {
    closeDeleteModal();
  });

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

