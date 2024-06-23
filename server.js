const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Endpoint to get JSON data
app.get('/leaderboard.json', (req, res) => {
    res.sendFile(path.join(__dirname, '/leaderboard.json'));
});

// Endpoint to update JSON data
app.post('/', (req, res) => {
    const newData = req.body;
    fs.writeFile('./leaderboard.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating JSON file');
        } else {
            res.send('JSON file updated successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
