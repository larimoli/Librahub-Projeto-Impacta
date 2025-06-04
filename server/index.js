import express from "express";
import bookRoutes from "./routes/books.js";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

/* app.get('/', (req, res) => {
    // res.send('Bem-vindo ao servidor Express!');
}); */

app.use("/books", bookRoutes);

app.listen(8800, () => {
    console.log('Servidor rodando em http:/localhost:8800');    

    db.connect(err => {
        if (err) {
            log.console.error('Erro ao conectar ao banco de dados', err);
            return;
        }
        console.log('Conectado ao banco de dados MYSQL');
        
    })
});