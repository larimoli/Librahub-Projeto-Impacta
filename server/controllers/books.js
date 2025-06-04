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
