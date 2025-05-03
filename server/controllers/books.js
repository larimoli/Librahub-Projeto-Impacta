import { db } from "../db.js";

export const getBooks = (_, res) => {
    const q = "SELECT * FROM livros";

    db.query(q, (err, data) => {
        if (err) {
            console.log('Erro ao obter livros:', err);
            return res.json(err);
        }

        return res.status(200).json(data);
    });
};

export const getBookById = (req, res) => {
    const q = "SELECT * FROM livros WHERE id = ?";
  
    db.query(q, [req.params.id], (err, result) => {
        if (err) {
            console.error("Erro ao buscar livro:", err);
            return res.status(500).json({ message: "Erro ao buscar livro", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Livro não encontrado!" });
        }
        res.status(200).json(result[0]); // Retorna apenas um livro
    });
  };

export const addBooks = (req, res) => {
    const q = 
    "INSERT INTO livros (`nome`, `autor`, `lancamento`, `disponivel`) VALUES (?)";

    const values = [
        req.body.nome, 
        req.body.autor, 
        req.body.lancamento,
        req.body.disponivel,
    ];

    db.query(q, [values], (err) => {
        if (err) {
            console.log('Erro ao cadastrar livro:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({message: "Livro já cadastrado!"});
            }

            return res.status(500).json({message: "Erro ao cadastrar livro", error: err});
        }
        
        console.log('Livro cadastrado com sucesso!');
        return res.status(200).json("Livro cadastrado com sucesso!");
    });
};

export const updateBooks = (req, res) => {
    console.log("Recebendo atualização para ID:", req.params.id);
    const q = "UPDATE livros SET nome = ?, autor = ?, lancamento = ?, disponivel = ? WHERE id = ?";

    const values = [
        req.body.nome, 
        req.body.autor, 
        req.body.lancamento, 
        req.body.disponivel,
        req.params.id
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error('Erro ao atualizar livro:', err);
            return res.status(500).json({ message: "Erro ao atualizar livro", error: err });
        }

        console.log('Livro atualizado com sucesso!');
        return res.status(200).json({ message: "Livro atualizado com sucesso!" });
    });
};

export const deleteBooks = (req, res) => {
    const q = "DELETE FROM livros WHERE id = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) {
            console.error('Erro ao deletar livro:', err);
            return res.status(500).json({ message: "Erro ao deletar livro", error: err });            
        }

        console.log('Livro deletado com sucesso!');
        return res.status(200).json({ message: "Livro deletado com sucesso!" });
    });
};