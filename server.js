const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fetchTopHeadline = async () => {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e';
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
};

const fetchNewsSources = async () => {
    const url = 'https://newsapi.org/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e';
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
};

const fetchSearchedTopHeadlines = async (searchText) => {
    searchText = searchText || null;
    const url = `https://newsapi.org/v2/top-headlines?q=${searchText}&apiKey=099148be22804e849a0c6fe022b7cf5e`;
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
};

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.get('/api/getTopHeadlines', (req, res) => {
    fetchTopHeadline().then(data => res.send(data));
});

app.get('/api/getNewsSources', (req, res) => {
    fetchNewsSources().then(data => res.send(data));
});

app.get('/api/getSearchedTopHeadlines', (req, res) => {
    const { search } = req.query;
    fetchSearchedTopHeadlines(search).then(data => res.send(data));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// app.listen(app.get('port'), () => {
//     console.log('Mean Stack listening on port ' + app.get('port'));
// });