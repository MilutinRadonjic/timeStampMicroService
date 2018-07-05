// BAsic dependancies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var formatDate = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}

app.get('/api/timestamp/:dateVal', function (req, res, next) {
    var dateVal = req.params.dateVal;
    
    const dateParsed = isNaN(Number(dateVal)) ? dateVal: Number(dateVal);
    console.log("dateParsed: ", Number(dateVal));

    var isInvalidDate = new Date(dateParsed).getTime();
    console.log('isInvalidDate mi je : ', isInvalidDate);
    if (isNaN(isInvalidDate)) {
        return res.json({ 'error': "Invalid Date" });
    }
    else {
        if (isNaN(Number(dateVal))) {
            // If it is natural input
            var unixDate = new Date(dateVal).getTime() / 1000;
            var naturalDate = new Date(dateVal);
            var naturalDate = naturalDate.toLocaleDateString('en-us', formatDate);
        }
        else {
            // unix timestamp input
            var unixDate = dateVal;
            var naturalDate = new Date(dateVal * 1000);
            var naturalDate = naturalDate.toLocaleDateString('en-us', formatDate);
        }
    }
    res.json({ unix: unixDate, natural: naturalDate });
    next();
});

app.get('/api/timestamp/', function (req, res) {
    var naturalDate = new Date();
    var unixDate = new Date().getTime();
    var naturalDate = naturalDate.toLocaleDateString('en-us', formatDate);
    res.json({ unix: unixDate, natural: naturalDate });
});
app.listen(process.env.PORT || 3000, function () {
    console.log('App is working');
});