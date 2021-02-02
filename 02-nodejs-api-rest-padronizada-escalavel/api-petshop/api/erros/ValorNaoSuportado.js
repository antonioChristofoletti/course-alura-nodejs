class ValorNaoSuportado extends Error {
    constructor(mensagem) {
        super(mensagem)

        this.name = "ValorNaoSuportado"
        this.idErro = 1
    }
}

module.exports = ValorNaoSuportado