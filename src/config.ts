import 'dotenv/config'

export default {
    SECRET : 'products-api-secret',
    DB_CONNECTION : process.env.DB_CONNECTION || '',
    PORT:  process.env.PORT || 3000
}