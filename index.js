require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoDBconnect = require('./config/mongoConnect.js');
const DATABASE_URL = process.env.DATABASE_URL;

mongoDBconnect(DATABASE_URL);

app.use(express.json());

app.use(cors())

const authRoute = require('./routes/authRoute.js');
const mongoauth = require('./routes/mongoroute.js');
const message = require('./routes/message.js');

const PORT = process.env.PORT;

app.use('/mysqlapi' , authRoute );
app.use('/mongoapi', mongoauth);
app.use('/user', message)


app.listen(PORT , () => { console.log(`Listening on port ${PORT}`)});