const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
const { feeds } = require('./config');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your PROD URL
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/rss-feed', async (req, res) => {
    try {
        const requests = feeds.map((feed) => axios.get(feed.url));
        axios.all(requests).then((responses) => {
            const channels = [];
            responses.forEach((resp) => {
                if (resp.data) {
                    const channel = resp.data;
                    channels.push(channel);
                }
            });
            res.json(channels)
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});