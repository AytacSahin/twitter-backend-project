const server = require('./api/server.js');

const PORT = process.env.PORT || 9000;

server.get('/', (req, res, next) => {
    res.send("<h1>Welcome to S16 Backend Challenge</h2> <p>Aytaç Şahin | 2023</p>")
})

server.listen(PORT, () => {
    console.log(`${PORT} is listening...`);
});