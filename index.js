const express = require('express');
const db = require('./db.js');
const cors = require('cors');
const path = require('path');

const PORT = 3001;
db.connect();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    origin: ['http://localhost:4200'], //todo: add netlify name,
    credentials: true, 
}));

// app.use(express.static(path.join(__dirname, 'public')));


const router = express.Router();

const artistsRoutes = require('./routes/artists.routes');
const artistRoutes = require('./routes/artist.routes');
const albumsRoutes = require('./routes/albums.routes');
const albumRoutes = require('./routes/album.routes');
const { urlencoded } = require('express');

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/artists", artistsRoutes);
app.use("/artist", artistRoutes);
app.use("/album", albumRoutes);
app.use("/albums", albumsRoutes);

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
    console.log("servidor a toda máquina en puerto: ", PORT);
});
