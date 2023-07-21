const server = require('./api/server.js');
const { PORT } = require('./config/index.js');
const express = require('express');

require('dotenv').config();

server.use(express.static('documentation'));

server.get('/', (req, res, next) => {
    res.send(`
    <div style="text-align: center;">
        <h1>Welcome to Twitter Clone Project</h1>
        <img src="/twitter-bird-symbols-png-logo-0.png" alt="Twitter Logo" style="width: 30%;" />
        <p> Aytaç Şahin | 2023 </p>
    </div>
`)
})

server.listen(PORT, () => {
    console.log(`${PORT} is listening...`);
});
