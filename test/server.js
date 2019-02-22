let express = require('express');
let path = require('path');
let app = express();
let colors = require('colors');

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, './../dist/')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/js/loadingSprite', function (req, res) {
    res.sendFile(path.join(__dirname, './../dist/js/loadingSprite.min.js'));
});

// app.get('/css/spinkit', function (req, res) {
//     res.sendFile(path.join(__dirname, './../dist/css/spinkit.min.css'));
// });

function listen(port) {
    app.listen(port, () => {
        console.log('server is running on '.gray + ('port ' + port).yellow);
    }).on('error', (err) => {
        if (err.errno === 'EADDRINUSE') {
            console.log(('---- Port ' + port).red + 'is busy'.pink + ('trying with port ' + (port + 1) + ' ----').yellow);
            listen(port + 1);
        }  else {
            console.error(err);
        }
    });
}

listen(4000);