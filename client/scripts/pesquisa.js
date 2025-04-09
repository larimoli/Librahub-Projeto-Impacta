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
                <div class="info-text">${book.disponivel ? 'Sim' : 'Não'}</div>
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
  