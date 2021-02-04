const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')
const Serializador = require('../../../Serializador').SerializadorProduto

roteador.options("/", (req, res) => {
    res.set("Access-Control-Allow-methods", "GET, PUT, DELETE, POST")
    res.set("Access-Control-Allow-Headers", "Content-type")

    res.status(204).end()
})

roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.fornecedor.id)
    const serializador = new Serializador(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(produtos)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type')
        )

        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        resposta.set("Last-Modified", timestamp)
        resposta.set("Location", `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)
        resposta.set('ETag', produto.version)

        resposta.status(201)
        resposta.send(
            serializador.serializar(produto)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
    }

    const produto = new Produto(dados)
    await produto.apagar()
    resposta.status(204)
    resposta.end()
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao']
        )


        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        resposta.set("Last-Modified", timestamp)
        resposta.set('ETag', produto.version)

        resposta.send(
            serializador.serializar(produto)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options("/:id", (req, res) => {
    res.set("Access-Control-Allow-methods", "GET, PUT, DELETE")
    res.set("Access-Control-Allow-Headers", "Content-type")

    res.status(204).end()
})

roteador.head("/:id", async (req, res, next) => {
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()

        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        res.set("Last-Modified", timestamp)
        res.set('ETag', produto.versao)

        res.status(200).end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id,
                fornecedor: requisicao.fornecedor.id
            }
        )

        const produto = new Produto(dados)
        await produto.atualizar()
        await produto.carregar()

        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        resposta.set("Last-Modified", timestamp)
        resposta.set('ETag', produto.version)

        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:id/diminuir-estoque', (req, res) => {
    res.set("Access-Control-Allow-methods", "POST")
    res.set("Access-Control-Allow-Headers", "Content-type")

    res.status(204).end()
})

roteador.post('/:id/diminuir-estoque', async (requisicao, resposta, proximo) => {
    try {
        const produto = new Produto({
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        })

        await produto.carregar()
        produto.estoque = produto.estoque - requisicao.body.quantidade
        await produto.diminuirEstoque()
        await produto.carregar()

        const timestamp = (new Date(produto.dataAtualizacao)).getTime()
        resposta.set("Last-Modified", timestamp)
        resposta.set('ETag', produto.version)

        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador