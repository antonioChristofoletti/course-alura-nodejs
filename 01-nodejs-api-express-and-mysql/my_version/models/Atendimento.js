const conexao = require("../infraestrutura/conexao")
const moment = require("moment")

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS")

        const validacoes = [
            {
                nome: "data",
                valido: moment(data).isSameOrAfter(dataCriacao),
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: atendimento.clinte.legnth >= 5,
                mensagem: "Cliente deve ter pelo menos cinco caracteres"
            }
        ]

        const hasErrors = validacoes.filter(campo => !campo.valido).length

        if(hasErrors) {
            res.status(400).json(erros)
            return
        } 

        const atendimentoDatado = { ...atendimento, dataCriacao, data }
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    lista(res) {
        const sql = "SELECT * FROM Atendimentos"

        conexao.query(sql, (error, result) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (error, result) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result[0])
            }
        })
    }

    altera(id, atendimento, res) {
        const sql = "UPDATE Atendimentos set ? WHERE id=?"

        atendimento.data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS")

        conexao.query(sql, [atendimento, id], (error, result) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({atendimento})
            }
        })
    }

    deleta(id, res) {
        const query = "DELETE FROM Atendimentos WHERE id=?"

        conexao.query(query, id, (error, result) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento