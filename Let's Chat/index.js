const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var formidable = require('formidable');
http.listen(4000, () => {
    console.log('listening on *:4000');
});
app.use('/files', express.static('files'));

app.get("/images/starchat.png", (req, res) => {
    res.sendFile(__dirname + "/images/starchat.png");
});

app.get("/style2.css", (req, res) => {
    res.sendFile(__dirname + "/style2.css");
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + '/style.css');
});
 
app.get('/images/bodyimg.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/bodyimg.jpg');
});

app.get('/js/jquery-3.4.1.min.js', (req, res) => {
    res.sendFile(__dirname + '/js/jquery-3.4.1.min.js');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Signup.html');
});

app.get("/let'schat", (req, res) => {
    res.sendFile(__dirname + "/Let'schat.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
});
app.post('/uploadfile', function (req, res){
    var strFilePath = '';
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/files/' + file.name;
    });
    form.on('file', function (name, file){
        strFilePath = '/files/' + file.name;
        res.send(JSON.stringify({"filePath":strFilePath,"fileName":file.name}));
    });
});
