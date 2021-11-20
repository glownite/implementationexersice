const express = require('express');
const cors = require('cors');
const db = require('./config/conexion');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors());

//API REST
app.get('/tasks', (req, res) => {

    db.query('SELECT * FROM tasks', (err, data) => {
        if (err) {
            return err
        }
        res.json({
            mensaje: 'Resultados',
            data
        })
    })

});


app.get('/tasks/:id', (req, res) => {
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "SELECT * FROM tasks WHERE Id = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
            return err
        }
        res.json({
            mensaje: 'Resultados',
            data
        })
    })

});

app.put('/tasks', (req, res) => {
    console.log(Object.values(req.body))
    const values = Object.values(req.body);
    const sql = "UPDATE tasks SET Task=? WHERE Id=?"
    db.query(sql, values, (err, result) => {
        if (err) {
            return err
        }
        res.json({
            mensaje: 'Updated task!',
            result
        })
    })
})

app.post('/tasks', (req, res) => {
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO tasks (Task) VALUES (?)"
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err)
            return err;
        }
        res.json({
            mensaje: 'Added task!',
            result
        })
    })
});

app.delete('/tasks/:id', (req, res) => {
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM Frutas WHERE Id = ?"
    db.query(sql, [ID], (err, result) => {
        if (err) {
            return err
        }
        res.json({
            mensaje: 'Task deleted!',
            result
        })
    })

});

app.listen(PORT, () => {
    console.log('Running the server: ', + PORT)
})