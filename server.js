var express = require('express');
var server;
var app = express();
var port = 1337;
var data;
var nodemailer = require("nodemailer");
server = require('http').createServer(app)
server.listen(port);

app.configure(function(){
        app.set("view options", { layout: false, pretty: true });
        app.engine('html', require('ejs').renderFile);
        app.set('views', __dirname + '/views');
        app.use(express.favicon());
        app.use("/public", express.static(__dirname + '/public'));
    }
);

app.get('/', function(req, resp){
    resp.render('index.html');
});
app.post('/mail',function(req,resp){
     console.log(req.query);

// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "",
        to: "",
        subject: "form fill mail",
        text: "name: "+req.query.name+"\nemail: "+req.query.email+"\nmessage: "+req.query.message
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
});

