import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/index";

const sequelize = new Sequelize({
    "username":dbConfig.DB_USERNAME,
    "password": dbConfig.DB_PASSWORD,
    "database": dbConfig.DB_NAME,
    "host": dbConfig.HOST_NAME,
    "dialect": "mysql",
    "logging":false
});

export default sequelize;