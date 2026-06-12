import { dbConfig } from "./index";


const Config = {
  development:{
    "username":dbConfig.DB_USERNAME,
    "password": dbConfig.DB_PASSWORD,
    "database": dbConfig.DB_NAME,
    "host": dbConfig.HOST_NAME,
    "dialect": "mysql"
  }
}

export default Config;