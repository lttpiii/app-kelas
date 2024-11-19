const { v7 : uuidv7 } = require(`uuid`)
const uuid7 = uuidv7()
const express = require("express")
const app = express()
const port = 5000
const conn = require(`./connection-database`)
const bodyParser = require(`body-parser`)
const response = require(`./response`)


app.use(express.json());
app.use(bodyParser.json());

//post data
app.post(`/users`, (req, res) => {
    const data = {
        username : req.body.username,
        name : req.body.name,
        absen : req.body.absen,
        addres : req.body.addres,
    }
    const id = uuid7

    const query = `INSERT INTO murid (id, username, name, absen, addres) VALUES (${id}, '${data.username}', 
    '${data.name}', ${data.absen}, '${data.addres}')`

    conn.query(query, (err, result) => {
        if(err){
            response(500, "invalid", "username tidak valid", res)
        }
        response(200, result, "Data berhasil dibuat", res)
    })
})

//get all data
app.get(`/users`, (req, res) => {
    const query = `SELECT * FROM murid`
    conn.query(query, (err, result) => {
        if(err){
            response(500, "invalid", "Error", res)
        }
        response(200, result, "Seluruh data berhasil diambil", res)
    })
})

//get data by username
app.get(`/users/:username`, (req, res) => {
    const username = req.params.username
    const query = `SELECT * FROM murid WHERE username = '${username}'`

    conn.query(query, (err, result) => {
        if(err){
            response(500, "invalid", "username tidak valid", res)
        }
        response(200, result, `Data dengan username '${username}' berhasil diambil`, res)
    })
})

//put(update) data by identik username
app.put(`/users/:username`, (req, res) => {
    const username = req.params.username
    const data = {
        name : req.body.name,
        absen : req.body.absen,
        addres : req.body.addres,
    }

    const query = `UPDATE murid SET name = '${data.name}', absen = ${data.absen}, 
    addres = '${data.addres}' WHERE username = '${username}'`

    conn.query(query, (err, result) => {
        if(err){
            response(500, "invalid", "username tidak valid", res)
        }
        response(200, result, "Berhasil merubah", res)
    })
})

//delete data by username
app.delete(`/users/:username`, (req, res) => {
    const username = req.params.username
    const query = `DELETE FROM murid WHERE username = '${username}'`

    conn.query(query, (err, result) => {
        if(err){
            response(500, "invalid", "username tidak valid", res)
        }
        response(200, "Menghapus data", "Data berhasil dihapus", res)
    })
})

//port server
app.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})