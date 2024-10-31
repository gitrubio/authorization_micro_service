import 'dotenv/config'

export default {
    SECRET : 'products-api-secret',
    DB_CONNECTION : process.env.DB_CONNECTION || '',
    PORT:  process.env.PORT || 3000,
    API_KEY: process.env.API_KEY || "",
    RUNWAYML_API_SECRET: process.env.RUNWAYML_API_SECRET || "",
}