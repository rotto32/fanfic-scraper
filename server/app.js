const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const $ = require('cheerio');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public' + '/index.html'));
});

app.post('/submit',  (req, res) => {
  let baseURLArr = req.body.url.split('/');
  let ficName = baseURLArr.pop();
  baseURLArr.pop();
  const baseURL = baseURLArr.join('/');
  let chapter = 1;
  let maxChapter = req.body.maxChap;
    axios.get(baseURL+'/'+chapter)
    .catch((err) => {
      console.log('Error getting fic', err);
    })
    .then((res)=> {
      const chapterText = $('#storytext', res.data).html();
      fs.writeFile(path.join(__dirname + '/public/fics/'+ficName+'.txt'), chapterText, (err) => {
        if (err) {
          console.log('Error creating file', err);
        } 
      });

      fs.stat(path.join(__dirname + '/public/fics/'+ficName+'.txt'), function(err, stat) {
        if (err === null) {
          while (chapter <= maxChapter) {
            chapter++;
            axios.get(baseURL+'/'+chapter)
              .catch((err) => {
                console.log(err);
              })
              .then((res) => {
                const chapterText = $('#storytext', res.data).html();
                  fs.appendFile(path.join(__dirname + '/public/fics/'+ficName+'.txt'), chapterText, (err) => {
                    if (err) {
                      console.log('Error appending file', err);
                    }
                  });
              })
          }
        }
      });

    });
    console.log('Compilation completed');
    res.sendFile(path.join(__dirname + '/public' + '/fics/'+ficName+'.txt'));

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});