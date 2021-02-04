class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos() {

        const sql = `
            CREATE TABLE IF NOT EXISTS Atendimentos(
                id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                cliente     VARCHAR(50) NOT NULL,
                pet         VARCHAR(20),
                servico     VARCHAR(20) NOT NULL,
                status      VARCHAR(20) NOT NULL,
                observacoes VARCHAR(100),
                data        DATETIME NOT NULL,
                dataCriacao DATETIME NOT NULL
        )
        `.replace(/\s+/g,' ').trim()

        this.conexao.query(sql, error => {
            if(error) {
                console.log(error)
            } else {
                console.log("Tabela Atendimentos criada com sucesso")
            }
        })
    }
}

module.exports = new Tabelas