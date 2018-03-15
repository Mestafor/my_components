const path = require('path');
const {readFile} = require('fs');
// import { readFile } from 'fs';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-type', 'text/html');
  readFile(path.resolve('index.html'), (err, data) => {
    if(err) {
      throw new Error(err);
    }

    res.send(data.toString());
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
