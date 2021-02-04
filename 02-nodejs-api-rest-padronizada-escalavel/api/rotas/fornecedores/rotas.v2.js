const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.options("/", (req, res) => {
    res.set("Access-Control-Allow-methods", "GET")
    res.set("Access-Control-Allow-Headers", "Content-type")

    res.status(204).end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(serializador.serializar(resultados))
})

module.exports = roteador