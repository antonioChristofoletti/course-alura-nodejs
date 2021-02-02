const Modelo = require("./ModeloTabelaProduto")

module.exports = {
    lista(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    }
}