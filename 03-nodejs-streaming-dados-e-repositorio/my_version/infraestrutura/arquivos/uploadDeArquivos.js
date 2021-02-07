const fs = require("fs")
const path = require('path')

module.exports = (caminhoArquivo, nomeArquivo, callbackFunction) => {
  const tiposValidos = ['jpg', 'png', 'jpeg']
  const tipo = path.extname(caminhoArquivo)
  const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

  if (tipoEhValido) {
    const caminhoNovo = `./assets/imagens/${nomeArquivo}${tipo}`

    fs.createReadStream(caminhoArquivo)
      .pipe(fs.createWriteStream(caminhoNovo))
      .on("finish", () => callbackFunction(null, caminhoNovo))
      .on("error", (erro) => callbackFunction(erro.message, null))
  } else {
    callbackFunction("O tipo é inválido", null)
  }
}