
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bdconfig = require('./configurations/bd');
const cors = require('cors');

//var app = express();
app.use(bodyParser.json());
app.use(cors());

var mysqlConnection = mysql.createConnection({
    host: bdconfig.host,
    user: bdconfig.user,
    password: bdconfig.Password,
    database: bdconfig.database
});

//Crear Persona
app.post("/Personas", (req, res) => {
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
app.get("/Personas", (req, res) => {
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
app.get("/Personas/:id", (req, res) => {
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
app.put("/Personas/:id", (req, res) => {
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
app.delete("/Personas/:id", (req, res) => {
    console.log("update persona ");
    mysqlConnection.query('delete from persona where id = ?',
        [req.params.id], (err, result) => {
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
app.post("/Maestros", (req, res) => {
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
app.get("/Maestros", (req, res) => {
    console.log("get lista maestro");
    mysqlConnection.query('select d.id, d.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, d.fecha_ingreso from docente d join persona p on d.id_persona = p.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar a un maestro
app.get("/Maestros/:id", (req, res) => {
    console.log("get maestro");
    mysqlConnection.query('select d.id, d.id_persona ,p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, d.fecha_ingreso from docente d join persona p on d.id_persona = p.id where d.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar a un maestro
app.put("/Maestros/:id", (req, res) => {
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
app.delete("/Maestros/:id", (req, res) => {
    console.log("update maestro ");
    mysqlConnection.query('delete from docente where id = ?',
        [req.params.id], (err, result) => {
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
app.post("/Estudiantes", (req, res) => {
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
app.get("/Estudiantes", (req, res) => {
    console.log("get lista estudiantes");
    mysqlConnection.query('select e.id, e.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, e.carnet, e.fecha_ingreso, e.status from estudiante e join persona p on e.id_persona = p.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar a un estudiante
app.get("/Estudiantes/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('select e.id, e.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, e.carnet, e.fecha_ingreso, e.status from estudiante e join persona p on e.id_persona = p.id where e.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
}); 

//Actualizar Estudiante
app.put("/Estudiantes/:id", (req, res) => {
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
app.delete("/Estudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//al ejecutar la url base debe retornar los datos del estudiante •	{ nombre: “nombre estudiante”, carnet: “xxxx-xx-xxxx"
app.get("/inicio", (req, res) => {
    console.log("get lista Persona");
    mysqlConnection.query('select p.nombre, p.apellido, e.carnet from estudiante e join persona p on e.id_persona = p.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.listen(process.env.PORT || 3000);