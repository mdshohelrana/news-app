const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 5000;

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

app.get('/api/getTopHeadlines', (req, res) => {
    fetchTopHeadline().then(data => res.send(data));
});

app.get('/api/getNewsSources', (req, res) => {
    fetchNewsSources().then(data => res.send(data));
});

app.get('/api/getSearchedTopHeadlines', (req, res) => {
    fetchSearchedTopHeadlines(req.searchText).then(data => res.send(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));