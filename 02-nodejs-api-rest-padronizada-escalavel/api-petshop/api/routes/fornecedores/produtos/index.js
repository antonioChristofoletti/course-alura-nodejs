const router = require('express').Router({ mergeParams: true })

const Tabela = require("./TabelaProduto")

router.get("/", async (req, res) => {
    const idFornecedor = req.params.idFornecedor

    const produtoLista = await Tabela.lista(idFornecedor)

    res.send(JSON.stringify(produtoLista))
})

module.exports = router