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
  //webscrape the url
  let baseURLArr = req.body.url.split('/');
  let ficName = baseURLArr.pop();
  baseURLArr.pop();
  const baseURL = baseURLArr.join('/');
  let chapter = 1;
    axios.get(baseURL+'/'+chapter)
    .catch((err) => {
      console.log(err);
    })
    .then((res)=> {
      const chapterText = $('#storytext', res.data).html();
      fs.writeFile('public/fics/'+ficName+'.txt', chapterText, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Chapter ' + chapter + ' saved!');
        }
      });


    });
  // axios.get(req.body.url)
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then((res)=> {
  //   const chapterText = $('#storytext', res.data).html();
  //   console.log(chapterText);
  // })
  res.send("Successful submission");

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});