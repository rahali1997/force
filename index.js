
const express  = require("express") ;

const session = require('express-session')
var memoryStore = new session.MemoryStore();

const bodyParser = require("body-parser"); 

const mongoose = require("mongoose") ; 
 

const app = express();

app.use(
  session(
  { 
    secret: 'qYvZ1am20pVWYC78v11oY0CnfxnV1p67', resave: false, saveUninitialized: true, store: memoryStore 
    })
  );

  const keycloak = require('./config/keycloak-config.js').initKeycloak( memoryStore);


const logger = require("morgan") ; 
require("dotenv/config") ;
const mainRoutes = require('./server/routes/main');



app.use(keycloak.middleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/', mainRoutes);



mongoose.connect(
  
    process.env.DB_CONNECTION_STRING,
    
  (req,res)=>{
    console.log("connected to the database! ")
}).catch((error)=> {
    console.log('Error connecting to database');
  });


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to ou Inetum force de vente solution ',
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port} `);
});


