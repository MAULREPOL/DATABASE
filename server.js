console.log("EMI PRUEBA");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lista_tareas2"
});

db.connect((err) => {

    if (err) {
        console.log("Error al conectar:");
        console.log(err);
        return;
    }

    console.log("✅ Base de datos conectada");
});

app.get("/prueba", (req, res) => {

    db.query(
        "INSERT INTO tareas (titulo) VALUES ('Prueba desde Node')",
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Error");
            }

            console.log("✅ Tarea insertada");

            res.send("Tarea insertada");
        }
    );

});
app.post("/tareas", (req, res) => {

    const { titulo } = req.body;

    db.query(
        "INSERT INTO tareas (titulo) VALUES (?)",
        [titulo],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                mensaje: "Tarea guardada"
            });

        }
    );

});
app.get("/tareas", (req, res) => {

    db.query(
        "SELECT * FROM tareas",
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

app.get("/", (req, res) => {
    res.send("FUNCIONA");
});

app.listen(5000, () => {
    console.log("🚀 Servidor iniciado en puerto 5000");
});