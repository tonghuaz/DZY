"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

const USERS = [
    { id: '01', Name: 'aaa', math: '88', English: '90' },
    { id: '02', Name: 'bbb', math: '80', English: '90' },
];

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

// 添加用户
app.post('/user', function (req, resp) {
    // url-encoded
    // form-data
    // json
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});


app.put('/user', function (req, resp) {
    // json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.Name = req.body.Name;
            user.math = req.body.math;
            user.English = req.body.English;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});






const ABC = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'tonghua', password: '123456' },


];



app.get('/aaa', function (req, resp) {
    resp.send(ABC);
    resp.end();
});

app.get('/aaa/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of ABC) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});




// 添加用户
app.post('/aaa', function (req, resp) {
    // url-encoded
    // form-data
    // json
    ABC.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

app.put('/aaa', function (req, resp) {
    // json
    let founded = false;
    for (let user of ABC) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

app.delete('/aaa/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of ABC) {
        if (user.id === req.params.id) {
            ABC.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});



const admin = [
    { userName: 'tonghua', password: '123456' },
    { userName: 'admin', password: '123456' }

];
app.post('/admin', function (req, resp) {
    // url-encoded
    // form-data
    // json
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(true);
    for (let user of admin) {
        if (user.userName === userName && user.password === password) {
            resp.send({ succ: true });
        }
        else{
            resp.send({succ: false, msg: '用户名或密码错误'});
        }
    }
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});



