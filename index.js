require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;
let orgUrl;
let surl = 1;
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyparser.urlencoded({extended: false}));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',(req, res)=>{
  let url = req.body.url;
  let urlObj= new URL(url);
  dns.lookup(urlObj.hostname,(err)=>{
    if(err){
      res.json({"error":"invalid url"})
    }
    else{
      orgUrl = url;
      res.json({"original_url":url, "short_url":surl})
    }
  })
})
app.get("/api/shorturl/1",(req, res)=>{
  res.redirect(orgUrl);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
