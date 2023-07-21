const server = require('./api/server.js');
const { PORT } = require('./config/index.js');

require('dotenv').config();

server.get('/', (req, res, next) => {
    res.send(`
    <div style="text-align: center;">
        <h1>Welcome to Twitter Clone Project</h1>
        <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="Twitter Logo" />
        <p> Aytaç Şahin | 2023 </p>
    </div>
`)
})

server.listen(PORT, () => {
    console.log(`${PORT} is listening...`);
});
