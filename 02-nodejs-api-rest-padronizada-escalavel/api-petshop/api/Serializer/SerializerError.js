const { Serializer } = require("./Serializer");

class SerializerError extends Serializer {
    constructor(contentType) {
        super()

        this.contentType = contentType
        this.publicFields = []

        this.tagSingular = "Erro"
        this.tagPlural = "Erros"
    }
}

module.exports = SerializerError