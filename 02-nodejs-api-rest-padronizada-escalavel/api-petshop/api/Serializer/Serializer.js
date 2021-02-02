const ValorNaoSuportado = require("../erros/ValorNaoSuportado")
const jsontoxml = require("jsontoxml")

class Serializer {
    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados) {
        const isArray = Array.isArray(dados)
        const tag = isArray ? this.tagSingular : this.tagPlural

        if (isArray) {
            dados = dados.map(dado => {
                return {
                    [this.tagSingular]: dado
                }
            })
        }

        return jsontoxml({ [tag]: dados })
    }

    serialize(dados) {
        const filteredDados = this._filter(dados)

        if (this.contentType == "application/json") {
            return this.json(filteredDados)
        }

        if (this.contentType == "application/xml") {
            return this.xml(filteredDados)
        }

        throw new ValorNaoSuportado(`O tipo '${this.contentType}' não é suportado`)
    }

    _filter(dados) {
        if (Array.isArray(dados)) {
            return this._filterListObjects(dados)
        } else {
            return this._filterObject(dados)
        }
    }

    _filterObject(dados) {
        let newObjet = {}
        this.publicFields.forEach((field) => {
            if (dados.hasOwnProperty(field))
                newObjet[field] = dados[field]
        })

        return newObjet
    }

    _filterListObjects(dadosList) {
        return dadosList.map(dados => this._filterObject(dados))
    }
}

module.exports = {
    Serializer,
    formatosAceitaveis: ["application/json", "application/xml"]
}