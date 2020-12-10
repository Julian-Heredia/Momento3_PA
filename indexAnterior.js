// Server forma 1

/*var http = require("http");

function onServer(request, response) {
    
    console.log("Peticion OK");

    response.writeHead(200, {"Content-Type": "text/html"});

    response.write("<h1> Server Online, hi! </h1>");

    response.end();
}

var server = http.createServer(onServer);

server.listen(3000);

console.log("Working in http://localhost:3000/");*/

// Server forma 2: contenido plano
// var http = require('http');

// http.createServer((request, response) => {
//     response.writeHead( 200, {'Content-Type': 'text/plain' } );

//     response.write("Otro Saludo");

//     response.end();
// }).listen( 3000 );

// console.log('Server running in http://localhost:3000/');

//Server forma 3: abrir un documento html

/*var http = require("http");

fs = require("fs");

http.createServer((req, res) => {

    fs.readFile(`./homer.html`, (err, html) => {
res.write(html);
res.end();
    });
}).listen(3000);

console.log('Server running in http://localhost:3000/')*/

//Server forma  4: abrir diferentes rutas

/*let http = require("http");

let fs = require("fs");

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    switch (req.url) {
        case '/':
            plantilla = "home.html";
            break;
            case '/express':
                plantilla = "sobre_express.html";
                break;
    
        default:
            plantilla = "404.html";
            break;
    }

    fs.readFile(`./placeholders/` + `${plantilla}`, (err, datos) => {
        res.write(datos);
        res.end
    });

}).listen( 3000 , 'localhost');

console.log("Server ok");*/

//Server forma 5: constante

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;
// const pages = ['./placeholders/home.html', './placeholders/sobre_express.html', './placeholders/home.html']

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('Hola como van?\n');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`)
// })

//Server forma 6: Express

// const express = require('express');

// const app = express();

// let fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 3000;
// app.use((req, res) => {

//     //res.send('Hello world with express')

//     res.writeHead(200, {'Content-Type': 'text/html'});

//     switch (req.url) {
//         case '/home':
//             plantilla = "home.html";
//             break;
//             case '/express':
//                 plantilla = "sobre_express.html";
//                 break;
    
//         default:
//             plantilla = "404.html";
//             break;
//     }

//     fs.readFile(`./placeholders/` + `${plantilla}`, (err, datos) => {
//         res.write(datos);
//         res.end()
//     });
// });

// const server = app.listen(port, () => {
//     console.log(`Server is running at http://${hostname}:${server.address().port}/`)
// });

//server express: gestionar rutas de verbos (GET, POST, PUT, PATCH, DELETE)

let express = require('express');
let router = express.Router(); // para gestionar las peticiones(Send, Request)

const HOSTNAME = '117.0.0.1';
const PORT = 3000;

let App = express() //Inicializar Express

App.use(router) //usar el router desde Express

//Gestionar las peticiones (req)

//GET: listar todos los registros
router.get('/users', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Maria",
                    "Second_Name": "Jaramillo",
                    "Phone": "221424131"
                },
                {
                    "First_Name": "Jose",
                    "Second_Name": "Lopera",
                    "Phone": "34262453"
                },
                {
                    "First_Name": "Ana",
                    "Second_Name": "Gomez",
                    "Phone": "5746846"
                }
            ]
        }
    );
});

//GET: para listar un solo registro
router.get('/user_id', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Jose",
                    "Second_Name": "Lopera",
                    "Phone": "34262453"
                }
            ]
        }
    );
});

//POST: para añadir un registro
router.post('/add_user', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Juan",
                    "Second_Name": "Marroquin",
                    "Phone": "1241423411"
                }
            ]
        }
    );
});

//PUT: para actualizar un registro
router.put('/update_user/user_id', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Jose Maria",
                    "Second_Name": "Lopera",
                    "Phone": "46363446"
                }
            ]
        }
    );
});

//PATCH: para actualizar parte de un registro
router.patch('/update_user/user_id', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Maria",
                    "Second_Name": "Lopera Gonzales",
                    "Phone": "67997789"
                }
            ]
        }
    );
});

//DELETE: para eliminar un registro
router.delete('/delete_user/user_id', (req, res) => {
    res.send(
        {
            "User": [
                {
                    "First_Name": "Ana",
                    "Second_Name": "Gomez",
                    "Phone": "5746846"
                },
                {
                    "Message": "User deleted"
                }
            ]
        }
    )

});

let server = App.listen(PORT, () => {
    console.log(`Server is running at http://${HOSTNAME}:${server.address().port}/`)
})