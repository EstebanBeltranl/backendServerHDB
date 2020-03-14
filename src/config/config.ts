export default {
    jwtSecret: process.env.JWT_SECRET || 'ultramentesecreto122131313',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hospitalDB'
    },
    GOOGLE: {
        CLIENT_ID: '686922171643-sgnf7etrtu91tjvjgublqf44k516ukj6.apps.googleusercontent.com'
    }
}