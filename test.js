const {readFile} = require('fs');

readFile('index.html', (err, data) => {
    console.log(data.toString());
})