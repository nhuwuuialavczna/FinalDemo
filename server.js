var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/img", function (req, res) {
    var fileName = req.query.fileName;
    res.sendFile(__dirname + "/Images/"+fileName);
});

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {

        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader",5);


app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        var a = req.files[0].filename;
        return res.end("File uploaded sucessfully!."+a);
    });
});

app.listen(process.env.PORT || 2000, function (a) {
    console.log("Listening to port 2000");
});