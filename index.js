
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bdconfig = require('./configurations/bd');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: bdconfig.host,
    user: bdconfig.user,
    password: bdconfig.Password,
    database: bdconfig.database
});

//Crear Persona
app.post("/Crearpersonas", (req, res) => {
    console.log("crear Personas ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',
        [est.nombre, est.apellido, est.fecha_nacimiento, est.Direccion], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Leer tododas las personas
app.get("/Leerpersonas", (req, res) => {
    console.log("get lista Persona");
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar una persona
app.get("/Leerunapersona/:id", (req, res) => {
    console.log("get Persona");
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar persona
app.put("/Actualizarpersona/:id", (req, res) => {
    console.log("update persona ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, Direccion = ? where id = ?',
        [est.nombre, est.apellido, est.fecha_nacimiento, est.Direccion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Persona
app.delete("/Eliminarpersona/:id", (req, res) => {
    console.log("update persona ");
    mysqlConnection.query('delete from persona where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Crear Maestro
app.post("/Crearmaestro", (req, res) => {
    console.log("crear Maestro ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
        [est.id_persona, est.fecha_ingreso], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Leer todos los maestro
app.get("/Leermaestro", (req, res) => {
    console.log("get lista maestro");
    mysqlConnection.query('Select * from docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar a un maestro
app.get("/Leerunmaestro/:id", (req, res) => {
    console.log("get maestro");
    mysqlConnection.query('Select * from docente where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar a un maestro
app.put("/Actualizarmaestro/:id", (req, res) => {
    console.log("update maestro ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update docente set id_persona = ?, fecha_ingreso = ? where id = ?',
        [est.id_persona, est.fecha_ingreso, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar maestro
app.delete("/Eliminarmaestro/:id", (req, res) => {
    console.log("update maestro ");
    mysqlConnection.query('delete from docente where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Crear Estudiante
app.post("/Crearestudiante", (req, res) => {
    console.log("crear estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (id_persona, fecha_ingreso, carnet, status) values (?,?,?,?)',
        [est.id_persona, est.fecha_ingreso, est.carnet, est.status], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Leer todos los estudiantes
app.get("/Leerestudiante", (req, res) => {
    console.log("get lista estudiantes");
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar a un estudiante
app.get("/Leerunestudiante/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar Estudiante
app.put("/Actualizarestudiante/:id", (req, res) => {
    console.log("update estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set id_persona = ?, fecha_ingreso = ?, carnet = ?, status = ? where id = ?',
        [est.id_persona, est.fecha_ingreso, est.carnet, est.status, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Estudiante
app.delete("/Eliminarestudiante/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


app.listen(process.env.PORT ||3000);