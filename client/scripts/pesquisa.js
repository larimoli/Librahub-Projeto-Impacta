const modal = document.getElementById('modalpesquisa');
        const openModal = document.getElementById('openModalpesquisa');
        const closeModal = document.getElementById('closeModalpesquisa');

        openModal.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });