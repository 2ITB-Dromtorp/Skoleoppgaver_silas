const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');
var cors = require('cors')

app.use(cors())

var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
  user     : 'root',
  password : 'root',
  database : 'droomtorp'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 
app.get('/', (req, res) => {

  connection.query('SELECT * FROM elev', function (err, results, fields) {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
  
})

app.get('/update/:field/:newhobby/:id', (req, res) => {
  let field = req.params.field.replace(/^["'](.+(?=["']$))["']$/, '$1');
  let newhobby = req.params.newhobby;
  let id = req.params.id;

  console.log(newhobby);
  console.log(field);

  // Corrected SQL query
  let sqlquery = `UPDATE elev SET \`${field}\` = ? WHERE ElevID = ?`;

  connection.query(sqlquery, [newhobby, id], (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

app.get('/insert/:value1/:value2/:value3/:value4/:value5/:value6/:value7', (req, res) => {
  let value1 = req.params.value1
  let value2 = req.params.value2
  let value3 = req.params.value3
  let value4 = req.params.value4
  let value5 = req.params.value5
  let value6 = req.params.value6
  let value7 = req.params.value7

  console.log(value1);
  console.log(value2);
  console.log(value3);
  console.log(value4);
  console.log(value5);
  console.log(value6);
  console.log(value7);

  // Corrected SQL query
  let sqlquery = `INSERT INTO elev(ElevID, Fornavn, Etternavn, Klasse, Hobby, Kjonn, DatamaskinID) VALUES (?,?,?,?,?,?,?)`;

  connection.query(sqlquery, [value1, value2, value3, value4, value5, value6, value7], (err, results, fields) => {
    if (err) throw err;
    console.log(sqlquery);
    res.send(JSON.stringify(results));
  });
});

app.get('/delete/:value1', (req, res) => {
  let value1 = req.params.value1

  console.log(value1);

  // Corrected SQL query
  let sqlquery = `DELETE FROM elev WHERE ElevId = ?`;

  connection.query(sqlquery, [value1], (err, results, fields) => {
    if (err) throw err;
    console.log(sqlquery);
    res.send(JSON.stringify(results));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 