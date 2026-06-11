// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
}

type DBConfig = {
    
DB_USERNAME:string
DB_PASSWORD:string
HOST_NAME:string
DB_NAME:string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}


loadEnv();


export const serverConfig: ServerConfig = {
    
    PORT: Number(process.env.PORT) || 3001
};


export const dbConfig: DBConfig = {
    
    DB_NAME: String(process.env.DB_NAME) || 'test-db',
    DB_PASSWORD:String(process.env.DB_PASSWORD) || 'root',
    DB_USERNAME:String(process.env.DB_USERNAME) || 'root',
    HOST_NAME:String(process.env.HOST_NAME) || "localhost"
};