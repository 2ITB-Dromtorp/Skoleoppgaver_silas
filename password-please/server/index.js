const express = require('express')
const app = express()
const port = 3001
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(cors())

// parse application/json
app.use(bodyParser.json())


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'utlal'
});

connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Hvis du skal lese noe fra databasen/backend, bruk GET request. 
app.get('/elev', (request, response) => {

  connection.query('SELECT * FROM elev', function (error, results, fields) {
    if (error) throw error;
    response.send(JSON.stringify(results));
    console.log(response)
  });
  
})

app.get('/utstyromm', (request, response) => {

    connection.query('SELECT * FROM utstyrsrommet', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
      console.log(response)
    });
    
})

app.get('/klasser', (request, response) => {

    connection.query('SELECT * FROM klasser', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
      console.log(response)
    });
    
})

app.get('/laerere', (request, response) => {

    connection.query('SELECT * FROM laerere', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
      console.log(response)
    });
    
})

app.get('/utlan', (request, response) => {

    connection.query('SELECT * FROM utlan', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
      console.log(response)
    });
    
})

app.get('/utstyr_type', (request, response) => {

  connection.query('SELECT * FROM utstyr_typer', function (error, results, fields) {
    if (error) throw error;
    response.send(JSON.stringify(results));
    console.log(response)
  });
  
})

app.get('/utstyr_modell', (request, response) => {

  connection.query('SELECT * FROM utstyr_modell', function (error, results, fields) {
    if (error) throw error;
    response.send(JSON.stringify(results));
    console.log(response)
  });
  
})

app.post('/insert', async (req, res) => {

    const { key1, key2, key3, key4, key5, key6 } = req.body;
    console.log('received values:', key1, key2 , key3, key4, key5, key6);

    let sqlquery = `INSERT INTO utlan(UtlanID, lanet_av, utstyr_type, utstyr_modell, lanet_ut_dato, godkjent_av) VALUES (?,?,?,?,?,?)`;

    connection.query(sqlquery, [key1, key2, key3, key4, key5, key6], (err, results, fields) => {
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
    const sqlQuery = 'DELETE FROM utlan WHERE UtlanId = ?';
  
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
})