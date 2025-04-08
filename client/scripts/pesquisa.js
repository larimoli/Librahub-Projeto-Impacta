// Função para buscar os livros
async function getBooks() {
    const response = await fetch('/api/books'); // Endpoint da sua API
    const books = await response.json();
    renderBooks(books);
  }
  
  // Função para renderizar os livros na div
  function renderBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // Limpar conteúdo anterior
    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.innerHTML = `
        <p><strong>Título:</strong> ${book.title}</p>
        <p><strong>Lançamento:</strong> ${book.releaseDate}</p>
        <p><strong>Disponível:</strong> ${book.available ? 'Sim' : 'Não'}</p>
        <p><strong>Autor:</strong> ${book.author}</p>
      `;
      container.appendChild(bookDiv);
    });
  }
  
  // Função para buscar por título
  async function searchBooks() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const response = await fetch('/api/books'); // Endpoint da sua API
    const books = await response.json();
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchValue)
    );
    renderBooks(filteredBooks);
  }
  
  // Buscar os livros ao carregar a página
  document.addEventListener('DOMContentLoaded', getBooks);
  