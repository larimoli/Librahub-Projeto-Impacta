# LibraHub

LibraHub é um aplicativo para cadastro e gerenciamento de livros, desenvolvido utilizando Node.js, Express, MySQL e Axios para o front-end.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/larimoli/LibraHub.git
   cd LibraHub   
2. Instale as dependências do projeto:
  ```yarn install```

## Configuração
1. Crie um banco de dados MySQL e configure as credenciais no arquivo db.js:
   
import mysql from 'mysql';

export const db = mysql.createConnection({

  host: 'localhost',
  
  user: 'root',
  
  password: 'senha', // solicitar senha para LariMoli
  
  database: 'crud'
});

2. Execute o script SQL para criar a tabela livros no banco de dados:
   
   CREATE TABLE livros (
   
    id INT AUTO_INCREMENT PRIMARY KEY,
   
    nome VARCHAR(255) NOT NULL,
   
    autor VARCHAR(255) NOT NULL,
   
    lancamento DATE NOT NULL,
   
    disponivel BOOLEAN NOT NULL

2. Adicione restrições de unicidade para evitar duplicatas:
   
ALTER TABLE `crud`.`livros` 
   ADD UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE;
   ;

## Uso
1. Inicie o servidor:
```yarn start```
2. Abra o navegador e acesse http://localhost:8800/.

## Tecnologias
> Node.js

> Express

> MySQL

> Axios

> HTML

> CSS

> JavaScript

## Funcionalidades
> Cadastro de Livros: Permite cadastrar livros com título, autor, data de lançamento e disponibilidade. (Feito)

> Consulta de Livros: Permite consultar todos os livros cadastrados. (Em andamento)

> Feedback de Cadastro: Mensagens de sucesso ou erro são exibidas após o cadastro. (Feito)

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
1. Faça um fork deste repositório.
2. Crie uma nova branch:
   ```git checkout -b minha-nova-feature```
3. Envie para a branch developer:
   ```git push origin minha-nova-feature```
4. Abra um pull request apontando para a branch developer.
5. Após a aprovação do pull request, faça o merge na branch main.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.




