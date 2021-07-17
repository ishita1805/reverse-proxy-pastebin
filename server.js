require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
var qs = require('qs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/health', (req, res) => {
    res.json({
        status:'okay'
    })
})


app.get('/', (req, res) => {
    // req.query.data
    let url = 'limit exceeded';
    var data = qs.stringify({
        'api_dev_key': 'ToZZRZRjzGrf_WgfpfZkh9_GhhZXpxgv',
        'api_paste_code': req.query.data,
        'api_option': 'paste',
        'api_paste_private':0,
        'api_paste_expire_date':'N',
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
       res.send(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
        res.send(url);
    });
})


app.get('/getraw', (req, res) => {
    axios.get(`https://pastebin.com/raw/${req.query.data}`)
    .then(function (response) {
       res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
        res.send('error occured');
    });
})


app.listen(port, ()=>{
    console.log(port);
})







