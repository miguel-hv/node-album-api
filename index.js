const express = require('express');
require('./db.js');

const PORT = 3001;
const app = express();
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('¡Hola mundo!');
});

router.get('/prueba', (req,res)=>{
    res.send('Esta es la página de prueba');
});

app.use('/', router);

app.listen(PORT, ()=>{
    console.log('servidor a máxima potencia en puerto: ', PORT);
});

