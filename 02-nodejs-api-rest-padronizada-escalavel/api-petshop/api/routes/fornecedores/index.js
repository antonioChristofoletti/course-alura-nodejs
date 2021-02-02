const router = require("express").Router()

const ModeloTabela = require("./TabelaFornecedor")
const Fornecedor = require("./Fornecedor")

const SerializerFornecedor = require("../../Serializer/SerializerFornecedor")

router.get("/", async (req, res) => {
    const fornecedores = await ModeloTabela.listar()

    const serialize = new SerializerFornecedor(res.getHeader('Content-Type'))

    res.status(200).send(serialize.serialize(fornecedores))
})

router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({ id })

    try {
        await fornecedor.carregar()

        const serialize = new SerializerFornecedor(res.getHeader('Content-Type'))
        res.status(200).send(serialize.serialize(fornecedor))
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()

    const serialize = new SerializerFornecedor(res.getHeader('Content-Type'))
    res.status(201).send(serialize.serialize(fornecedor))
})

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id

        await new Fornecedor({ id }).carregar()

        const dadosRecebidos = Object.assign({}, req.body, { id })

        const fornecedor = new Fornecedor(dadosRecebidos)

        await fornecedor.atualizar()

        const serialize = new SerializerFornecedor(res.getHeader('Content-Type'))
        res.status(200).send(serialize.serialize(fornecedor))
    } catch (error) {
        res.send({ message: `Erro ${error.message}` })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id

        const fornecedor = new Fornecedor({ id })

        await fornecedor.carregar()

        await fornecedor.remover()

        res.status(204).end()
    } catch (error) {
        res.send({ message: `Erro ${error.message}` })
    }
})

router.use('/:idFornecedor/produtos', require("./produtos"))

module.exports = router