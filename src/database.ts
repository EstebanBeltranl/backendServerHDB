import mongoose from "mongoose";
import config from "./config/config";

mongoose.connect(config.DB.URI, 
                {   useNewUrlParser: true, 
                    useUnifiedTopology: true, 
                    useCreateIndex: true,
                    useFindAndModify: false} );

const conection = mongoose.connection;

conection.once( 'open', () => {
    console.log('Mongo connection establecida');
})
conection.on( 'error', err => {
    console.log(err);
    process.exit(0)
})