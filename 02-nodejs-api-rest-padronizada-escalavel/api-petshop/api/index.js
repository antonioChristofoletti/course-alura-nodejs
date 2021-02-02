const Express = require("express")
const Config = require("config")
const bodyParser = require("body-parser")
const NaoEncontrado = require("./erros/NaoEncontrado")
const { formatosAceitaveis } = require("./Serializer/Serializer")

const SerializeError = require("./Serializer/SerializerError")

const app = new Express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    const headerAccept = req.header("Accept")
    const expectedFormat = headerAccept === "*/*" ? "application/json" : headerAccept

    if (formatosAceitaveis.indexOf(expectedFormat) === -1) {
        res.status(406).end()
    } else {
        res.setHeader("Content-Type", expectedFormat)
        next()
    }
})

app.use("/api/fornecedores", require("./routes/fornecedores"))

app.use((error, req, res, next) => {
    if (error instanceof NaoEncontrado) {
        res.status(404)
    } else {
        res.status(400)
    }

    const serialize = new SerializeError(res.getHeader('Content-Type'))

    res.send(
        serialize.serialize({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

app.listen(Config.get("api.port"), _ => {
    console.log("The API is online!")
})