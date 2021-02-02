const Sequelize = require("sequelize")
const Config = require("config")

module.exports = new Sequelize(
    Config.get("mysql.database"),
    Config.get("mysql.user"),
    Config.get("mysql.password"),
    {
        host: Config.get("mysql.host"),
        dialect: "mysql"
    }
)