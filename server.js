require('dotenv').config();
const express = require('express');
const app = express();
const port = 5555;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
var qs = require('qs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req, res) => {
    // req.query.data
    let url = 'limit exceeded';
    var data = qs.stringify({
        'api_dev_key': process.env.API_KEY,
        'api_paste_code': req.query.data,
        'api_option': 'paste',
        'api_paste_private':0,
        'api_paste_expire_date':'N',
        'api_paste_format':'html',
    });

    var config = {
        method: 'post',
        url: 'https://pastebin.com/api/api_post.php',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    axios(config)
    .then(function (response) {
        url = JSON.stringify(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

    res.send(url);

})

app.listen(port, ()=>{
    console.log(port);
})







