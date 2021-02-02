const Modelo = require("./modeloTabelaFornecedor")

module.exports = {
    async listar() {
        return Modelo.findAll({ raw: true })
    },

    async inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },

    async atualizar(id, camposValoresAtualizar) {
        Modelo.update(camposValoresAtualizar, { where: { id } })
    },

    async pegarPorId(id) {
        const fornecedorFound = await Modelo.findOne({ where: { id } })

        return fornecedorFound
    },

    async remover(id) {
        return Modelo.destroy({ where: { id } })
    }
}