const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = 3000;
const app = express();
const folderPath = './texts';

// Middleware-ek beállítása
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors()); 

// Szöveg olvasása
app.get('/read/:fileName', (req, res) => {
    const PATH = path.join(__dirname, "texts", req.params.fileName)
    fs.readFile(PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Hiba történt a fájl olvasása közben.');
        }
        res.send(data);
    });
});

// Szöveg mentése
app.post('/save/:fileName', (req, res) => {
    const newText = req.body.text;
    const PATH = path.join(__dirname, "texts", req.params.fileName)
    fs.writeFile(PATH, newText, 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Hiba történt a fájl mentése közben.');
        }
        res.send('Szöveg mentve!');
    });
});

app.get('/allfiles', (req, res) =>{
    fs.readdir(folderPath, (err, files) => {
        console.log(files);
      if (err) {
        console.error('Error reading the directory:', err);
        return;
      }
      res.send(files);
    });
});

// Szerver indítása
app.listen(PORT, () => { 
    console.log(`Szerver működik a http://localhost:${PORT}`);
});