const express = require('express')
const app = express()
const port = process.env.PORT || 8080
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"));

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

/*app.get('/update/:field/:newhobby/:id', (req, res) => {
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
*/

app.put('/update', (req, res) => {
  // Access the data sent in the PUT request body
  const {field, newhobby, id} = req.body;

  // Handle the data as needed
  console.log('Received Data:', field, newhobby, id);

  // Corrected SQL query
  let sqlquery = `UPDATE elev SET \`${field}\` = ? WHERE ElevID = ?`;

  connection.query(sqlquery, [newhobby, id], (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

/*
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
*/

app.post('/insert', async (req, res) => {

    const { key1, key2, key3, key4, key5, key6, key7 } = req.body;
    console.log('received values:', key1, key2 , key3, key4, key5, key6, key7);

    let sqlquery = `INSERT INTO elev(ElevID, Fornavn, Etternavn, Klasse, Hobby, Kjonn, DatamaskinID) VALUES (?,?,?,?,?,?,?)`;

    connection.query(sqlquery, [key1, key2, key3, key4, key5, key6, key7], (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
        return;
      }

      console.log(sqlquery);
      res.status(200).send(JSON.stringify(results));
    });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  // Corrected SQL query
  const sqlQuery = 'DELETE FROM elev WHERE ElevId = ?';

  connection.query(sqlQuery, [id], (err, results, fields) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('SQL query executed successfully:', sqlQuery);
      res.status(200).json({ message: 'Row deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  app.get("*", (req, res) => {
    res.sendFile("build")
  })
});