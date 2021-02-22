const express = require('express');
const bodyParser = require('body-parser');

const gasRoutes = require('./routes/gas-routes');
const smokeRoutes = require('./routes/smoke-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    
    next();
});

app.use('/api/gas', gasRoutes);
app.use('/api/smoke', smokeRoutes)

app.listen(5001);




