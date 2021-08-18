const express = require('express');
const db = require('./db.js');

const PORT = 3001;
db.connect();

const app = express();
const router = express.Router();

const artistsRoutes = require('./routes/artists.routes');
const artistRoutes = require('./routes/artist.routes');
const { urlencoded } = require('express');

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/artists", artistsRoutes);
app.use("/artist", artistRoutes);

router.get("/", (req, res) => {
    res.send("¡Hola mundo!");
});

router.get("/prueba", (req, res) => {
    res.send("Esta es la página de prueba");
});

app.use("/", router);

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log('Error handler ', err);
    res.status(err.status || 500).json(err.message || "Unexpected error")
});

app.listen(PORT, () => {
    console.log("servidor a máxima potencia en puerto: ", PORT);
});