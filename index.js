var express = require('express');
var cors = require('cors');
const multer  = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Define a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

app.post('/api/fileanalyse', upload.any(), (req, res) => {
  const file = req.files[0];
  res.json({
    'name': file.originalname,
    'type': file.mimetype,
    'size': file.size});
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
