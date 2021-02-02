const { Serializer } = require("./Serializer");

class SerializerFornecedor extends Serializer {
    constructor(contentType) {
        super()

        this.contentType = contentType
        this.publicFields = ["email", "empresa", "categoria"]

        this.tagSingular = "Fornecedor"
        this.tagPlural = "Fornecedores"
    }
}

module.exports = SerializerFornecedor