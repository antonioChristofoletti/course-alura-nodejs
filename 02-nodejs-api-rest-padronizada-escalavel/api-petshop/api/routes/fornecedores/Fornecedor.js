const NaoEncontrado = require("../../erros/NaoEncontrado")
const TabelaFornecedor = require("./TabelaFornecedor")

module.exports = class Fornecedo {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }


    validar() {
        const camposAtualizar = ["email", "empresa", "categoria"]

        camposAtualizar.forEach(campo => {
            const valor = this[campo]

            if (typeof (valor) !== typeof (String).name)
                throw new Error(`O campo ${campo} deve ser do tipo texto`)

            if (valor.length === 0)
                throw new Error(`O campo ${campo} não pode ser vazio`)
        })
    }

    async criar() {

        this.validar()

        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar() {

        this.validar()

        const camposAtualizar = ["email", "empresa", "categoria"]

        const camposValoresAtualizar = camposAtualizar.map(campo => {
            const obj = {}
            obj[campo] = this[campo]

            return obj
        })

        await TabelaFornecedor.atualizar(this.id, Object.assign({}, ...camposValoresAtualizar))
    }

    async carregar() {
        const fornecedorFound = await TabelaFornecedor.pegarPorId(this.id)

        if (!fornecedorFound)
            throw new NaoEncontrado("Fornecedor não encontrado 123")

        this.id = fornecedorFound.id
        this.empresa = fornecedorFound.empresa
        this.email = fornecedorFound.email
        this.categoria = fornecedorFound.categoria
        this.dataCriacao = fornecedorFound.dataCriacao
        this.dataAtualizacao = fornecedorFound.dataAtualizacao
        this.versao = fornecedorFound.versao
    }

    async remover() {
        await TabelaFornecedor.remover(this.id)
    }
}