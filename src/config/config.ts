export default {
    jwtSecret: process.env.JWT_SECRET || 'ultramentesecreto122131313',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hospitalDB'
    }
}