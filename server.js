// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
//app.use(bodyParser.urlencoded({extended: true}))
 
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
  var upload = multer({ storage: storage });
  const MongoClient = require('mongodb').MongoClient
  const myurl = 'mongodb://localhost:27017';
   
  MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') 
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  });


const app = express();
 
//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');   
});
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error(' choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  }); 

app.listen(3000, () => console.log('Server started on port 3000'));