const uploadDeArquivos = require("../infraestrutura/arquivos/uploadDeArquivos")
const conexao = require("../infraestrutura/database/conexao")

class Pet {
    adiciona(pet, res) {
        uploadDeArquivos(pet.imagem, pet.nome, (erro, caminhoSalvo) => {
            if (erro) {
                res.status(400).json({ erro })
                return
            }

            const novoPet = {
                nome: pet.nome,
                imagem: caminhoSalvo
            }

            const query = "INSERT INTO Pets SET ?"

            conexao.query(query, pet, (erro, result) => {
                if (erro) {
                    console.log(erro)
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(novoPet)
                }
            })
        })
    }
}

module.exports = new Pet()