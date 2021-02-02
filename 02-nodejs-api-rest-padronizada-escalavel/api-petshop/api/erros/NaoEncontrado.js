class NaoEncontrado extends Error {
    constructor(mensagem) {
        super(mensagem)

        this.name = "NaoEncontrado"
        this.idErro = 0
    }
}

module.exports = NaoEncontrado