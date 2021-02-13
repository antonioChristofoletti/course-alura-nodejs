const blacklist = require("./blacklist")
const jwt = require("jsonwebtoken")
const { createHash } = require("crypto")
const { promisify } = require("util")

const blackLisExistAsync = promisify(blacklist.exists).bind(blacklist)
const blackListSetAsync = promisify(blacklist.set).bind(blacklist)

function geraTokenHash(token) {
    return createHash("sha256").update(token).digest("hex")
}

module.exports = {
    adiciona: async token => {
        const dataExpiracao = jwt.decode(token).exp

        const tokenHash = geraTokenHash(token)

        await blackListSetAsync(tokenHash, "")

        blacklist.expireat(tokenHash, dataExpiracao)
    },
    contemToken: async token => {
        const tokenHash = geraTokenHash(token)
        const resultado = await blackLisExistAsync(tokenHash)
        return resultado == 1
    }
}