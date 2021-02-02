const Sequelize = require("sequelize")
const instancia = require("../../../database")

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowAnull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowAnull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowAnull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowAnull: false,
        references: {
            model: require("../modeloTabelaFornecedor"),
            key: "id"
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "produtos",
    timestamps: true,
    createdAt: "dataCriacao",
    updatedAt: "dataAtualizacao",
    version: "versao"
}

module.exports = instancia.define("produto", colunas, opcoes)