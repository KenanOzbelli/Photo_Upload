// Dependencies
let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv')
    dotenv.config();

    // Port 
    const port = process.env.PORT || 4000;
    
    // Server
    const app = express();

    // Routes
    const api = require('../server/routes/user.routes'); 

    // Mongoose 
    mongoose.Promise = global.Promise;
    mongoose.connect( `mongodb+srv://dbKenan:${process.env.dbPassword}@clusterfun.u7r74.mongodb.net/picUpload?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }).then(()=>{
        console.log('Database successfully connected')
    }, 
    error =>{
        console.log('Database could not be connected :/ ' + error)
    })

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use('/public', express.static('public'));
    app.use('/api', api);

    app.listen(port, () => {
        console.log('Connected to port ' + port)
    })

    app.use((req, res, next) => {
        setImmediate(() => {
            next(new Error('something went wrong'));
        })
    });

    app.use(function (err, req, res, next){
        console.log(err.message);
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    })

