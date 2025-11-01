import dotenv from 'dotenv'

dotenv.config();

export const config ={
    port: process.env.PORT || 3002 ,

    mongoUri: process.env.MONGO_DB_URL ||""



}